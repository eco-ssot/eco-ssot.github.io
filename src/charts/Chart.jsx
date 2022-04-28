import { useRef } from 'react';

import clsx from 'clsx';
import { LineChart, BarChart, PieChart, ScatterChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { useDeepCompareEffect, useDebounce, useWindowSize, usePreviousDistinct } from 'react-use';

import { darkTheme } from './config';
import { updateChartFontSize } from './helpers';

echarts.use([
  CanvasRenderer,

  LineChart,
  BarChart,
  PieChart,
  ScatterChart,

  GridComponent,
  TooltipComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
]);

echarts.registerTheme('dark', darkTheme);

export default function Chart({ className, option = {} }) {
  const windowSize = useWindowSize();
  const chartRef = useRef();
  const dataset = (option.series || []).map(({ data }) => data);
  const prevWindowSize = usePreviousDistinct(windowSize);
  useDeepCompareEffect(() => {
    let instance = echarts.getInstanceByDom(chartRef.current);
    if (!instance) {
      instance = echarts.init(chartRef.current, 'dark');
      instance.setOption(updateChartFontSize(option), true);
    }

    return () => {
      instance && instance.dispose();
    };
  }, [dataset]);

  useDebounce(
    () => {
      let instance = echarts.getInstanceByDom(chartRef.current);
      if (
        instance &&
        prevWindowSize &&
        (prevWindowSize.height !== windowSize.height || prevWindowSize.width !== windowSize.width)
      ) {
        instance.setOption(updateChartFontSize(option), true);
        instance.resize({ animation: { duration: 500 } });
      }
    },
    100,
    [windowSize]
  );

  return (
    <div className={clsx('grid', className)}>
      <div ref={chartRef} />
    </div>
  );
}
