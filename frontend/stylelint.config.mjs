/** @type {import('stylelint').Config} */

/* * */

import { css } from '@carrismetropolitana/eslint'

/* * */

export default {
  ...css,
  rules: {
    'selector-class-pattern': [
      /^[a-z]+([A-Z][a-z0-9]*)*$/,
      {
        message: 'Selector should be written in camelCase.',
      },
    ],
    'unit-allowed-list': ['em', 'rem', 's', 'px', 'vh', 'vw', 'deg', 'fr', 'ms', 's', 'turn', 'grad', 'rad', 'dpi', 'dppx', 'dpcm', '%'],
  },
}
