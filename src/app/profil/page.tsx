"use client"

import { useState } from 'react'

export default function ProfilPage() {
  const [profile, setProfile] = useState({
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    age: '30',
    weight: '70',
    height: '175',
    level: 'intermédiaire',
    weeklyDistance: '25',
    favoriteDistance: '10km'
  })

  const [isEditing, setIsEditing] = useState(false)

  const [workoutHistory, setWorkoutHistory] = useState([
    { date: '2024-01-15', type: 'Course facile', duration: '32 min', distance: '5.2km' },
    { date: '2024-01-13', type: 'Longue distance', duration: '58 min', distance: '9.8km' },
    { date: '2024-01-10', type: 'Fractionné', duration: '42 min', distance: '6.5km' }
  ])

  const [personalRecords, setPersonalRecords] = useState([
    { distance: '5km', time: '22:45', date: '2024-01-10' },
    { distance: '10km', time: '48:30', date: '2024-01-05' },
    { distance: '21.1km', time: '1:52:15', date: '2023-12-20' }
  ])

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const saveProfile = () => {
    setIsEditing(false)
  }

  const calculateStats = () => {
    const totalDistance = workoutHistory.reduce((sum, workout) => {
      return sum + parseFloat(workout.distance || 0)
    }, 0)
    
    const totalDuration = workoutHistory.reduce((sum, workout) => {
      const duration = parseInt(workout.duration) || 0
      return sum + duration
    }, 0)
    
    const avgPace = totalDistance > 0 ? totalDuration / totalDistance : 0
    
    return {
      totalDistance: totalDistance.toFixed(1),
      totalWorkouts: workoutHistory.length,
      avgPace: `${Math.floor(avgPace)}:${Math.round((avgPace - Math.floor(avgPace)) * 60).toString().padStart(2, '0')}/km`
    }
  }

  const stats = calculateStats()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">👤 Mon Profil</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Informations Personnelles</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Modifier
              </button>
            ) : (
              <button
                onClick={saveProfile}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Sauvegarder
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-gray-900">{profile.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-gray-900">{profile.email}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Âge</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.age} ans</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poids (kg)</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.weight} kg</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Taille (cm)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={profile.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-gray-900">{profile.height} cm</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Paramètres de Course</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
              {isEditing ? (
                <select
                  value={profile.level}
                  onChange={(e) => handleInputChange('level', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="débutant">Débutant</option>
                  <option value="intermédiaire">Intermédiaire</option>
                  <option value="avancé">Avancé</option>
                </select>
              ) : (
                <p className="text-gray-900 capitalize">{profile.level}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Distance hebdomadaire (km)</label>
              {isEditing ? (
                <input
                  type="number"
                  value={profile.weeklyDistance}
                  onChange={(e) => handleInputChange('weeklyDistance', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-gray-900">{profile.weeklyDistance} km/semaine</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Distance préférée</label>
              {isEditing ? (
                <select
                  value={profile.favoriteDistance}
                  onChange={(e) => handleInputChange('favoriteDistance', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="5km">5km</option>
                  <option value="10km">10km</option>
                  <option value="21.1km">Semi-marathon</option>
                  <option value="42.2km">Marathon</option>
                </select>
              ) : (
                <p className="text-gray-900">{profile.favoriteDistance}</p>
              )}
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
            <h3 className="font-semibold text-indigo-800 mb-2">Vos Statistiques</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">IMC:</span>
                <span className="font-semibold ml-2">
                  {(parseFloat(profile.weight) / Math.pow(parseFloat(profile.height) / 100, 2)).toFixed(1)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Distance annuelle estimée:</span>
                <span className="font-semibold ml-2">
                  {(parseFloat(profile.weeklyDistance) * 52).toFixed(0)} km
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 Mes Statistiques</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalWorkouts}</div>
              <div className="text-sm text-blue-800">Séances totales</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalDistance} km</div>
              <div className="text-sm text-green-800">Distance totale</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.avgPace}</div>
              <div className="text-sm text-purple-800">Allure moyenne</div>
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-700 mb-3">Dernières séances</h3>
          <div className="space-y-2">
            {workoutHistory.slice(0, 5).map((workout, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">{workout.type}</div>
                  <div className="text-sm text-gray-500">{workout.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{workout.distance}</div>
                  <div className="text-sm text-gray-500">{workout.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🏆 Records Personnels</h2>
          <div className="space-y-3">
            {personalRecords.map((record, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-lg text-indigo-600">{record.distance}</div>
                    <div className="text-sm text-gray-500">Record établi le {record.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{record.time}</div>
                    <button className="text-sm text-blue-600 hover:text-blue-800 mt-1">
                      Battre ce record
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
            + Ajouter un record
          </button>
        </div>
      </div>
    </div>
  )
}
