import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tagotrix Instrumentation Technologies | Lab Equipment Bangalore',
  description:
    'India trusted supplier of laboratory instruments. Spectrophotometers, centrifuges, incubators, laminar airflow cabinets, fume hoods. Best pricing, pan-India delivery and installation.',
  keywords:
    'lab equipment bangalore, spectrophotometer india, centrifuge supplier, incubator manufacturer, laminar airflow cabinet, fume hood supplier',
  openGraph: {
    title: 'Tagotrix — Premium Lab Instruments India',
    description:
      'One-stop lab equipment supplier for pharma, research and industrial labs.',
    url: 'https://tagotrix.com',
    siteName: 'Tagotrix Instrumentation Technologies',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
