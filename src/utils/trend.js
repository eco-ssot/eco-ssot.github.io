import { isNil } from 'lodash';

export function getTrend(value, title) {
  if (isNil(value) || !isFinite(value)) {
    return { value };
  }

  const overall = Math.abs(value);
  switch (title) {
    case '出貨量':
    case 'ASP':
    case '營業額': {
      if (value > 0) {
        return { value: overall, direction: 'up', color: 'text-primary-500' };
      }

      if (value < 0) {
        return { value: overall, direction: 'down', color: 'text-dangerous-700' };
      }

      return { value };
    }

    case '廢棄物產生密度':
    case '廢棄物密集度':
    case '廢棄物總量':
    case '用水強度':
    case '用水密集度':
    case '用電強度':
    case '用電密集度':
    case '用電量':
    case '用水量':
    case '廢棄物':
    case '碳排量': {
      if (value > 0) {
        return { value: overall, direction: 'up', color: 'text-dangerous-700' };
      }

      if (value < 0) {
        return { value: overall, direction: 'down', color: 'text-primary-500' };
      }

      return { value };
    }

    default:
      return { value };
  }
}
