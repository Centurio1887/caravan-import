import { ArrowRight } from 'lucide-react'

function FlagBadge({
  flag,
  label,
  country,
}: {
  flag: string
  label: string
  country: string
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className="flex size-14 items-center justify-center rounded-2xl border border-border bg-card text-3xl shadow-sm sm:size-16 sm:text-4xl"
        aria-hidden="true"
      >
        {flag}
      </span>
      <div className="text-center">
        <span className="block text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="block text-sm font-bold text-foreground">{country}</span>
      </div>
    </div>
  )
}

export function RouteHeader() {
  return (
    <header className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {/* Route banner */}
      <div className="relative flex items-center justify-center gap-4 border-b border-border bg-card px-4 py-8 sm:gap-8 sm:py-10">
        {/* subtle red accents inspired by the Japanese flag */}
        <div
          className="pointer-events-none absolute left-6 top-6 size-24 rounded-full bg-primary/5 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-6 bottom-6 size-24 rounded-full bg-primary/5 blur-2xl"
          aria-hidden="true"
        />

        <FlagBadge flag="🇯🇵" label="Von" country="Japan" />

        <div className="flex flex-col items-center gap-1">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary">
            Import
          </span>
          <div className="flex items-center gap-1 text-primary">
            <span className="h-px w-5 bg-primary/40 sm:w-8" aria-hidden="true" />
            <ArrowRight className="size-5 sm:size-6" aria-hidden="true" />
            <span className="h-px w-5 bg-primary/40 sm:w-8" aria-hidden="true" />
          </div>
        </div>

        <FlagBadge flag="🇩🇪" label="Nach" country="Deutschland" />
      </div>

      {/* Title block */}
      <div className="flex flex-col gap-4 px-5 py-7 sm:px-8 sm:py-9">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            KFZ-Teile Rechner
          </span>
        </div>
        <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          Japan Import-Rechner für Autoteile
        </h1>
        <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Finde in 3 Sekunden heraus, was dein Ersatzteil aus Japan inklusive Zoll
          und Steuern wirklich kostet.
        </p>
      </div>
    </header>
  )
}
