import { ImportCalculator } from '@/components/import-calculator'
import { RouteHeader } from '@/components/route-header'
import { TipsSection } from '@/components/tips-section'
import { FaqSection } from '@/components/faq-section'
import { LegalFooter } from '@/components/legal-footer'

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wie viel Zoll fällt auf Autos aus Japan an?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In der Regel gilt ein Zollsatz von 10% auf den Kaufpreis zzgl. der Transportkosten. Bei einzelnen KFZ-Ersatzteilen kann der Satz abweichen (oft ca. 3,5% im Rahmen des EU-Japan-Handelsabkommens EPA).',
      },
    },
    {
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
  ],
}

export default function Page() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <RouteHeader />

      <ImportCalculator />

      <TipsSection />

      <FaqSection />

      <LegalFooter />
    </main>
  )
}
