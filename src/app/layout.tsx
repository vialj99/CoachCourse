import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CoachCourseTrail - Votre coach virtuel pour la course et le trail',
  description: 'Application de coaching virtuel pour la course à pied et le trail running avec plans d\'entraînement personnalisés, simulateur d\'allure et conseils nutritionnels.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
