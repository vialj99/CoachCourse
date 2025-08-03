"use client"

import { useState } from 'react'

export default function PlanningPage() {
  const [userProfile, setUserProfile] = useState({
    level: 'débutant',
    weeklyDistance: '',
    age: '',
    vma: '',
    availableDays: ['lundi', 'mercredi', 'samedi']
  })
  
  const [trainingPlan, setTrainingPlan] = useState<{
  week: number;
  day: number;
  type: string;
  description: string;
  duration: string;
  intensity: string;
}[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [notification, setNotification] = useState('')

  const generatePersonalizedPlan = () => {
    setIsGenerating(true)
    setNotification('')
    
    setTimeout(() => {
      const basePlan = calculateTrainingPlan(userProfile)
      setTrainingPlan(basePlan)
      setIsGenerating(false)
      setNotification('✅ Plan généré avec succès !')
      
      setTimeout(() => setNotification(''), 3000)
    }, 1500)
  }

  const calculateTrainingPlan = (profile) => {
    const { level, vma, availableDays } = profile
    
    const vmaValue = parseFloat(vma) || 10
    const paces = {
      easy: (vmaValue * 0.65).toFixed(1),
      tempo: (vmaValue * 0.80).toFixed(1),
      interval: (vmaValue * 0.95).toFixed(1)
    }

    const weekPlan = []
    const allDays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
    
    allDays.forEach(day => {
      if (availableDays.includes(day)) {
        let session = generateSessionForDay(day, level, paces)
        weekPlan.push(session)
      } else {
        weekPlan.push({
          day: day,
          activity: 'Repos',
          duration: '-',
          intensity: '-',
          details: 'Jour de repos'
        })
      }
    })
    
    return weekPlan
  }

  const generateSessionForDay = (day, level, paces) => {
    const sessions = {
      débutant: {
        lundi: { activity: 'Course facile', duration: '30-40 min', intensity: 'Faible', details: `Allure : ${paces.easy} km/h` },
        mercredi: { activity: 'Course facile', duration: '25-35 min', intensity: 'Faible', details: `Allure : ${paces.easy} km/h` },
        samedi: { activity: 'Longue distance', duration: '45-60 min', intensity: 'Modérée', details: `Allure : ${paces.easy} km/h` }
      },
      intermédiaire: {
        lundi: { activity: 'Course tempo', duration: '45 min', intensity: 'Élevée', details: `Allure : ${paces.tempo} km/h` },
        mercredi: { activity: 'Fractionné', duration: '40 min', intensity: 'Élevée', details: `30/30 à ${paces.interval} km/h` },
        samedi: { activity: 'Longue distance', duration: '75-90 min', intensity: 'Modérée', details: `Allure : ${paces.easy} km/h` }
      },
      avancé: {
        lundi: { activity: 'Seuil', duration: '50 min', intensity: 'Élevée', details: `Allure : ${paces.tempo} km/h` },
        mercredi: { activity: 'Intervalles', duration: '60 min', intensity: 'Très élevée', details: `400m à ${paces.interval} km/h` },
        samedi: { activity: 'Longue distance', duration: '90-120 min', intensity: 'Modérée', details: `Allure : ${paces.easy} km/h` }
      }
    }
    
    return {
      day: day,
      ...sessions[level][day]
    }
  }

  const toggleDay = (day) => {
    setUserProfile(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">📋 Planning d'Entraînement</h1>
      
      {notification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
          {notification}
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Votre Profil Coureur</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
            <select
              value={userProfile.level}
              onChange={(e) => setUserProfile(prev => ({ ...prev, level: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="débutant">Débutant</option>
              <option value="intermédiaire">Intermédiaire</option>
              <option value="avancé">Avancé</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">VMA (km/h)</label>
            <input
              type="number"
              value={userProfile.vma}
              onChange={(e) => setUserProfile(prev => ({ ...prev, vma: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ex: 14"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Distance hebdomadaire (km)</label>
            <input
              type="number"
              value={userProfile.weeklyDistance}
              onChange={(e) => setUserProfile(prev => ({ ...prev, weeklyDistance: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="km/semaine"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Âge</label>
            <input
              type="number"
              value={userProfile.age}
              onChange={(e) => setUserProfile(prev => ({ ...prev, age: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Âge"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Jours disponibles</label>
          <div className="flex flex-wrap gap-2">
            {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map(day => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  userProfile.availableDays.includes(day)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={generatePersonalizedPlan}
          disabled={isGenerating}
          className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
            isGenerating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isGenerating ? '🔄 Génération en cours...' : '🏃‍♂️ Générer mon planning personnalisé'}
        </button>
      </div>

      {trainingPlan.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Votre Planning Personnalisé</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Jour</th>
                  <th className="text-left py-3 px-4">Activité</th>
                  <th className="text-left py-3 px-4">Durée</th>
                  <th className="text-left py-3 px-4">Intensité</th>
                  <th className="text-left py-3 px-4">Détails</th>
                  <th className="text-left py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {trainingPlan.map((day, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold">{day.day}</td>
                    <td className="py-3 px-4">{day.activity}</td>
                    <td className="py-3 px-4">{day.duration}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        day.intensity === 'Faible' ? 'bg-green-100 text-green-800' :
                        day.intensity === 'Modérée' ? 'bg-yellow-100 text-yellow-800' :
                        day.intensity === 'Élevée' ? 'bg-orange-100 text-orange-800' :
                        day.intensity === 'Très élevée' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {day.intensity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{day.details}</td>
                    <td className="py-3 px-4">
                      {day.activity !== 'Repos' && (
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Marquer terminé
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
