'use client'

type NumberFieldProps = {
  id: string
  label: string
  prefix: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  size?: 'md' | 'lg'
}

export function NumberField({
  id,
  label,
  prefix,
  placeholder,
  value,
  onChange,
  size = 'md',
}: NumberFieldProps) {
  const large = size === 'lg'

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`font-semibold text-card-foreground ${large ? 'text-lg' : 'text-base'}`}
      >
        {label}
      </label>
      <div
        className={`flex items-center rounded-xl border bg-card transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 ${
          large ? 'border-2 border-primary/30' : 'border border-input'
        }`}
      >
        <span
          className={`pl-4 pr-1 font-mono text-muted-foreground ${large ? 'text-2xl' : 'text-lg'}`}
          aria-hidden="true"
        >
          {prefix}
        </span>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full rounded-xl bg-transparent px-2 font-mono text-foreground outline-none placeholder:text-muted-foreground/60 ${
            large ? 'py-4 text-2xl font-semibold' : 'py-3.5 text-lg'
          }`}
        />
      </div>
    </div>
  )
}
