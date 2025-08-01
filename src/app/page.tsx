"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [quickStats, setQuickStats] = useState({
    weeklyDistance: '0',
    avgPace: '0:00',
    nextGoal: 'Aucun objectif'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            🏃‍♂️ CoachCourseTrail
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Votre coach virtuel professionnel
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold">{quickStats.weeklyDistance} km</div>
            <div className="text-blue-200">Cette semaine</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold">{quickStats.avgPace}</div>
            <div className="text-blue-200">Allure moyenne</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold">{quickStats.nextGoal}</div>
            <div className="text-blue-200">Prochain objectif</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/planning" className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-xl font-bold mb-2">Planning</h2>
            <p className="text-blue-100">Plans d'entraînement personnalisés</p>
          </Link>
          
          <Link href="/pace-simulator" className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-4xl mb-4">⚡</div>
            <h2 className="text-xl font-bold mb-2">Pace Simulator</h2>
            <p className="text-blue-100">Calculez vos allures cibles</p>
          </Link>
          
          <Link href="/nutrition" className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-4xl mb-4">🥗</div>
            <h2 className="text-xl font-bold mb-2">Nutrition</h2>
            <p className="text-blue-100">Conseils nutritionnels personnalisés</p>
          </Link>
          
          <Link href="/objectifs" className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-xl font-bold mb-2">Objectifs</h2>
            <p className="text-blue-100">Définissez et suivez vos objectifs</p>
          </Link>
          
          <Link href="/profil" className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-4xl mb-4">👤</div>
            <h2 className="text-xl font-bold mb-2">Profil</h2>
            <p className="text-blue-100">Gérez vos informations</p>
          </Link>
          
          <Link href="/suivi" className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="text-4xl mb-4">📈</div>
            <h2 className="text-xl font-bold mb-2">Suivi</h2>
            <p className="text-blue-100">Analysez vos performances</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
