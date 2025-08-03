"use client"
import { useState } from 'react'

export default function PlanningPage() {
  const [userProfile, setUserProfile] = useState<{
    level: string;
    weeklyDistance: string;
    age: string;
    vma: string;
    availableDays: string[];
  }>({
    level: 'intermédiaire',
    weeklyDistance: '25',
    age: '30',
    vma: '14',
    availableDays: ['lundi', 'mercredi', 'samedi']
  })
  
  const [trainingPlan, setTrainingPlan] = useState<{
    day: string;
    activity: string;
    duration: string;
    intensity: string;
    details: string;
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
  
  const calculateTrainingPlan = (profile: {
    level: string;
    vma: string;
    availableDays: string[];
  }) => {
    const { level, vma, availableDays } = profile
    
    const vmaValue = parseFloat(vma) || 10
    const paces = {
      easy: (vmaValue * 0.65).toFixed(1),
      tempo: (vmaValue * 0.80).toFixed(1),
      interval: (vmaValue * 0.95).toFixed(1)
    }
    
    const weekPlan: {
      day: string;
      activity: string;
      duration: string;
      intensity: string;
      details: string;
    }[] = []
    
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
  
  const generateSessionForDay = (day: string, level: string, paces: {
    easy: string;
    tempo: string;
    interval: string;
  }) => {
    const sessions: Record<string, Record<string, {
      activity: string;
      duration: string;
      intensity: string;
      details: string;
    }>> = {
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
  
  const toggleDay = (day: string) => {
    setUserProfile(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Planning d'Entraînement</h1>
          <p className="text-xl text-gray-600">Des plans sur mesure adaptés à vos objectifs et votre niveau</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Setup */}
          <div className="lg:col-span-1">
            <div className="modern-card p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Votre Profil</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                  <select
                    value={userProfile.level}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, level: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="débutant">Débutant</option>
                    <option value="intermédiaire">Intermédiaire</option>
                    <option value="avancé">Avancé</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">VMA (km/h)</label>
                  <input
                    type="number"
                    value={userProfile.vma}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, vma: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 14"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jours d'entraînement</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map(day => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                          userProfile.availableDays.includes(day)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button
                onClick={generatePersonalizedPlan}
                disabled={isGenerating}
                className={`w-full mt-6 px-6 py-4 rounded-xl font-semibold transition-all ${
                  isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {isGenerating ? '🔄 Génération en cours...' : '🏃‍♂️ Générer mon plan'}
              </button>
            </div>

            {/* AI Coach Tips */}
            <div className="modern-card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Conseils IA</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm text-blue-800">
                    Basé sur votre profil, je recommande 3-4 séances par semaine pour une progression optimale.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm text-green-800">
                    N'oubliez pas d'inclure une séance longue chaque semaine pour améliorer votre endurance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Training Plan */}
          <div className="lg:col-span-2">
            {trainingPlan.length > 0 ? (
              <div className="modern-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Votre Plan Semainier</h2>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition-colors">
                      Exporter
                    </button>
                    <button className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-colors">
                      Partager
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {trainingPlan.map((day, index) => (
                    <div key={index} className={`border-2 rounded-2xl p-6 transition-all hover:shadow-lg ${
                      day.activity === 'Repos' 
                        ? 'border-gray-200 bg-gray-50' 
                        : 'border-blue-200 bg-blue-50'
                    }`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                            day.activity === 'Repos' ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-purple-600'
                          }`}>
                            {day.day.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{day.day}</h3>
                            <p className={`text-sm font-medium ${
                              day.activity === 'Repos' ? 'text-gray-600' : 'text-blue-600'
                            }`}>
                              {day.activity}
                            </p>
                          </div>
                        </div>
                        
                        {day.activity !== 'Repos' && (
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">{day.duration}</div>
                            <div className={`text-sm font-medium ${
                              day.intensity === 'Faible' ? 'text-green-600' :
                              day.intensity === 'Modérée' ? 'text-yellow-600' :
                              day.intensity === 'Élevée' ? 'text-orange-600' :
                              'text-red-600'
                            }`}>
                              {day.intensity}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {day.activity !== 'Repos' && (
                        <div className="bg-white rounded-xl p-4">
                          <p className="text-sm text-gray-600">{day.details}</p>
                          <div className="flex space-x-3 mt-4">
                            <button className="flex-1 bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                              Commencer
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                              Modifier
                            </button>
                            <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                              Report
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="modern-card p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pas de plan généré</h3>
                <p className="text-gray-600 mb-8">
                  Configurez votre profil et générez votre premier plan d'entraînement personnalisé.
                </p>
                <button
                  onClick={generatePersonalizedPlan}
                  className="btn-primary px-8 py-4"
                >
                  Générer mon plan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
