import { ImportCalculator } from '@/components/import-calculator'
import { RouteHeader } from '@/components/route-header'
import { TipsSection } from '@/components/tips-section'
import { FaqSection } from '@/components/faq-section'
import { LegalFooter } from '@/components/legal-footer'
import { getExchangeRate } from '@/lib/exchange-rate'

// Refresh the server-rendered exchange rate hourly.
export const revalidate = 3600

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
       {
      '@type': 'Question',
      name: 'Wie viel Zoll fällt auf Autos aus Japan an?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dank des EU-Japan-Freihandelsabkommens (EPA) gilt ein Präferenzzollsatz von 0%, wenn der japanische Verkäufer eine gültige Ursprungserklärung auf der Rechnung ausstellt. Fehlt diese Erklärung, greift der reguläre Zollsatz von 6,5% auf Kfz-Ersatzteile.',
      },
    },
      '@type': 'Question',
      name: 'Wie wird die Einfuhrumsatzsteuer berechnet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Einfuhrumsatzsteuer beträgt 19% und wird auf den Gesamtwert inklusive Zoll und Versand erhoben – also auf Warenwert + Versandkosten + bereits berechneten Zoll.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Zusatzkosten können am Hafen entstehen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Am Hafen können Hafengebühren, Kosten für die Unbedenklichkeitsbescheinigung, Lagergebühren sowie Bearbeitungs- und Abwicklungsgebühren des Spediteurs oder Paketdienstes anfallen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Lohnt sich der Import von Autoteilen aus Japan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Für gängige Verschleißteile lohnt sich der Import wegen Zoll, Steuer und Versand meist nicht. Richtig interessant wird es bei Nischen- und JDM-Teilen, die in Deutschland gar nicht, nur schwer oder zu deutlich höheren Preisen erhältlich sind – hier sind trotz aller Importkosten oft spürbare Ersparnisse möglich. Mit dem Rechner oben siehst du sofort, ob sich der Import in deinem konkreten Fall auszahlt.',
      },
    },
  ],
}

export default async function Page() {
  const exchangeRate = await getExchangeRate()

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <RouteHeader />

      <ImportCalculator exchangeRate={exchangeRate} />

      <TipsSection />

      <FaqSection />

      <LegalFooter />
    </main>
  )
}
