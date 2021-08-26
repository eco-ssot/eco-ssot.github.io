import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config.js';

const config = resolveConfig(tailwindConfig);

export const { colors, screens } = config.theme;
