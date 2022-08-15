import { useMemo, useRef } from 'react';

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

export default function Chart({ className, dispose = true, option = {} }) {
  const windowSize = useWindowSize();
  const prevWindowSize = usePreviousDistinct(windowSize);
  const chartRef = useRef(null);
  const dataset = useMemo(() => (option.series || []).map(({ data }) => data), [option.series]);
  useDeepCompareEffect(() => {
    let instance = echarts.getInstanceByDom(chartRef.current);
    const initInstance = () => {
      instance = echarts.init(chartRef.current, 'dark');
      instance.setOption(updateChartFontSize(option), true);
    };

    if (instance && !dispose) {
      instance.setOption(updateChartFontSize(option), true);
    } else {
      if (!chartRef.current?.clientHeight && !chartRef.current?.clientWidth) {
        setTimeout(() => initInstance());
      } else {
        initInstance();
      }
    }

    return () => {
      instance && dispose && instance.dispose();
    };
  }, [process.env.NODE_ENV === 'development' ? option : dataset]);

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

  return <div className={clsx('grid', className)} ref={chartRef} />;
}
