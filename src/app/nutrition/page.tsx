"use client"

import { useState } from 'react'

export default function NutritionPage() {
  const [userProfile, setUserProfile] = useState({
    weight: 70,
    height: 175,
    age: 30,
    gender: 'homme',
    activityLevel: 'modéré',
    goal: 'maintien'
  })

  const [calorieNeeds, setCalorieNeeds] = useState<{
    basal: number;
    total: number;
    adjusted: number;
    goalText: string;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null)

  const [meals, setMeals] = useState<{
    meal: string;
    timing: string;
    calories: number;
    foods: string[];
    protein: number;
    carbs: number;
    fat: number;
  }[]>([])

  const [nutritionPlan, setNutritionPlan] = useState<{
    meal: string;
    timing: string;
    calories: number;
    foods: string[];
    protein: number;
    carbs: number;
    fat: number;
  }[]>([])

  const handleInputChange = (field: string, value: string | number) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateCalories = () => {
    const { weight, height, age, gender, activityLevel, goal } = userProfile
    
    // Calcul du métabolisme de base (MB) avec la formule de Mifflin-St Jeor
    let mb
    if (gender === 'homme') {
      mb = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      mb = 10 * weight + 6.25 * height - 5 * age - 161
    }
    
    const activityFactors = {
      'sédentaire': 1.2,
      'léger': 1.375,
      'modéré': 1.55,
      'intense': 1.725,
      'très intense': 1.9
    }
    
    const totalCalories = mb * activityFactors[userProfile.activityLevel as keyof typeof activityFactors]
    
    let adjustedCalories = totalCalories
    let goalText = ""
    
    if (goal === 'perte') {
      adjustedCalories = totalCalories - 500
      goalText = "pour la perte de poids"
    } else if (goal === 'prise') {
      adjustedCalories = totalCalories + 500
      goalText = "pour la prise de poids"
    } else {
      goalText = "pour le maintien du poids"
    }
    
    const protein = Math.round(adjustedCalories * 0.3 / 4) // 30% des calories
    const carbs = Math.round(adjustedCalories * 0.5 / 4) // 50% des calories
    const fat = Math.round(adjustedCalories * 0.2 / 9) // 20% des calories
    
    const result = {
      basal: Math.round(mb),
      total: Math.round(totalCalories),
      adjusted: Math.round(adjustedCalories),
      goalText,
      protein,
      carbs,
      fat
    }
    
    console.log("Résultat calcul:", result)
    setCalorieNeeds(result)
  }

  const generateNutritionPlan = () => {
    if (!calorieNeeds) return
    
    const plan = [
      {
        meal: "Petit-déjeuner",
        timing: "7h-8h",
        calories: Math.round(calorieNeeds.adjusted * 0.25),
        foods: ["Flocons d'avoine", "Fruits", "Yaourt grec"],
        protein: Math.round(calorieNeeds.protein * 0.25),
        carbs: Math.round(calorieNeeds.carbs * 0.25),
        fat: Math.round(calorieNeeds.fat * 0.25)
      },
      {
        meal: "Collation matin",
        timing: "10h-11h",
        calories: Math.round(calorieNeeds.adjusted * 0.1),
        foods: ["Fruit", "Amandes"],
        protein: Math.round(calorieNeeds.protein * 0.1),
        carbs: Math.round(calorieNeeds.carbs * 0.1),
        fat: Math.round(calorieNeeds.fat * 0.1)
      },
      {
        meal: "Déjeuner",
        timing: "12h-14h",
        calories: Math.round(calorieNeeds.adjusted * 0.35),
        foods: ["Protéine maigre", "Légumes", "Céréales complètes"],
        protein: Math.round(calorieNeeds.protein * 0.35),
        carbs: Math.round(calorieNeeds.carbs * 0.35),
        fat: Math.round(calorieNeeds.fat * 0.35)
      },
      {
        meal: "Collation après-midi",
        timing: "16h-17h",
        calories: Math.round(calorieNeeds.adjusted * 0.1),
        foods: ["Barre protéinée", "Fruit"],
        protein: Math.round(calorieNeeds.protein * 0.1),
        carbs: Math.round(calorieNeeds.carbs * 0.1),
        fat: Math.round(calorieNeeds.fat * 0.1)
      },
      {
        meal: "Dîner",
        timing: "19h-21h",
        calories: Math.round(calorieNeeds.adjusted * 0.2),
        foods: ["Légumineuses", "Légumes", "Huile d'olive"],
        protein: Math.round(calorieNeeds.protein * 0.2),
        carbs: Math.round(calorieNeeds.carbs * 0.2),
        fat: Math.round(calorieNeeds.fat * 0.2)
      }
    ]
    
    console.log("Plan généré:", plan)
    setNutritionPlan(plan)
  }

  const addCustomMeal = () => {
    const newMeal = {
      meal: `Repas ${meals.length + 1}`,
      timing: 'Personnalisé',
      calories: 0,
      foods: [],
      protein: 0,
      carbs: 0,
      fat: 0
    }
    setMeals(prev => [...prev, newMeal])
  }

  const updateMeal = (index: number, field: string, value: string | number) => {
    setMeals(prev => prev.map((meal, i) => 
      i === index ? { ...meal, [field]: value } : meal
    ))
  }

  const deleteMeal = (index: number) => {
    setMeals(prev => prev.filter((meal, i) => i !== index))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">🥗 Plan Nutritionnel</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne de gauche - Profil et calculs */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Votre Profil</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poids (kg)</label>
                <input
                  type="number"
                  value={userProfile.weight}
                  onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Taille (cm)</label>
                <input
                  type="number"
                  value={userProfile.height}
                  onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Âge</label>
                <input
                  type="number"
                  value={userProfile.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                <select
                  value={userProfile.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Niveau d'activité</label>
                <select
                  value={userProfile.activityLevel}
                  onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="sédentaire">Sédentaire</option>
                  <option value="léger">Léger</option>
                  <option value="modéré">Modéré</option>
                  <option value="intense">Intense</option>
                  <option value="très intense">Très intense</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Objectif</label>
                <select
                  value={userProfile.goal}
                  onChange={(e) => handleInputChange('goal', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="perte">Perte de poids</option>
                  <option value="maintien">Maintien du poids</option>
                  <option value="prise">Prise de poids</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={calculateCalories}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Calculer mes besoins caloriques
            </button>
          </div>
          
          {calorieNeeds && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vos Besoins Caloriques</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Métabolisme de base:</span>
                  <span className="font-semibold">{calorieNeeds.basal} kcal</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Besoin total:</span>
                  <span className="font-semibold">{calorieNeeds.total} kcal</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Besoin ajusté {calorieNeeds.goalText}:</span>
                  <span className="font-semibold text-indigo-600">{calorieNeeds.adjusted} kcal</span>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Protéines:</span>
                    <span className="font-semibold">{calorieNeeds.protein}g</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Glucides:</span>
                    <span className="font-semibold">{calorieNeeds.carbs}g</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lipides:</span>
                    <span className="font-semibold">{calorieNeeds.fat}g</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={generateNutritionPlan}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Générer un plan nutritionnel
              </button>
            </div>
          )}
        </div>
        
        {/* Colonne de droite - Plan nutritionnel et repas personnalisés */}
        <div className="space-y-6">
          {nutritionPlan.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Plan Nutritionnel</h2>
              </div>
              
              <div className="space-y-4">
                {nutritionPlan.map((meal, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">{meal.meal}</h3>
                      <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm font-medium">
                        {meal.timing}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mt-1">{meal.foods.join(", ")}</p>
                    
                    <div className="flex justify-between mt-2 text-sm">
                      <span>{meal.calories} kcal</span>
                      <div className="flex space-x-3">
                        <span>P: {meal.protein}g</span>
                        <span>G: {meal.carbs}g</span>
                        <span>L: {meal.fat}g</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Mes Repas</h2>
              <button
                onClick={addCustomMeal}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                + Ajouter
              </button>
            </div>
            
            {meals.length > 0 ? (
              <div className="space-y-3">
                {meals.map((meal, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <input
                        type="text"
                        value={meal.meal}
                        onChange={(e) => updateMeal(index, 'meal', e.target.value)}
                        className="font-semibold border-none outline-none bg-transparent"
                      />
                      <button
                        onClick={() => deleteMeal(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div>
                        <input
                          type="number"
                          value={meal.calories}
                          onChange={(e) => updateMeal(index, 'calories', parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-1 border rounded text-center"
                          placeholder="Cal"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          value={meal.protein}
                          onChange={(e) => updateMeal(index, 'protein', parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-1 border rounded text-center"
                          placeholder="Prot"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          value={meal.carbs}
                          onChange={(e) => updateMeal(index, 'carbs', parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-1 border rounded text-center"
                          placeholder="Gluc"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          value={meal.fat}
                          onChange={(e) => updateMeal(index, 'fat', parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-1 border rounded text-center"
                          placeholder="Lip"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">🍽️</div>
                <p>Aucun repas personnalisé</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
