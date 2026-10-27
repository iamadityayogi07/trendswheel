export default function JsonLd({ data }: { data: unknown }) {
  // `<` is escaped so a closing script tag inside the data can never end the block.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
