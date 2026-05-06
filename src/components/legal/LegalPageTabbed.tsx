import type { LegalDocument } from "@/lib/legal/content";
import { LAST_UPDATED } from "@/lib/legal/content";

// Single-language legal document renderer. The component name still says
// "Tabbed" for historical reasons (originally bilingual EN/BS); now this
// project is EN-only, so it's just a straightforward render.
export function LegalPageTabbed({ content }: { content: LegalDocument }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:py-20 md:px-6">
      <p className="text-sm text-plum-500 mb-3">
        Last updated: {LAST_UPDATED}
      </p>

      <h1 className="font-display text-3xl md:text-5xl text-plum-900 mb-4">{content.title}</h1>
      <p className="text-lg text-plum-700 mb-10 leading-relaxed">{content.intro}</p>

      <div className="space-y-8">
        {content.sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-display text-xl md:text-2xl text-plum-800 mb-2">
              {s.heading}
            </h2>
            <p className="text-plum-700 leading-relaxed whitespace-pre-line">
              {s.body}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
