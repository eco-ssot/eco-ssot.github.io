import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';

const colors = resolveConfig(tailwindConfig).theme.colors;

export default colors;
