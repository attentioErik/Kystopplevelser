import type { SchemaNode } from '@/lib/schema';

// Page-level structured data. Nodes are combined into one @graph.
export default function JsonLd({ nodes }: { nodes: SchemaNode[] }) {
  const data = { '@context': 'https://schema.org', '@graph': nodes };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
