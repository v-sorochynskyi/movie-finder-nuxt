export const localesConfig = {
  baseUrl: process.env.BASE_URL,
  strategy: 'prefix',
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English'
    },
    {
      code: 'uk',
      iso: 'uk_UA',
      name: 'Українська'
    }
  ],
  defaultLocale: 'en'
}
