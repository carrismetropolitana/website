/* * */

import { availableLocales } from './config';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

/* * */

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ availableLocales });
