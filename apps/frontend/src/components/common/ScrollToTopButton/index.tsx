'use client';

/* * */

import { Affix, Button, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface Props {
	showAfterHeight: number
}

/* * */
export function ScrollToTopButton({ showAfterHeight }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.ScrollToTopButton');
	const [scroll, scrollTo] = useWindowScroll();

	//
	// B. Render components

	return (
		<Affix position={{ bottom: 20, left: 20 }}>
			<Transition mounted={scroll.y > showAfterHeight} transition="slide-up">
				{transitionStyles => (
					<Button
						leftSection={<IconArrowUp size={16} />}
						onClick={() => scrollTo({ y: 0 })}
						style={transitionStyles}
					>
						{t('label')}
					</Button>
				)}
			</Transition>
		</Affix>
	);

	//
}
