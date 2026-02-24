/* * */

import { BLOCKS_COLUMN, createLexicalConfig } from '@/lexical-editor-config';

/* * */

/** Editor config for layout block columns – main config minus layout blocks (avoids recursion). */
export const lexicalEditorConfigColumn = createLexicalConfig(BLOCKS_COLUMN);
