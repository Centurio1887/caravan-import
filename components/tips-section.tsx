import { ShoppingBag, ArrowLeftRight, Landmark, ArrowUpRight } from 'lucide-react'

const tips = [
  {
    icon: ShoppingBag,
    title: 'Japan-Shops',
    text: 'Bekannte Marktplätze für gebrauchte und neue Teile: Croooober, Yahoo! Auctions Japan und UpGarage.',
    href: 'https://www.croooober.com',
    linkLabel: 'croooober.com',
  },
  {
    icon: ArrowLeftRight,
    title: 'Günstig überweisen',
    text: 'Nutze Dienste mit echtem Wechselkurs (z. B. Wise), um hohe Bankgebühren und schlechte Kurse zu vermeiden.',
    href: 'https://wise.com',
    linkLabel: 'wise.com',
  },
  {
    icon: Landmark,
    title: 'Zoll-Abwicklung',
    text: 'Bei DHL Express oder FedEx zahlst du Zoll und Steuer unkompliziert direkt an der Haustür bei Zustellung.',
    href: 'https://www.dhl.de',
    linkLabel: 'dhl.de',
  },
]

export function TipsSection() {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Empfohlene Import-Dienste &amp; Spar-Tipps
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {tips.map((tip) => (
          <a
            key={tip.title}
            href={tip.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-xl border border-border bg-secondary/40 p-4 outline-none transition-colors hover:border-primary/40 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <tip.icon className="size-5" aria-hidden="true" />
              </span>
              <ArrowUpRight
                className="size-5 text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-base font-bold text-foreground">{tip.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              {tip.text}
            </p>
            <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary">
              {tip.linkLabel}
              <span className="sr-only"> (öffnet in neuem Tab)</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
