const BASE_FONT_SIZE = 15;

export function getFontSize() {
  const { fontSize = `${BASE_FONT_SIZE}px` } = window.getComputedStyle(document.body);
  return Number(fontSize.slice(0, -2));
}

export function getFontSizeRatio() {
  return getFontSize() / BASE_FONT_SIZE;
}

export function getLabelFontSize() {
  const fontSize = getFontSize();
  switch (fontSize) {
    case 60:
      return { fontSize: 36, lineHeight: 40 };
    case 40:
      return { fontSize: 30, lineHeight: 36 };
    case 30:
      return { fontSize: 24, lineHeight: 32 };
    case 20:
      return { fontSize: 18, lineHeight: 28 };
    case 15:
      return { fontSize: 14, lineHeight: 20 };

    default:
      return { fontSize: 12, lineHeight: 16 };
  }
}

export function setFontSize(value, fontSizeRatio = 1) {
  return typeof value === 'string' ? value : value * fontSizeRatio;
}

export function updateChartFontSize({ xAxis, grid = {}, series = [], ...rest } = {}) {
  const fontSizeRatio = getFontSizeRatio();
  const labelFontSize = getLabelFontSize();
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
      ...(data && {
        data: data.map(({ itemStyle, ...rest }) => ({
          ...rest,
          ...(itemStyle && {
            itemStyle: {
              ...itemStyle,
              ...(itemStyle.borderRadius && {
                borderRadius: itemStyle.borderRadius.map((value) => setFontSize(value, fontSizeRatio)),
              }),
            },
          }),
        })),
      }),
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
