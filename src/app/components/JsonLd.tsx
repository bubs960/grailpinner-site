// Renders a JSON-LD structured-data block. Safe for static export — the schema
// is serialized at build time into a <script type="application/ld+json">.

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
