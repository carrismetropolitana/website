/** @type {import('stylelint').Config} */

/* * */

import { css } from '@carrismetropolitana/eslint'

/* * */

export default {
  ...css,
  rules: {
    'unit-allowed-list': ['em', 'rem', 's', 'px', 'vh', 'vw', 'deg', 'fr', 'ms', 's', 'turn', 'grad', 'rad', 'dpi', 'dppx', 'dpcm', '%'],
  },
}
