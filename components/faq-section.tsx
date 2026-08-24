import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQS = [
  {
    q: 'Wie viel Zoll fällt auf Autos aus Japan an?',
    a: 'In der Regel gilt ein Zollsatz von 10% auf den Kaufpreis zzgl. der Transportkosten. Bei einzelnen KFZ-Ersatzteilen kann der Satz abweichen (oft ca. 3,5% im Rahmen des EU-Japan-Handelsabkommens EPA).',
  },
  {
    q: 'Wie wird die Einfuhrumsatzsteuer berechnet?',
    a: 'Die Einfuhrumsatzsteuer beträgt 19% und wird auf den Gesamtwert inklusive Zoll und Versand erhoben – also auf Warenwert + Versandkosten + bereits berechneten Zoll.',
  },
  {
    q: 'Welche Zusatzkosten können am Hafen entstehen?',
    a: 'Am Hafen können Hafengebühren, Kosten für die Unbedenklichkeitsbescheinigung, Lagergebühren sowie Bearbeitungs- und Abwicklungsgebühren des Spediteurs oder Paketdienstes anfallen.',
  },
  {
    q: 'Lohnt sich der Import von Autoteilen aus Japan?',
    a: 'Für gängige Verschleißteile lohnt sich der Import wegen Zoll, Steuer und Versand meist nicht. Richtig interessant wird es bei Nischen- und JDM-Teilen, die in Deutschland gar nicht, nur schwer oder zu deutlich höheren Preisen erhältlich sind – hier sind trotz aller Importkosten oft spürbare Ersparnisse möglich. Mit dem Rechner oben siehst du sofort, ob sich der Import in deinem konkreten Fall auszahlt.',
  },
]

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <HelpCircle className="size-5" aria-hidden="true" />
        </span>
        <h2 id="faq-heading" className="text-lg font-bold tracking-tight text-foreground text-balance">
          FAQ &amp; Ratgeber
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {FAQS.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-border bg-background transition-colors open:border-primary/40 open:bg-primary/[0.03]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
              <span className="text-pretty">{item.q}</span>
              <ChevronDown
                className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground text-pretty">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
