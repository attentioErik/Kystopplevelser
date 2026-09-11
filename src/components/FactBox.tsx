interface FactBoxProps {
  title: string;
  /** Self-contained 40–60 word answer, extractable by search engines and AI assistants */
  summary: string;
  facts: { label: string; value: string }[];
}

export default function FactBox({ title, summary, facts }: FactBoxProps) {
  return (
    <section className="section section--sm" aria-labelledby="factbox-heading">
      <div className="container--md">
        <div className="factbox reveal">
          <h2 id="factbox-heading" className="factbox__title">{title}</h2>
          <p className="factbox__summary">{summary}</p>
          <dl className="factbox__list">
            {facts.map((fact) => (
              <div key={fact.label} className="factbox__item">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
