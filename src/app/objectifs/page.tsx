"use client"
import { useState } from 'react'

export default function ObjectifsPage() {
  const [goals, setGoals] = useState<{
    id: number;
    title: string;
    targetDate: string;
    progress: number;
    completed: boolean;
    category: string;
    currentPB?: string;
    targetTime?: string;
    trend: string;
  }[]>([
    { 
      id: 1, 
      title: 'Sous les 40min sur 10km', 
      targetDate: '2024-06-15', 
      progress: 78, 
      completed: false, 
      category: 'performance',
      currentPB: '42:15',
      targetTime: '39:59',
      trend: 'positive'
    },
    { 
      id: 2, 
      title: 'Marathon de Paris', 
      targetDate: '2024-10-06', 
      progress: 45, 
      completed: false, 
      category: 'endurance',
      currentPB: '3:45:30',
      targetTime: '3:30:00',
      trend: 'positive'
    },
    { 
      id: 3, 
      title: 'Consistance hebdomadaire', 
      targetDate: '2024-12-31', 
      progress: 92, 
      completed: false, 
      category: 'habit',
      currentStreak: '8 semaines',
      target: '4 sessions/semaine',
      trend: 'stable'
    }
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Objectifs de Performance</h1>
          <p className="text-xl text-gray-600">Définissez, suivez et atteignez vos ambitions running</p>
        </div>

        {/* Goal Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-2xl text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-green-100 text-sm">Objectifs actifs</p>
                <p className="text-3xl font-bold">{goals.length}</p>
              </div>
              <div className="text-3xl opacity-50">🎯</div>
            </div>
            <div className="bg-green-500 bg-opacity-30 rounded-lg p-3">
              <p className="text-sm">Prochain deadline</p>
              <p className="font-semibold">15 jours</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-blue-100 text-sm">Taux de réussite</p>
                <p className="text-3xl font-bold">87%</p>
              </div>
              <div className="text-3xl opacity-50">📈</div>
            </div>
            <div className="bg-blue-500 bg-opacity-30 rounded-lg p-3">
              <p className="text-sm">Objectifs atteints</p>
              <p className="font-semibold">13 sur 15</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-2xl text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-purple-100 text-sm">Progression moyenne</p>
                <p className="text-3xl font-bold">+23%</p>
              </div>
              <div className="text-3xl opacity-50">🚀</div>
            </div>
            <div className="bg-purple-500 bg-opacity-30 rounded-lg p-3">
              <p className="text-sm">Sur les 30 derniers jours</p>
              <p className="font-semibold">Excellente progression</p>
            </div>
          </div>
        </div>

        {/* Goals List */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Vos Objectifs</h2>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              + Nouvel objectif
            </button>
          </div>

          <div className="space-y-6">
            {goals.map((goal) => (
              <div key={goal.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{goal.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        goal.category === 'performance' ? 'bg-red-100 text-red-700' :
                        goal.category === 'endurance' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {goal.category}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Date cible</p>
                        <p className="font-semibold">{new Date(goal.targetDate).toLocaleDateString('fr-FR')}</p>
                      </div>
                      {goal.currentPB && (
                        <div>
                          <p className="text-gray-600">Performance actuelle</p>
                          <p className="font-semibold">{goal.currentPB}</p>
                        </div>
                      )}
                      {goal.targetTime && (
                        <div>
                          <p className="text-gray-600">Objectif</p>
                          <p className="font-semibold text-green-600">{goal.targetTime}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {goal.trend === 'positive' && (
                      <div className="text-green-600 text-2xl">📈</div>
                    )}
                    {goal.trend === 'stable' && (
                      <div className="text-blue-600 text-2xl">➡️</div>
                    )}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{goal.progress}%</div>
                      <div className="text-sm text-gray-600">complété</div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progression</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        goal.progress < 30 ? 'bg-red-500' :
                        goal.progress < 70 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Voir les détails
                  </button>
                  <button className="px-6 py-2 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    Modifier
                  </button>
                  <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
