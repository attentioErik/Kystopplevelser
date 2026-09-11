import { SITE_URL } from './seo';

/** Shared @id for the company entity declared in src/app/layout.tsx */
export const ORG_ID = `${SITE_URL}/#organization`;

export type SchemaNode = Record<string, unknown>;

export function pageUrl(locale: string, nbPath: string, enPath: string): string {
  return `${SITE_URL}${locale === 'en' ? enPath : nbPath}`;
}

export function breadcrumbList(items: { name: string; url: string }[]): SchemaNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPage(url: string, items: { question: string; answer: string }[]): SchemaNode {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}
