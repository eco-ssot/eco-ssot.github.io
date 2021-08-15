import { useRef, useEffect } from 'react';
import { useDeepCompareEffect, useMeasure } from 'react-use';
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

export default function Chart({ className, option = {} }) {
  const [containerRef, { width, height }] = useMeasure();
  const chartRef = useRef();
  useDeepCompareEffect(() => {
    const instance = echarts.init(chartRef.current) || { setOption: () => {}, dispose: () => {} };
    instance.setOption(option);
    return () => instance.dispose();
  }, [option]);

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
