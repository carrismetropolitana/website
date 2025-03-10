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
	// A. Setup Variables

	const t = useTranslations('common.ScrollToTopButton');
	const [scroll, scrollTo] = useWindowScroll();

	//
	// B. Render Components

	return (
		<Affix position={{ bottom: 20, right: 20 }}>
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
