```tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CoachCourseTrail',
  description: 'Votre coach virtuel pour la course et le trail',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold">
                🏃‍♂️ CoachCourseTrail
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="hover:text-blue-200 transition-colors">
                  🏠 Accueil
                </Link>
                <Link href="/planning" className="hover:text-blue-200 transition-colors">
                  📋 Planning
                </Link>
                <Link href="/pace-simulator" className="hover:text-blue-200 transition-colors">
                  ⚡ Pace Simulator
                </Link>
                <Link href="/nutrition" className="hover:text-blue-200 transition-colors">
                  🥗 Nutrition
                </Link>
                <Link href="/objectifs" className="hover:text-blue-200 transition-colors">
                  🎯 Objectifs
                </Link>
                <Link href="/profil" className="hover:text-blue-200 transition-colors">
                  👤 Profil
                </Link>
                <Link href="/suivi" className="hover:text-blue-200 transition-colors">
                  📈 Suivi
                </Link>
              </div>
              <div className="md:hidden">
                <button className="text-white">
                  ☰
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </main>
      </body>
    </html>
  )
}
