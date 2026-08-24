'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

type ModalKey = 'impressum' | 'datenschutz' | null

export function LegalFooter() {
  const [open, setOpen] = useState<ModalKey>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(null)
    }
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <footer className="mt-2 border-t border-border pt-6">
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
        Hinweis: Dies ist eine Richtwert-Schätzung basierend auf
        Standard-Zollsätzen für KFZ-Teile (EU-Japan EPA). Der Zollsatz von
        3,5 % ist ein Durchschnittswert für Kfz-Ersatzteile und kann je nach
        genauer Warengruppe (Motor, Karosserie, Elektronik) abweichen.
      </p>

      <nav className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={() => setOpen('impressum')}
          className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          Impressum
        </button>
        <span aria-hidden className="text-border">
          |
        </span>
        <button
          type="button"
          onClick={() => setOpen('datenschutz')}
          className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          Datenschutz
        </button>
      </nav>

      {open && (
        <LegalModal
          title={open === 'impressum' ? 'Impressum' : 'Datenschutzerklärung'}
          onClose={() => setOpen(null)}
        >
          {open === 'impressum' ? <ImpressumContent /> : <DatenschutzContent />}
        </LegalModal>
      )}
    </footer>
  )
}

function LegalModal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-card shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <h2 className="text-lg font-bold text-card-foreground">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  )
}

function ImpressumContent() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-card-foreground">
      <div>
        <h3 className="font-semibold">Angaben gemäß § 5 DDG</h3>
        <p className="mt-1 text-muted-foreground">
          Vincenzo Lauricella
          <br />
          Zeppelinstr. 16
          <br />
          63477 Maintal
        </p>
      </div>

      <div>
        <h3 className="font-semibold">Vertreten durch</h3>
        <p className="mt-1 text-muted-foreground">Vincenzo Lauricella</p>
      </div>

      <div>
        <h3 className="font-semibold">Kontakt</h3>
        <p className="mt-1 text-muted-foreground">
          E-Mail:{' '}
          <a
            href="mailto:vnlaur@aol.com"
            className="text-primary underline underline-offset-2"
          >
            vnlaur@aol.com
          </a>
        </p>
      </div>

      <div>
        <h3 className="font-semibold">
          Verbraucherstreitbeilegung / Universalschlichtungsstelle
        </h3>
        <p className="mt-1 text-muted-foreground">
          Wir nehmen nicht an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teil und sind dazu auch nicht
          verpflichtet.
        </p>
      </div>

      <div>
        <h3 className="font-semibold">Haftung für Inhalte</h3>
        <p className="mt-1 text-muted-foreground">
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
          die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
          jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
          Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
          gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
          forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
          von entsprechenden Rechtsverletzungen werden wir diese Inhalte
          umgehend entfernen.
        </p>
      </div>

      <div>
        <h3 className="font-semibold">Haftung für Links</h3>
        <p className="mt-1 text-muted-foreground">
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
          Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
          waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
          inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
          Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden
          von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>
      </div>

      <div>
        <h3 className="font-semibold">Urheberrecht</h3>
        <p className="mt-1 text-muted-foreground">
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
          sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
          wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
          Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
          eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
          entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
          wir derartige Inhalte umgehend entfernen.
        </p>
      </div>

      <p className="border-t border-border pt-3 text-xs text-muted-foreground">
        Erstellt mit Impressum-Generator.de, dem Tool für Impressum und
        Datenschutz-Erklärung. Nach einer Vorlage der Kanzlei Hasselbach.
      </p>
    </div>
  )
}

function DatenschutzContent() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-card-foreground">
      <div>
        <h3 className="font-semibold">1. Datenschutz auf einen Blick</h3>
        <p className="mt-1 text-muted-foreground">
          Diese Anwendung ist ein reiner Rechner. Alle Eingaben (Preise,
          Versandkosten, Wechselkurs) werden ausschließlich lokal in deinem
          Browser verarbeitet und nicht an uns oder Dritte übertragen oder
          gespeichert.
        </p>
      </div>

      <div>
        <h3 className="font-semibold">2. Verantwortliche Stelle</h3>
        <p className="mt-1 text-muted-foreground">
          Vincenzo Lauricella
          <br />
          Zeppelinstr. 16
          <br />
          63477 Maintal
          <br />
          E-Mail:{' '}
          <a
            href="mailto:vnlaur@aol.com"
            className="text-primary underline underline-offset-2"
          >
            vnlaur@aol.com
          </a>
        </p>
      </div>

      <div>
        <h3 className="font-semibold">3. Externe Dienste (Wechselkurs)</h3>
        <p className="mt-1 text-muted-foreground">
          Zur Anzeige des aktuellen Wechselkurses ruft die App die öffentliche
          Frankfurter-API (frankfurter.dev) auf. Dabei wird technisch bedingt
          deine IP-Adresse an den Anbieter übertragen. Es werden keine
          personenbezogenen Eingaben aus dem Rechner mitgesendet.
        </p>
      </div>

      <div>
        <h3 className="font-semibold">4. Externe Links</h3>
        <p className="mt-1 text-muted-foreground">
          Die Seite enthält Links zu externen Anbietern (z. B. Croooober, Wise,
          DHL). Für deren Datenverarbeitung gelten die jeweiligen
          Datenschutzerklärungen der Anbieter.
        </p>
      </div>

      <div>
        <h3 className="font-semibold">5. Deine Rechte</h3>
        <p className="mt-1 text-muted-foreground">
          Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung und
          Einschränkung der Verarbeitung deiner personenbezogenen Daten sowie ein
          Beschwerderecht bei der zuständigen Aufsichtsbehörde. Da diese App
          keine personenbezogenen Daten speichert, fallen in der Regel jedoch
          keine gespeicherten Daten an.
        </p>
      </div>
    </div>
  )
}
