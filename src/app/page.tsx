"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation moderne */}
      <nav className="glass-effect sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FlowRun
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Dashboard</Link>
            <Link href="/planning" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Planning</Link>
            <Link href="/suivi" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Suivi</Link>
            <Link href="/objectifs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Objectifs</Link>
            <Link href="/profil" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Profil</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Transformez
            </span>
            <br />
            <span className="text-gray-900">Votre Course</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            L'application de coaching running qui utilise l'IA pour créer des plans d'entraînement 
            personnalisés et analyser vos performances comme jamais auparavant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4">
              Commencer l'aventure
            </button>
            <button className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold hover:border-gray-300 transition-all">
              Voir la démo
            </button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="stat-card">
              <div className="text-3xl font-bold mb-2">2,847</div>
              <div className="text-blue-100">Athlètes coachés</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl font-bold mb-2">94%</div>
              <div className="text-blue-100">Objectifs atteints</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl font-bold mb-2">15K</div>
              <div className="text-blue-100">Séances planifiées</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Pourquoi les <span className="text-blue-600">pros</span> choisissent FlowRun
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="modern-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🧠</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">IA Intelligente</h3>
              <p className="text-gray-600">
                Notre algorithme analyse vos performances et adapte votre plan en temps réel 
                pour des résultats optimaux.
              </p>
            </div>
            
            <div className="modern-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Analytics Pro</h3>
              <p className="text-gray-600">
                Des visualisations de données avancées pour comprendre chaque aspect 
                de vos performances.
              </p>
            </div>
            
            <div className="modern-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Coaching Personnalisé</h3>
              <p className="text-gray-600">
                Des recommandations sur mesure basées sur votre physiologie, 
                vos objectifs et votre style de vie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="modern-card p-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Prêt à révolutionner votre entraînement ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Rejoignez des milliers d'athlètes qui ont déjà transformé leurs performances avec FlowRun.
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              Commencer gratuitement
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
