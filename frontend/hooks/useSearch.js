import { transliterate } from 'inflected';

export default function useSearch(query, data, options) {
  //

  // Return all data if query is empty
  if (!query) return data;

  // Normalize the query to remove non-English characters
  const normalizedQuery = transliterate(query.toLowerCase());

  // Check if 'keys' option is present
  if (options && options.keys) {
    return data.filter((item) => {
      let hasMatch = false;
      for (let key of options.keys) {
        if (item.hasOwnProperty(key)) {
          const value = item[key];
          const stringifiedValue = value ? String(value).toLowerCase() : '';
          const normalizedValue = transliterate(stringifiedValue);
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
    const stringifiedData = Object.values(item).join('').toLowerCase();
    const normalizedItemValue = transliterate(stringifiedData);
    return normalizedItemValue.includes(normalizedQuery);
  });

  //
}
