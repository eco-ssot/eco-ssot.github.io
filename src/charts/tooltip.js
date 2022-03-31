export const tooltip = ({ formatter, ...rest } = {}) => ({
  ...(formatter && { formatter }),
  trigger: 'axis',
  backgroundColor: 'transparent',
  padding: 0,
  borderWidth: 0,
  axisPointer: {
    type: 'shadow',
    shadowStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#FAFAFA3F',
          },
          {
            offset: 1,
            color: '#FAFAFA00',
          },
        ],
      },
    },
  },
  ...rest,
});
