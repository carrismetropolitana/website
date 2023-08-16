import { transliterate } from 'inflected';

export default function useSearch(query, data, options) {
  //

  // Return all data if query is empty
  if (!query) return data;

  // Normalize the query
  const normalizedQuery = normalizeString(query, { toLowerCase: true, transliterate: true, regexReplace: options.regexReplace });

  // Check if 'keys' option is present
  if (options && options.keys) {
    return data.filter((item) => {
      let hasMatch = false;
      for (let key of options.keys) {
        if (item.hasOwnProperty(key)) {
          const value = item[key];
          const stringifiedValue = value ? String(value) : '';
          const normalizedValue = normalizeString(stringifiedValue, { toLowerCase: true, transliterate: true, regexReplace: options.regexReplace });
          if (normalizedValue.includes(normalizedQuery)) {
            hasMatch = true;
            break;
          }
        }
      }
      return hasMatch;
    });
  }

  // The case where options is not defined
  return data.filter((item) => {
    const stringifiedValue = Object.values(item).join('');
    const normalizedValue = normalizeString(stringifiedValue, { toLowerCase: true, transliterate: true, regexReplace: options.regexReplace });
    return normalizedValue.includes(normalizedQuery);
  });

  //
}

function normalizeString(rawString, options) {
  // Initiate a variable to hold several normalization steps
  let normalizedString = rawString;
  // Convert the string to lowecase characters
  if (options && options.toLowerCase) normalizedString = normalizedString.toLowerCase();
  // Use inflected to remove non-English characters
  if (options && options.transliterate) normalizedString = transliterate(normalizedString);
  // Check if 'regex' option is present and replace forbidden characters
  if (options && options.regexReplace) normalizedString = normalizedString.replace(options.regexReplace, '');
  // Return result
  return normalizedString;
  //
}
