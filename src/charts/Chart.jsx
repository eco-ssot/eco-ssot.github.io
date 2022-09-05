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
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import { useDeepCompareEffect, useDebounce, useWindowSize, usePreviousDistinct } from 'react-use';

import { darkTheme } from './config';
import { toResponsiveOption } from './helpers';

echarts.use([
  CanvasRenderer,
  SVGRenderer,

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

export default function Chart({ className, dispose = true, renderer = 'svg', option = {} }) {
  const windowSize = useWindowSize();
  const prevWindowSize = usePreviousDistinct(windowSize);
  const chartRef = useRef(null);
  const dataset = useMemo(() => (option.series || []).map(({ data }) => data), [option.series]);
  useDeepCompareEffect(() => {
    let instance = echarts.getInstanceByDom(chartRef.current);
    const initInstance = () => {
      instance = echarts.init(chartRef.current, 'dark', { renderer });
      instance.setOption(toResponsiveOption(option), true);
    };

    if (instance) {
      if (!dispose) {
        instance.setOption(toResponsiveOption(option), true);
      }
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
  }, [import.meta.env.DEV ? option : dataset]);

  useDebounce(
    () => {
      let instance = echarts.getInstanceByDom(chartRef.current);
      if (
        instance &&
        prevWindowSize &&
        (prevWindowSize.height !== windowSize.height || prevWindowSize.width !== windowSize.width)
      ) {
        instance.setOption(toResponsiveOption(option), true);
        instance.resize({ animation: { duration: 500 } });
      }
    },
    100,
    [windowSize]
  );

  return <div className={clsx('grid', className)} ref={chartRef} />;
}
