import { useRef } from 'react';

import clsx from 'clsx';
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, MarkLineComponent, LegendComponent } from 'echarts/components';
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
  GridComponent,
  TooltipComponent,
  MarkLineComponent,
  LegendComponent,
]);

echarts.registerTheme('dark', darkTheme);

export default function Chart({ className, option = {} }) {
  const [containerRef, { width, height }] = useMeasure();
  const chartRef = useRef();
  const dataset = (option.series || []).map(({ data }) => data);

  useDeepCompareEffect(() => {
    const instance = echarts.init(chartRef.current, 'dark') || { setOption: () => {}, dispose: () => {} };
    instance.setOption(updateChartFontSize(option), true);
    return () => instance.dispose();
  }, [dataset]);

  useDebounce(
    () => {
      const instance = echarts.getInstanceByDom(chartRef.current);
      if (instance && (Math.abs(instance.getWidth() - width) > 2 || Math.abs(instance.getHeight() - height) > 2)) {
        instance.setOption(updateChartFontSize(option), true);
        instance.resize({
          animation: {
            duration: 500,
          },
        });
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
