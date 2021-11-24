import { useRef } from 'react';

import clsx from 'clsx';
import echarts from 'echarts/lib/echarts';
import { useDeepCompareEffect, useUpdateEffect, useMeasure, useDebounce } from 'react-use';

// then import echarts modules those you have used manually.
import 'echarts/lib/chart/line';
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
import 'echarts/lib/component/tooltip';
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

import { updateChartFontSize } from './helpers';

export default function Chart({ className, option = {} }) {
  const [containerRef, { width, height }] = useMeasure();
  const chartRef = useRef();
  const dataset = (option.series || []).map(({ data }) => data);
  const labels =
    option.xAxis?.type === 'category'
      ? option.xAxis?.data
      : option.yAxis?.type === 'category'
      ? option.yAxis?.data
      : [];

  useUpdateEffect(() => {
    const instance = echarts.getInstanceByDom(chartRef.current) || { setOption: () => {} };
    instance.setOption(updateChartFontSize({ ...option, animation: false }), true);
  }, [labels]);

  useDeepCompareEffect(() => {
    const instance = echarts.init(chartRef.current) || { setOption: () => {}, dispose: () => {} };
    instance.setOption(updateChartFontSize(option), true);
    return () => instance.dispose();
  }, [dataset]);

  useDebounce(
    () => {
      const instance = echarts.getInstanceByDom(chartRef.current);
      if (instance && (Math.abs(instance.getWidth() - width) > 2 || Math.abs(instance.getHeight() - height) > 2)) {
        instance.setOption(updateChartFontSize(option), true);
        instance.resize();
      }
    },
    100,
    [{ width, height }]
  );

  return (
    <div ref={containerRef} className={clsx('grid', className)}>
      <div ref={chartRef} />
    </div>
  );
}
