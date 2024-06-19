/* * */

import { getRequestConfig } from 'next-intl/server';

/* * */

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./translations/${locale}.json`)).default,
  formats: {
    number: {
      kilometers: {
        style: 'unit',
        unit: 'kilometer',
        unitDisplay: 'short',
        maximumFractionDigits: 2,
      },
      currency_euro: {
        currencySign: 'standard',
        style: 'currency',
        currency: 'EUR',
      },
      percentage: {
        style: 'unit',
        unit: 'percent',
        maximumFractionDigits: 2,
      },
    },
  },
}));
