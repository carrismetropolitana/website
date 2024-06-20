/* * */

import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { availableLocales } from './config';

/* * */

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ availableLocales });
