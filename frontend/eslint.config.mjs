/* * */

import { next } from '@carrismetropolitana/eslint'

/* * */

export default [
  ...next,
  {
    ignores: [
      '.next/',
      'public/',
    ],
  },
]
