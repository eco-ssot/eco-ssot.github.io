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
import { useDeepCompareEffect, useMeasure, useDebounce } from 'react-use';

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
  const [containerRef, { width, height }] = useMeasure();
  const chartRef = useRef();
  const dataset = (option.series || []).map(({ data }) => data);

  useDeepCompareEffect(() => {
    let instance = {};
    setTimeout(() => {
      instance = echarts.init(chartRef.current, 'dark');
      instance.setOption(updateChartFontSize(option), true);
    });

    return () => instance.dispose?.();
  }, [dataset]);

  useDebounce(
    () => {
      let instance = echarts.getInstanceByDom(chartRef.current);
      if (
        instance &&
        width &&
        height &&
        (Math.abs(instance.getWidth() - width) > 4 || Math.abs(instance.getHeight() - height) > 4)
      ) {
        instance.setOption(updateChartFontSize(option), true);
        instance.resize({ animation: { duration: 500 } });
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
