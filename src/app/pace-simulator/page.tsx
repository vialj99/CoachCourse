"use client"

import { useState } from 'react'

export default function PaceSimulatorPage() {
  const [inputs, setInputs] = useState({
    goalTime: '',
    goalDistance: '10km',
    currentDistance: '',
    currentTime: '',
    vma: ''
  })
  
  const [results, setResults] = useState(null)
  const [calculations, setCalculations] = useState([])

  const calculatePace = () => {
    if (!inputs.goalTime || !inputs.goalDistance) {
      alert('Veuillez remplir le temps objectif et la distance')
      return
    }
    
    const [hours, minutes] = inputs.goalTime.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes
    const distanceKm = parseFloat(inputs.goalDistance)
    
    const paceMinPerKm = totalMinutes / distanceKm
    const paceMinutes = Math.floor(paceMinPerKm)
    const paceSeconds = Math.round((paceMinPerKm - paceMinutes) * 60)
    
    const distances = ['5km', '10km', '21.1km', '42.2km']
    const results = distances.map(dist => {
      const distKm = parseFloat(dist)
      const totalTime = paceMinPerKm * distKm
      const h = Math.floor(totalTime / 60)
      const m = Math.round(totalTime % 60)
      return {
        distance: dist,
        time: h > 0 ? `${h}h${m}min` : `${m}min`,
        pace: `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}/km`,
        speed: (60 / paceMinPerKm).toFixed(2) + ' km/h'
      }
    })
    
    setResults(results)
    
    const newCalculation = {
      id: Date.now(),
      date: new Date().toLocaleDateString('fr-FR'),
      goalTime: inputs.goalTime,
      goalDistance: inputs.goalDistance,
      pace: `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}/km`
    }
    setCalculations(prev => [newCalculation, ...prev.slice(0, 4)])
  }

  const calculateFromVMA = () => {
    if (!inputs.vma) {
      alert('Veuillez entrer votre VMA')
      return
    }
    
    const vma = parseFloat(inputs.vma)
    const percentages = {
      'Endurance (60-70%)': vma * 0.65,
      'Rythme (75-85%)': vma * 0.80,
      'Seuil (85-90%)': vma * 0.87,
      'VMA (95-100%)': vma * 0.97,
      'Sprint (100%+)': vma * 1.05
    }
    
    const vmaResults = Object.entries(percentages).map(([name, speed]) => {
      const paceMinPerKm = 60 / speed
      const paceMinutes = Math.floor(paceMinPerKm)
      const paceSeconds = Math.round((paceMinPerKm - paceMinutes) * 60)
      
      return {
        name,
        speed: speed.toFixed(1) + ' km/h',
        pace: `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}/km`
      }
    })
    
    setResults(vmaResults)
  }

  const clearResults = () => {
    setResults(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">⚡ Simulateur d'Allure</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Objectif de course</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temps objectif (HH:MM)</label>
              <input
                type="text"
                value={inputs.goalTime}
                onChange={(e) => setInputs(prev => ({ ...prev, goalTime: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ex: 1:30"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Distance objectif</label>
              <select
                value={inputs.goalDistance}
                onChange={(e) => setInputs(prev => ({ ...prev, goalDistance: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="5km">5km</option>
                <option value="10km">10km</option>
                <option value="21.1km">Semi-marathon (21.1km)</option>
                <option value="42.2km">Marathon (42.2km)</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={calculatePace}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Calculer
              </button>
              <button
                onClick={clearResults}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Effacer
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Calcul par VMA</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Votre VMA (km/h)</label>
              <input
                type="number"
                value={inputs.vma}
                onChange={(e) => setInputs(prev => ({ ...prev, vma: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ex: 14"
              />
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>VMA</strong> : Vitesse Maximale Aérobie. Testez-la sur une piste avec un test progressif !
              </p>
            </div>
            
            <button
              onClick={calculateFromVMA}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Calculer les allures VMA
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Calculs récents</h2>
          
          {calculations.length > 0 ? (
            <div className="space-y-2">
              {calculations.map((calc) => (
                <div key={calc.id} className="border rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{calc.goalDistance}</div>
                      <div className="text-sm text-gray-500">{calc.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-indigo-600">{calc.goalTime}</div>
                      <div className="text-sm text-gray-600">{calc.pace}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">📊</div>
              <p>Aucun calcul récent</p>
            </div>
          )}
        </div>
      </div>

      {results && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Résultats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="text-center">
                  {result.distance && (
                    <div className="text-lg font-bold text-indigo-600 mb-2">{result.distance}</div>
                  )}
                  {result.name && (
                    <div className="text-sm font-semibold text-gray-700 mb-2">{result.name}</div>
                  )}
                  <div className="text-2xl font-bold text-gray-800 mb-1">{result.time || result.speed}</div>
                  {result.pace && (
                    <div className="text-sm text-gray-600">Allure: {result.pace}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tableau de référence</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Distance</th>
                <th className="text-left py-2 px-4">Débutant</th>
                <th className="text-left py-2 px-4">Intermédiaire</th>
                <th className="text-left py-2 px-4">Avancé</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-semibold">5km</td>
                <td className="py-2 px-4">35-40 min</td>
                <td className="py-2 px-4">25-30 min</td>
                <td className="py-2 px-4">18-22 min</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-semibold">10km</td>
                <td className="py-2 px-4">70-80 min</td>
                <td className="py-2 px-4">50-55 min</td>
                <td className="py-2 px-4">38-42 min</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-semibold">21.1km</td>
                <td className="py-2 px-4">2h30-3h</td>
                <td className="py-2 px-4">1h50-2h05</td>
                <td className="py-2 px-4">1h25-1h35</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-semibold">42.2km</td>
                <td className="py-2 px-4">5h-6h</td>
                <td className="py-2 px-4">3h45-4h15</td>
                <td className="py-2 px-4">3h-3h20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
