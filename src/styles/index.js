import preval from 'preval.macro';

const config = preval`
  const resolveConfig = require('tailwindcss/resolveConfig');
  const tailwindConfig = require('../../tailwind.config');
  module.exports = resolveConfig(tailwindConfig);
`;

export const { colors, screens } = config.theme;
