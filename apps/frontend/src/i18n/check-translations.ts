/**
 * Check if translation files (pt.json and en.json) have matching keys.
 * Works recursively on nested objects.
 */

import fs from 'fs';
import path from 'path';

const BASE_PATH = path.resolve('./src/i18n/translations');
const files = {
	en: path.join(BASE_PATH, 'en.json'),
	pt: path.join(BASE_PATH, 'pt.json'),
};

// Helper to flatten nested keys into dot notation
function flattenKeys(obj: Record<string, unknown>, prefix = ''): string[] {
	return Object.entries(obj).flatMap(([key, value]) => {
		const fullKey = prefix ? `${prefix}.${key}` : key;
		if (typeof value === 'object' && value !== null) {
			return flattenKeys(value as Record<string, unknown>, fullKey);
		}
		return [fullKey];
	});
}

function compareKeys(
	baseLang: string,
	compareLang: string,
	baseKeys: string[],
	compareKeysList: string[],
	missingCollector: string[],
) {
	const missing = baseKeys.filter(k => !compareKeysList.includes(k));
	if (missing.length) {
		console.log(`\n⚠️ Missing keys in "${compareLang}.json" (present in ${baseLang}.json):`);
		missing.forEach(k => console.log(`  - ${k}`));
		missingCollector.push(...missing.map(k => `${compareLang}: ${k}`));
	}
	else {
		console.log(`✔️ "${compareLang}.json" has all keys from "${baseLang}.json".`);
	}
}

try {
	const pt = JSON.parse(fs.readFileSync(files.pt, 'utf8'));
	const en = JSON.parse(fs.readFileSync(files.en, 'utf8'));

	const ptKeys = flattenKeys(pt);
	const enKeys = flattenKeys(en);

	const missing: string[] = [];

	compareKeys('pt', 'en', ptKeys, enKeys, missing);
	compareKeys('en', 'pt', enKeys, ptKeys, missing);

	if (missing.length > 0) {
		console.log('\n❌ Translation check failed: some keys are missing.');
		process.exit(1);
	}
	else {
		console.log('\n✅ All translation files are perfectly in sync!');
		process.exit(0);
	}
}
catch (err) {
	console.error('💥 Error reading or parsing translation files:', err);
	process.exit(1);
}
