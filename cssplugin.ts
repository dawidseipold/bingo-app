
// @ts-check

import { parse } from 'postcss';
import { objectify } from 'postcss-js';
import { readFileSync } from 'fs';
import { PluginCreator } from 'tailwindcss/types/config';

/**
 * CSS as plugin
 * @param {string} filename CSS file
 * @returns {PluginCreator}
 */
const createTailwindCSSPlugin: (filename: string) => PluginCreator = (filename) => {
  return ({ addBase, addComponents, addUtilities }) => {
    const css = readFileSync(filename, 'utf8');
    const root = parse(css);
    const jss = objectify(root) as {
      '@layer base'?: Record<string, any>,
      '@layer components'?: Record<string, any>,
      '@layer utilities'?: Record<string, any>,
    };

    if (jss['@layer base']) {
      addBase(jss['@layer base']);
    }
    if (jss['@layer components']) {
      addComponents(jss['@layer components']);
    }
    if (jss['@layer utilities']) {
      addUtilities(jss['@layer utilities']);
    }
  };
};

export default createTailwindCSSPlugin;

