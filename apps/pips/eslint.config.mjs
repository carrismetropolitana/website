/* * */

import { next } from '@carrismetropolitana/eslint'

/* * */

export default [

  ...next,

  {
    rules: {
      '@typescript-eslint/ban-tslint-comment': 'off',
    },
  },

]
