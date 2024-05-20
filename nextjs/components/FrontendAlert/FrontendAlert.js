/* * */

/* * */
import { Badge, Anchor } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function FrontendAlert({ alertId, locale }) {
	//

	//
	// A. Setup variables

	const [cT, eT, t, alerts] = await Promise.all([
		getTranslations('GTFSCause'),
		getTranslations('GTFSEffect'),
		getTranslations('FrontendAlert'),
		fetch('https://api.carrismetropolitana.pt/alerts').then(res => res.json()),
	]);

	const domain = headers().get('host');
	const currentUrl = `https://${domain}/alerts/${alertId}`;

	//
	// B. Fetch data

	let alert = alerts.entity.find(alert => alert.id === alertId);
	if (!alert) {
		return redirect('/');
	}
	let dates = [];
	for (let p of alert.alert.activePeriod) {
		let start = new Date(p.start * 1000);
		let end = new Date(p.end * 1000);
		dates.push(start.toLocaleDateString() + ' - ' + end.toLocaleDateString());
	}
	let periodString = dates.join(', ');

	let imageUrl = alert.alert.image.localizedImage.find(image => image.language === locale)?.url;
	if (!imageUrl) imageUrl = alert.alert.image.localizedImage[0]?.url;

	let moreUrl = alert.alert.url.translation.find(url => url.language === locale)?.text;
	if (!moreUrl) moreUrl = alert.alert.url.translation[0]?.text;
	if (moreUrl == currentUrl) moreUrl = null;

	//
	// C. Render components

	return (
		<div style={{ backgroundColor: 'white', borderRadius: '5px' }}>
			<div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
				<div>
					<h1>{alert.alert.headerText.translation[0].text}</h1>
				</div>
				<div style={{ height: '1px', backgroundColor: 'var(--gray-2)', width: '100%' }}></div>
				<div style={{ display: 'flex', gap: '10px' }}>

					<Badge color='blue' variant='light'>{cT(alert.alert.cause)}</Badge>
					<Badge color='blue' variant='light'>{eT(alert.alert.effect)}</Badge>
				</div>
				<p style={{ fontWeight: '500', fontSize: '14px' }}> {t('period')}: {periodString} </p>
				<p>{alert.alert.descriptionText.translation[0].text}</p>
				{moreUrl && <Anchor href={moreUrl} underline='hover'>{t('more_info')}</Anchor>}
				{imageUrl && <img style={{ maxWidth: '100%' }} src={imageUrl} alt='alert'/>}
			</div>
		</div>
	);

	//
}