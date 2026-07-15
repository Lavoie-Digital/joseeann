/**
 * Injecte un bloc de données structurées JSON-LD dans le document.
 * À placer n'importe où dans l'arbre React (rendu côté serveur).
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
