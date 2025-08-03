"use client"
import { useState } from 'react'

export default function SuiviPage() {
  const [sessions, setSessions] = useState<{
    id: number;
    date: string;
    activity: string;
    planned: string;
    actual: string;
    distance: string;
    pace: string;
    feeling: string;
  }[]>([
    { id: 1, date: '2024-01-15', activity: 'Course facile', planned: '30 min', actual: '32 min', distance: '5.2km', pace: '6:09/km', feeling: 'Bien' },
    { id: 2, date: '2024-01-13', activity: 'Longue distance', planned: '60 min', actual: '58 min', distance: '9.8km', pace: '5:55/km', feeling: 'Excellent' },
    { id: 3, date: '2024-01-10', activity: 'Fractionné', planned: '40 min', actual: '42 min', distance: '6.5km', pace: '6:28/km', feeling: 'Difficile' }
  ])
  
  const [newSession, setNewSession] = useState<{
    date: string;
    activity: string;
    planned: string;
    actual: string;
    distance: string;
    pace: string;
    feeling: string;
  }>({
    date: '',
    activity: '',
    planned: '',
    actual: '',
    distance: '',
    pace: '',
    feeling: 'Bien'
  })
  
  const handleInputChange = (field: string, value: string | number) => {
    setNewSession(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  const addSession = () => {
    if (!newSession.date || !newSession.activity) {
      alert('Veuillez remplir au moins la date et l\'activité')
      return
    }
    
    const session = {
      id: Date.now(),
      date: newSession.date,
      activity: newSession.activity,
      planned: newSession.planned || '-',
      actual: newSession.actual || '-',
      distance: newSession.distance || '0',
      pace: newSession.pace || '-',
      feeling: newSession.feeling || 'Normal'
    }
    
    setSessions(prev => [session, ...prev])
    
    setNewSession({
      date: '',
      activity: '',
      planned: '',
      actual: '',
      distance: '',
      pace: '',
      feeling: 'Bien'
    })
    
    alert('Séance ajoutée avec succès !')
  }
  
  const deleteSession = (id: number) => {
    setSessions(sessions.filter(session => session.id !== id))
  }
  
  const totalDistance = sessions.reduce((sum, session) => sum + parseFloat(session.distance || '0'), 0)
  const avgPace = sessions.length > 0 ? '6:11/km' : '0:00/km'
  const totalSessions = sessions.length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Suivi des Performances</h1>
          <p className="text-xl text-gray-600">Analysez votre progression et atteignez vos objectifs</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="text-3xl font-bold mb-2">{totalSessions}</div>
            <div className="text-blue-100">Séances effectuées</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-bold mb-2">{totalDistance.toFixed(1)} km</div>
            <div className="text-blue-100">Distance totale</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-bold mb-2">{avgPace}</div>
            <div className="text-blue-100">Allure moyenne</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-bold mb-2">85%</div>
            <div className="text-blue-100">Objectifs atteints</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Session Form */}
          <div className="modern-card p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ajouter une Séance</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newSession.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activité</label>
                  <select
                    value={newSession.activity}
                    onChange={(e) => handleInputChange('activity', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Course facile">Course facile</option>
                    <option value="Longue distance">Longue distance</option>
                    <option value="Fractionné">Fractionné</option>
                    <option value="Course tempo">Course tempo</option>
                    <option value="Seuil">Seuil</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temps prévu</label>
                  <input
                    type="text"
                    value={newSession.planned}
                    onChange={(e) => handleInputChange('planned', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="45 min"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temps réel</label>
                  <input
                    type="text"
                    value={newSession.actual}
                    onChange={(e) => handleInputChange('actual', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="42 min"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Distance (km)</label>
                  <input
                    type="number"
                    value={newSession.distance}
                    onChange={(e) => handleInputChange('distance', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="8.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Allure</label>
                  <input
                    type="text"
                    value={newSession.pace}
                    onChange={(e) => handleInputChange('pace', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5:30/km"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feeling</label>
                <select
                  value={newSession.feeling}
                  onChange={(e) => handleInputChange('feeling', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Excellent">Excellent 😄</option>
                  <option value="Bien">Bien 👍</option>
                  <option value="Normal">Normal 😐</option>
                  <option value="Difficile">Difficile 😰</option>
                  <option value="Très difficile">Très difficile 😫</option>
                </select>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={addSession}
                  className="flex-1 btn-primary"
                >
                  Ajouter la séance
                </button>
                <button
                  onClick={() => setNewSession({
                    date: '',
                    activity: '',
                    planned: '',
                    actual: '',
                    distance: '',
                    pace: '',
                    feeling: 'Bien'
                  })}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Effacer
                </button>
              </div>
            </div>
          </div>

          {/* Session History */}
          <div className="modern-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Historique des Séances</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition-colors">
                  Filtrer
                </button>
                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-colors">
                  Exporter
                </button>
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {sessions.map((session) => (
                <div key={session.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                        {session.activity.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{session.activity}</h3>
                        <p className="text-sm text-gray-500">{session.date}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-xl transition-all"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-600">Prévu</p>
                      <p className="font-semibold">{session.planned}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-600">Réel</p>
                      <p className="font-semibold">{session.actual}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-600">Distance</p>
                      <p className="font-semibold">{session.distance} km</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-600">Allure</p>
                      <p className="font-semibold">{session.pace}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-gray-600">Feeling:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      session.feeling === 'Excellent' ? 'bg-green-100 text-green-700' :
                      session.feeling === 'Bien' ? 'bg-blue-100 text-blue-700' :
                      session.feeling === 'Normal' ? 'bg-gray-100 text-gray-700' :
                      session.feeling === 'Difficile' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {session.feeling}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
