"use client"

import { useState } from 'react'

export default function SuiviPage() {
  const [sessions, setSessions] = useState([
    { id: 1, date: '2024-01-15', activity: 'Course facile', planned: '30 min', actual: '32 min', distance: '5.2km', pace: '6:09/km', feeling: 'Bien' },
    { id: 2, date: '2024-01-13', activity: 'Longue distance', planned: '60 min', actual: '58 min', distance: '9.8km', pace: '5:55/km', feeling: 'Excellent' },
    { id: 3, date: '2024-01-10', activity: 'Fractionné', planned: '40 min', actual: '42 min', distance: '6.5km', pace: '6:28/km', feeling: 'Difficile' }
  ])

  const [newSession, setNewSession] = useState({
    date: '',
    activity: '',
    planned: '',
    actual: '',
    distance: '',
    pace: '',
    feeling: 'Bien'
  })

  const handleInputChange = (field, value) => {
    setNewSession(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addSession = () => {
    console.log("Tentative d'ajout de séance...")
    console.log("Nouvelle session:", newSession)
    
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
    
    console.log("Session à ajouter:", session)
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

  const deleteSession = (id) => {
    setSessions(sessions.filter(session => session.id !== id))
  }

  const totalDistance = sessions.reduce((sum, session) => sum + parseFloat(session.distance || 0), 0)
  const avgPace = sessions.length > 0 ? '6:11/km' : '0:00/km'
  const totalSessions = sessions.length

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">📈 Suivi des Performances</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">🏃‍♂️</div>
          <div className="text-2xl font-bold text-indigo-600">{totalSessions}</div>
          <div className="text-gray-600">Séances effectuées</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">📏</div>
          <div className="text-2xl font-bold text-indigo-600">{totalDistance.toFixed(1)} km</div>
          <div className="text-gray-600">Distance totale</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">⚡</div>
          <div className="text-2xl font-bold text-indigo-600">{avgPace}</div>
          <div className="text-gray-600">Allure moyenne</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ajouter une Séance</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={newSession.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activité</label>
              <select
                value={newSession.activity}
                onChange={(e) => handleInputChange('activity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Sélectionner une activité</option>
                <option value="Course facile">Course facile</option>
                <option value="Longue distance">Longue distance</option>
                <option value="Fractionné">Fractionné</option>
                <option value="Course tempo">Course tempo</option>
                <option value="Seuil">Seuil</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Temps prévu</label>
                <input
                  type="text"
                  value={newSession.planned}
                  onChange={(e) => handleInputChange('planned', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="45 min"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Temps réel</label>
                <input
                  type="text"
                  value={newSession.actual}
                  onChange={(e) => handleInputChange('actual', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="42 min"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
                <input
                  type="number"
                  value={newSession.distance}
                  onChange={(e) => handleInputChange('distance', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="8.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allure</label>
                <input
                  type="text"
                  value={newSession.pace}
                  onChange={(e) => handleInputChange('pace', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="5:30/km"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Feeling</label>
              <select
                value={newSession.feeling}
                onChange={(e) => handleInputChange('feeling', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Excellent">Excellent 😄</option>
                <option value="Bien">Bien 👍</option>
                <option value="Normal">Normal 😐</option>
                <option value="Difficile">Difficile 😰</option>
                <option value="Très difficile">Très difficile 😫</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={addSession}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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
                className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Effacer
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Historique des Séances</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sessions.map((session) => (
              <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{session.activity}</h3>
                    <p className="text-sm text-gray-500">{session.date}</p>
                  </div>
                  <button
                    onClick={() => deleteSession(session.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    🗑️
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Prévu: </span>
                    <span>{session.planned}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Réel: </span>
                    <span>{session.actual}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Distance: </span>
                    <span>{session.distance} km</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Allure: </span>
                    <span>{session.pace}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-gray-600">Feeling: </span>
                  <span className={`font-medium ${
                    session.feeling === 'Excellent' ? 'text-green-600' :
                    session.feeling === 'Bien' ? 'text-blue-600' :
                    session.feeling === 'Normal' ? 'text-gray-600' :
                    session.feeling === 'Difficile' ? 'text-orange-600' :
                    'text-red-600'
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
  )
}
