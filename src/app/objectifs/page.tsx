"use client"

import { useState } from 'react'

export default function ObjectifsPage() {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Courir 10km en moins de 50 minutes', targetDate: '2024-06-01', progress: 75, completed: false, category: 'performance' },
    { id: 2, title: 'Terminer un semi-marathon', targetDate: '2024-09-15', progress: 40, completed: false, category: 'distance' },
    { id: 3, title: 'Perdre 5kg', targetDate: '2024-07-01', progress: 60, completed: false, category: 'poids' },
    { id: 4, title: 'Courir 3 fois par semaine', targetDate: '2024-12-31', progress: 85, completed: false, category: 'fréquence' }
  ])
  
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetDate: '',
    category: 'performance',
    progress: 0
  })

  const [showCompleted, setShowCompleted] = useState(false)

  const addGoal = () => {
    if (newGoal.title && newGoal.targetDate) {
      const goal = {
        id: goals.length + 1,
        title: newGoal.title,
        targetDate: newGoal.targetDate,
        category: newGoal.category,
        progress: 0,
        completed: false
      }
      setGoals([...goals, goal])
      setNewGoal({ title: '', targetDate: '', category: 'performance', progress: 0 })
    }
  }

  const toggleGoal = (id) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ))
  }

  const updateProgress = (id, newProgress) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, progress: Math.max(0, Math.min(100, newProgress)) } : goal
    ))
  }

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  const getDaysRemaining = (targetDate) => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getCategoryIcon = (category) => {
    const icons = {
      performance: '🏃‍♂️',
      distance: '📏',
      poids: '⚖️',
      fréquence: '📅'
    }
    return icons[category] || '🎯'
  }

  const activeGoals = goals.filter(goal => !goal.completed)
  const completedGoals = goals.filter(goal => goal.completed)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">🎯 Mes Objectifs</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ajouter un Objectif</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Objectif</label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ex: Courir un marathon en moins de 4 heures"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date cible</label>
              <input
                type="date"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="performance">Performance (temps)</option>
                <option value="distance">Distance</option>
                <option value="poids">Poids</option>
                <option value="fréquence">Fréquence</option>
              </select>
            </div>
            
            <button
              onClick={addGoal}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Ajouter l'objectif
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Statistiques</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{activeGoals.length}</div>
              <div className="text-sm text-blue-800">Objectifs actifs</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{completedGoals.length}</div>
              <div className="text-sm text-green-800">Objectifs atteints</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700">Répartition par catégorie</h3>
            {['performance', 'distance', 'poids', 'fréquence'].map(category => {
              const count = goals.filter(goal => goal.category === category && !goal.completed).length
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{getCategoryIcon(category)}</span>
                    <span className="capitalize">{category}</span>
                  </div>
                  <span className="font-semibold">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Objectifs Actifs</h2>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-600">Voir les terminés</span>
            </label>
          </div>
        </div>
        
        <div className="space-y-4">
          {activeGoals.map((goal) => {
            const daysRemaining = getDaysRemaining(goal.targetDate)
            const isUrgent = daysRemaining < 30
            const isOverdue = daysRemaining < 0
            
            return (
              <div key={goal.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleGoal(goal.id)}
                      className="mt-1"
                    />
                    <div>
                      <h3 className="font-semibold text-lg flex items-center space-x-2">
                        <span>{getCategoryIcon(goal.category)}</span>
                        <span>{goal.title}</span>
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>Date cible: {goal.targetDate}</span>
                        <span className={`font-medium ${
                          isOverdue ? 'text-red-600' : 
                          isUrgent ? 'text-orange-600' : 
                          'text-green-600'
                        }`}>
                          {isOverdue ? `En retard de ${Math.abs(daysRemaining)} jours` : 
                           daysRemaining === 0 ? "Aujourd'hui !" : 
                           `${daysRemaining} jours restants`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                  >
                    🗑️
                  </button>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progression</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        goal.progress < 30 ? 'bg-red-500' :
                        goal.progress < 70 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <button
                      onClick={() => updateProgress(goal.id, goal.progress + 10)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                    >
                      +10%
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {showCompleted && completedGoals.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">✅ Objectifs Atteints</h3>
            <div className="space-y-3">
              {completedGoals.map((goal) => (
                <div key={goal.id} className="border rounded-lg p-4 bg-green-50 opacity-75">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleGoal(goal.id)}
                    />
                    <div>
                      <h3 className="font-semibold line-through text-gray-600 flex items-center space-x-2">
                        <span>{getCategoryIcon(goal.category)}</span>
                        <span>{goal.title}</span>
                      </h3>
                      <p className="text-sm text-gray-500">Atteint le {goal.targetDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeGoals.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🎯</div>
            <p>Aucun objectif actif. Ajoutez votre premier objectif !</p>
          </div>
        )}
      </div>
    </div>
  )
}
