import { isObject, isPlainObject } from 'lodash';

import { mapObject } from '../utils/object';

const BASE_FONT_SIZE = 15;

export function getFontSize() {
  const { fontSize = `${BASE_FONT_SIZE}px` } = window.getComputedStyle(document.body);
  return Number(fontSize.slice(0, -2));
}

export function getFontSizeRatio(fontSize = getFontSize()) {
  return fontSize / BASE_FONT_SIZE;
}

export function getLabelFontSize(fontSize = getFontSize()) {
  switch (fontSize) {
    case 60:
      return { fontSize: 48, lineHeight: 56 };
    case 40:
      return { fontSize: 40, lineHeight: 48 };
    case 30:
      return { fontSize: 24, lineHeight: 32 };
    case 20:
      return { fontSize: 18, lineHeight: 28 };
    case 15:
      return { fontSize: 14, lineHeight: 20 };
    case 13:
    case 12:
      return { fontSize: 12, lineHeight: 16 };
    case 11:
    case 10.5:
    case 10:
      return { fontSize: 10, lineHeight: 12 };

    default:
      return { fontSize };
  }
}

export function setFontSize(value, fontSizeRatio = 1) {
  return typeof value === 'string' ? value : value * fontSizeRatio;
}

export function toResponsiveOption(option) {
  const minFontsize = 12;
  const fontSize = getFontSize();
  const fontSizeRatio = getFontSizeRatio(fontSize);
  const mapper = (key, value) => {
    if (isPlainObject(value) && /label/i.test(key)) {
      const { lineHeight, fontSize: _fontSize } = getLabelFontSize(fontSize);
      return [
        key,
        value.fontSize
          ? value
          : { ...value, ...(lineHeight && { lineHeight }), fontSize: Math.max(_fontSize, minFontsize) },
      ];
    }

    if (typeof value === 'number' && /top|bottom|left|right|size|width|fontsize|radius/i.test(key)) {
      const nextValue = setFontSize(value, fontSizeRatio);
      return [key, key === 'fontSize' ? Math.max(nextValue, minFontsize) : nextValue];
    }

    return [key, value];
  };

  const nextOption = mapObject(option, mapper);
  return nextOption;
}

export function updateChartFontSize({ xAxis, grid = {}, series = [], ...rest } = {}) {
  const fontSize = getFontSize();
  const fontSizeRatio = getFontSizeRatio(fontSize);
  const labelFontSize = getLabelFontSize(fontSize);
  const { containLabel, ...restGrid } = grid;
  return {
    ...rest,
    grid: Object.entries(restGrid).reduce(
      (prev, [key, value]) => ({ ...prev, [key]: setFontSize(value, fontSizeRatio) }),
      { containLabel }
    ),
    series: series.map(({ barWidth, label, markLine, data, ...restSeries }) => ({
      ...restSeries,
      ...(barWidth && { barWidth: setFontSize(barWidth, fontSizeRatio) }),
      ...(label && { label: { ...label, ...labelFontSize } }),
      ...(markLine && {
        markLine: {
          ...markLine,
          label: { ...markLine.label, ...labelFontSize },
          ...(markLine.lineStyle && {
            lineStyle: {
              ...markLine.lineStyle,
              ...(markLine.lineStyle.width && {
                width: setFontSize(markLine.lineStyle.width, fontSizeRatio),
              }),
            },
          }),
          ...(markLine.emphasis && {
            emphasis: {
              ...markLine.emphasis,
              ...(markLine.emphasis.lineStyle && {
                lineStyle: {
                  ...markLine.emphasis.lineStyle,
                  ...(markLine.emphasis.lineStyle.width && {
                    width: setFontSize(markLine.emphasis.lineStyle.width, fontSizeRatio),
                  }),
                },
              }),
            },
          }),
          ...(markLine.data && {
            data: markLine.data.map((d) =>
              Array.isArray(d)
                ? d.map(({ symbolSize, lineStyle, label, emphasis, ...rest }) => ({
                    ...rest,
                    ...(symbolSize && {
                      symbolSize: [].concat(symbolSize).map((value) => setFontSize(value, fontSizeRatio)),
                    }),
                    ...(lineStyle && {
                      lineStyle: {
                        ...lineStyle,
                        ...(lineStyle.width && {
                          width: setFontSize(lineStyle.width, fontSizeRatio),
                        }),
                      },
                    }),
                    ...(label && { label: { ...label, ...labelFontSize } }),
                    ...(emphasis && {
                      emphasis: {
                        ...emphasis,
                        ...(emphasis.lineStyle && {
                          ...emphasis.lineStyle,
                          ...(emphasis.lineStyle.width && {
                            width: setFontSize(emphasis.lineStyle.width, fontSizeRatio),
                          }),
                        }),
                      },
                    }),
                  }))
                : d
            ),
          }),
        },
      }),
      data: data?.map((d) =>
        isObject(d)
          ? {
              ...d,
              ...(d.itemStyle && {
                itemStyle: {
                  ...d.itemStyle,
                  ...(d.itemStyle.borderRadius && {
                    borderRadius: d.itemStyle.borderRadius.map((value) => setFontSize(value, fontSizeRatio)),
                  }),
                },
              }),
            }
          : d
      ),
    })),
    ...(xAxis && {
      xAxis: {
        ...xAxis,
        ...(xAxis.axisLabel && {
          axisLabel: {
            ...xAxis.axisLabel,
            ...labelFontSize,
          },
        }),
      },
    }),
  };
}
