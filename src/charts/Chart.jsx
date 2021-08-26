import { useRef, useEffect } from 'react';
import { useDeepCompareEffect, useUpdateEffect, useMeasure } from 'react-use';
import clsx from 'clsx';

import echarts from 'echarts/lib/echarts';

// then import echarts modules those you have used manually.
// import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/chart/radar';
// import 'echarts/lib/chart/map';
// import 'echarts/lib/chart/treemap';
// import 'echarts/lib/chart/graph';
// import 'echarts/lib/chart/gauge';
// import 'echarts/lib/chart/funnel';
// import 'echarts/lib/chart/parallel';
// import 'echarts/lib/chart/sankey';
// import 'echarts/lib/chart/boxplot';
// import 'echarts/lib/chart/candlestick';
// import 'echarts/lib/chart/effectScatter';
// import 'echarts/lib/chart/lines';
// import 'echarts/lib/chart/heatmap';
// import 'echarts/lib/component/graphic';
// import 'echarts/lib/component/grid';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/legendScroll';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/polar';
// import 'echarts/lib/component/geo';
// import 'echarts/lib/component/parallel';
// import 'echarts/lib/component/singleAxis';
// import 'echarts/lib/component/brush';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/dataZoom';
// import 'echarts/lib/component/visualMap';
// import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/markArea';
// import 'echarts/lib/component/timeline';
// import 'echarts/lib/component/toolbox';
// import 'zrender/lib/vml/vml';

const BASE_FONT_SIZE = 15;

export function getFontSizeRatio() {
  const { fontSize = `${BASE_FONT_SIZE}px` } = window.getComputedStyle(document.body);
  return Number(fontSize.slice(0, -2)) / BASE_FONT_SIZE;
}

export function updateChartFontSize({ grid = {}, series = [], ...rest } = {}, fontSizeRatio = 1) {
  const { containLabel, ...restGrid } = grid;
  return {
    ...rest,
    grid: Object.entries(restGrid).reduce(
      (prev, [key, value]) => ({ ...prev, [key]: typeof value === 'string' ? value : value * fontSizeRatio }),
      { containLabel }
    ),
    series: series.map(({ barWidth, ...restSeries }) => ({
      ...restSeries,
      ...(barWidth && { barWidth: typeof barWidth === 'string' ? barWidth : barWidth * fontSizeRatio }),
    })),
  };
}

export default function Chart({ className, option = {} }) {
  const [containerRef, { width, height }] = useMeasure();
  const chartRef = useRef();
  const fontSizeRatio = getFontSizeRatio();
  const dataset = (option.series || []).map(({ data }) => data);
  const labels =
    option.xAxis?.type === 'category'
      ? option.xAxis?.data
      : option.yAxis?.type === 'category'
      ? option.yAxis?.data
      : [];

  useUpdateEffect(() => {
    const instance = echarts.getInstanceByDom(chartRef.current) || { setOption: () => {} };
    instance.setOption(updateChartFontSize({ ...option, animation: false }, fontSizeRatio));
  }, [labels]);

  useDeepCompareEffect(() => {
    const instance = echarts.init(chartRef.current) || { setOption: () => {}, dispose: () => {} };
    instance.setOption(updateChartFontSize(option, fontSizeRatio));
    return () => instance.dispose();
  }, [dataset]);

  useEffect(() => {
    const instance = echarts.getInstanceByDom(chartRef.current);
    if (instance && (instance.getWidth() !== width || instance.getHeight() !== height)) {
      instance.resize();
    }
  }, [width, height]);

  return (
    <div ref={containerRef} className={clsx('grid', className)}>
      <div ref={chartRef} />
    </div>
  );
}
