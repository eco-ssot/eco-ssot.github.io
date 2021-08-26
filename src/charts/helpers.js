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
    case 14:
    case 15:
      return { fontSize: 14, lineHeight: 20 };

    default:
      return { fontSize: 12, lineHeight: 16 };
  }
}

export function updateChartFontSize({ xAxis, grid = {}, series = [], ...rest } = {}) {
  const fontSizeRatio = getFontSizeRatio();
  const labelFontSize = getLabelFontSize();
  const { containLabel, ...restGrid } = grid;
  return {
    ...rest,
    grid: Object.entries(restGrid).reduce(
      (prev, [key, value]) => ({ ...prev, [key]: typeof value === 'string' ? value : value * fontSizeRatio }),
      { containLabel }
    ),
    series: series.map(({ barWidth, label, markLine, ...restSeries }) => ({
      ...restSeries,
      ...(barWidth && { barWidth: typeof barWidth === 'string' ? barWidth : barWidth * fontSizeRatio }),
      ...(label && { label: { ...label, ...labelFontSize } }),
      ...(markLine && { markLine: { ...markLine, label: { ...markLine.label, ...labelFontSize } } }),
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
