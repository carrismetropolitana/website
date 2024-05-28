'use client';

import { transliterate } from 'inflected';

export default function useSearch(query, data, options) {
  //

  // 1.
  // Define variables to hold the values

  let finalResult = data || [];

  // 2.
  // Return all data if query is empty

  if (!query) return limitArraySize(finalResult, options.limitResults);

  // 3.
  // Normalize the query

  const normalizedQuery = normalizeString(query, { regexMatch: true, regexReplace: options.regexReplace, toLowerCase: true, transliterate: true });

  // 4.
  // Check if 'keys' option is present

  if (options && options.keys) {
    finalResult = finalResult.filter((item) => {
      let hasMatch = false;
      for (let key of options.keys) {
        if (item.hasOwnProperty(key)) {
          const normalizedValue = normalizeString(String(item[key]), { regexReplace: options.regexReplace, toLowerCase: true, transliterate: true });
          if (normalizedQuery.test(normalizedValue)) {
            hasMatch = true;
            break
          }
        }
      }
      return hasMatch;
    })
    return limitArraySize(finalResult, options.limitResults);
  }

  // The case where options is not defined
  finalResult = finalResult.filter((item) => {
    const stringifiedValue = Object.values(item).join('');
    const normalizedValue = normalizeString(stringifiedValue, { toLowerCase: true, transliterate: true });
    return normalizedValue.includes(normalizedQuery);
  })

  return limitArraySize(finalResult, options.limitResults);

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
  if (options && options.regexReplace) normalizedString = normalizedString.replace(options.regexReplace, '').replace(/\s+/g, ' ');
  // Use the join method to insert the pattern between each character
  if (options && options.regexMatch) normalizedString = new RegExp(`.*${normalizedString.split(' ').join('.*')}.*`);
  // Return result
  return normalizedString;
  //
}

function limitArraySize(array, limit) {
  return array.slice(0, limit || array.length);
}
