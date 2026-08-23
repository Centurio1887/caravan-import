type CostRowProps = {
  label: string
  hint: string
  value: string
}

export function CostRow({ label, hint, value }: CostRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3.5">
      <div>
        <p className="font-medium text-card-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{hint}</p>
      </div>
      <p className="shrink-0 font-mono text-lg font-semibold tabular-nums text-card-foreground">
        {value}
      </p>
    </div>
  )
}
