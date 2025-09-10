/* * */

import payloadConfig from '@/payload-config';
import { getPayload } from 'payload';

/* * */

async function seedNotes() {
	const payload = await getPayload({ config: payloadConfig });

	console.log('🌱 Seeding Notes collection...');

	try {
		// Create example notes
		const notesData = [
			{
				authors: null,
				contentType: 'link',
				heroImage: null,
				link: 'https://www.carrismetropolitana.pt/noticias/resultados-inquerito-2024',
				publishedAt: new Date('2024-04-30').toISOString(),
				seo: {
					metaDescription: 'Resultados do Inquérito de Satisfação aos Passageiros da Carris Metropolitana em 2024.',
					metaTitle: 'Resultados do Inquérito de Satisfação 2024',
					ogImage: null,
				},
				slug: 'resultados-inquerito-satisfacao-2024',
				status: 'published',
				title: 'Resultados do Inquérito de Satisfação aos Passageiros 2024',
			},
			{
				authors: null,
				contentType: 'link',
				heroImage: null,
				link: 'https://www.carrismetropolitana.pt/noticias/balanco-operacao-2024',
				publishedAt: new Date('2024-02-28').toISOString(),
				seo: {
					metaDescription: 'Balanço completo da operação Carris Metropolitana durante o ano de 2024.',
					metaTitle: 'Balanço da Operação 2024',
					ogImage: null,
				},
				slug: 'balanco-operacao-carris-metropolitana-2024',
				status: 'published',
				title: 'Balanço da operação Carris Metropolitana em 2024',
			},
			{
				authors: null,
				contentType: 'file',
				file: null, // This would need to be set to a real media ID after uploading
				heroImage: null,
				publishedAt: new Date('2024-03-15').toISOString(),
				seo: {
					metaDescription: 'Relatório técnico sobre a implementação do novo sistema de bilhética.',
					metaTitle: 'Relatório Técnico - Sistema de Bilhética',
					ogImage: null,
				},
				slug: 'relatorio-tecnico-sistema-bilhetica',
				status: 'published',
				title: 'Relatório Técnico: Implementação do Sistema de Bilhética',
			},
		] as const;

		for (const noteData of notesData) {
			await payload.create({
				collection: 'notes',
				data: noteData,
			});
			console.log(`✅ Created note: ${noteData.title}`);
		}

		console.log('🎉 Notes seeding completed successfully!');
	}
	catch (error) {
		console.error('❌ Error seeding notes:', error);
		process.exit(1);
	}
}

/* * */

// Run the seed function if this script is called directly
async function main() {
	try {
		await seedNotes();
		console.log('✨ Seeding process finished');
		process.exit(0);
	}
	catch (error) {
		console.error('💥 Seeding failed:', error);
		process.exit(1);
	}
}

// Check if this is the main module using import.meta
if (import.meta.url === `file://${process.argv[1]}`) {
	main();
}
