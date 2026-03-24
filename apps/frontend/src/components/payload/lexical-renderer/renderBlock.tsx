'use client';
/* * */

import type { LexicalNode } from '@/types/lexical-node.types';
import type { PayloadLexicalLink } from '@/types/link.types';
import type { ReactNode } from 'react';

import { Section } from '@/components/layout/Section';
import { Accordion } from '@/components/payload/accordion';
import { Card } from '@/components/payload/card';
import { Gallery } from '@/components/payload/gallery';
import { Links } from '@/components/payload/links';
import { NotImplemented } from '@/components/payload/NotImplemented';
import { Spacer } from '@/components/payload/spacer';
import { Surface } from '@/components/payload/surface';
import { ThreeColumnsText } from '@/components/payload/ThreeColumnsText';
import { TwoColumnsText } from '@/components/payload/TwoColumnsText';
import { TwoColumnsTextImage } from '@/components/payload/TwoColumnsTextImage';
import { Video } from '@/components/payload/video';
import { getLexicalRoot } from '@/utils/getLexicalRoot';
import { getRelationshipImageUrl } from '@/utils/getRelationshipImageUrl';

/* * */

export function renderBlock(node: LexicalNode, key: number | undefined, renderNode: (node: LexicalNode, key?: number) => ReactNode): ReactNode {
	//

	//
	// A. Setup variables

	const blockSlug = node.fields?.blockType ?? node.fields?.blockName;

	//
	// B. Render Components

	switch (blockSlug) {
		case 'accordion': {
			const items = Array.isArray(node.fields?.accordion)
				? node.fields?.accordion.map(item => ({ content: item.content ?? '', id: item.id ?? '', title: item.title ?? '' }))
				: [];
			return items.length ? <Accordion key={key} items={items} /> : null;
		}
		case 'card': return <Card key={key} borderColor={node.fields?.borderColor} cards={node.fields?.cards} primaryColor={node.fields?.primaryColor} textColor={node.fields?.textColor} titleColor={node.fields?.titleColor} />;
		case 'gallery': return <Gallery key={key} fields={node.fields} />;
		case 'link': {
			const raw = node.fields;
			const linkFields: PayloadLexicalLink = {
				buttonColor: raw?.buttonColor,
				buttonTextColor: raw?.buttonTextColor,
				doc: raw?.doc,
				isButton: raw?.isButton,
				linkType: raw?.linkType,
				newTab: raw?.newTab,
				text: typeof raw?.text === 'string' ? raw.text : undefined,
				url: raw?.url,
			};
			return <Links key={key} fields={linkFields} />;
		}
		case 'section': {
			const contentRoot = getLexicalRoot(node.fields?.content);
			const withPadding = node.fields?.withPadding === 'all' ? true : (node.fields?.withPadding === 'none' ? undefined : node.fields?.withPadding);
			return (
				<Section key={key} withBottomDivider={node.fields?.withBottomDivider} withGap={node.fields?.withGap} withPadding={withPadding}>
					{contentRoot ? renderNode(contentRoot) : null}
				</Section>
			);
		}
		case 'spacer': return <Spacer key={key} height={node.fields?.height} />;
		case 'surface': {
			const contentRoot = getLexicalRoot(node.fields?.content);
			const backgroundImageUrl = getRelationshipImageUrl(node.fields?.backgroundImage);
			return (
				<Surface key={key} backgroundImageUrl={node.fields?.hasBackgroundImage ? backgroundImageUrl : undefined} backgroundOverlay={node.fields?.backgroundOverlay} forceOverflow={node.fields?.forceOverflow} fullHeight={node.fields?.fullHeight} variant={node.fields?.variant}>
					{contentRoot ? renderNode(contentRoot) : null}
				</Surface>
			);
		}
		case 'three-columns-text': return <ThreeColumnsText key={key} centerColumn={node.fields?.centerColumn} leftColumn={node.fields?.leftColumn} rightColumn={node.fields?.rightColumn} />;
		case 'two-columns-text':return <TwoColumnsText key={key} leftColumn={node.fields?.leftColumn} rightColumn={node.fields?.rightColumn} />;
		case 'two-columns-text-image': return <TwoColumnsTextImage key={key} image={node.fields?.image} imagePosition={node.fields?.imagePosition} text={node.fields?.text} />;
		case 'video': return <Video key={key} fields={node.fields} />;
		default: return <NotImplemented key={key} blockSlug={blockSlug} />;
	}

	//
}
