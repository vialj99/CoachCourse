"use client"

import { useState } from 'react'

export default function NutritionPage() {
  const [userProfile, setUserProfile] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'homme',
    activityLevel: 'modéré',
    goal: 'maintenir'
  })
  
  const [nutritionPlan, setNutritionPlan] = useState<{
  meal: string;
  timing: string;
  calories: number;
  foods: string[];
  protein: number;
  carbs: number;
  fat: number;
}[]>([])
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

 const handleInputChange = (field: string, value: string | number) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateCalorieNeeds = () => {
    console.log("Calcul des besoins caloriques...")
    console.log("Profil:", userProfile)
    
    if (!userProfile.weight || !userProfile.height || !userProfile.age) {
      alert('Veuillez remplir tous les champs (poids, taille, âge)')
      return
    }
    
    const weight = parseFloat(userProfile.weight)
    const height = parseFloat(userProfile.height)
    const age = parseFloat(userProfile.age)
    
    let mb
    if (userProfile.gender === 'homme') {
      mb = (10 * weight) + (6.25 * height) - (5 * age) + 5
    } else {
      mb = (10 * weight) + (6.25 * height) - (5 * age) - 161
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
    if (userProfile.goal === 'perte') {
      adjustedCalories = totalCalories - 500
      goalText = " (déficit de 500 cal)"
    } else if (userProfile.goal === 'prise') {
      adjustedCalories = totalCalories + 500
      goalText = " (surplus de 500 cal)"
    }
    
    const result = {
      basal: Math.round(mb),
      total: Math.round(totalCalories),
      adjusted: Math.round(adjustedCalories),
      goalText: goalText,
      protein: Math.round(adjustedCalories * 0.2 / 4),
      carbs: Math.round(adjustedCalories * 0.55 / 4),
      fat: Math.round(adjustedCalories * 0.25 / 9)
    }
    
    console.log("Résultat calcul:", result)
    setCalorieNeeds(result)
  }

  const generateNutritionPlan = () => {
    console.log("Génération du plan nutritionnel...")
    console.log("Calorie needs:", calorieNeeds)
    
    if (!calorieNeeds) {
      alert('Veuillez d\'abord calculer vos besoins caloriques')
      return
    }
    
    const dailyCalories = calorieNeeds.adjusted
    const goal = userProfile.goal
    
    let mealDistribution
    if (goal === 'perte') {
      mealDistribution = {
        breakfast: dailyCalories * 0.30,
        snack1: dailyCalories * 0.05,
        lunch: dailyCalories * 0.35,
        snack2: dailyCalories * 0.10,
        dinner: dailyCalories * 0.20
      }
    } else if (goal === 'prise') {
      mealDistribution = {
        breakfast: dailyCalories * 0.25,
        snack1: dailyCalories * 0.15,
        lunch: dailyCalories * 0.30,
        snack2: dailyCalories * 0.15,
        dinner: dailyCalories * 0.15
      }
    } else {
      mealDistribution = {
        breakfast: dailyCalories * 0.25,
        snack1: dailyCalories * 0.10,
        lunch: dailyCalories * 0.30,
        snack2: dailyCalories * 0.15,
        dinner: dailyCalories * 0.20
      }
    }
    
    const plan = [
      {
        meal: 'Petit déjeuner',
        timing: '7h00',
        calories: Math.round(mealDistribution.breakfast),
        foods: ['Flocons d\'avoine (60g)', 'Banane (1)', 'Yaourt grec (150g)', 'Miel (1càs)'],
        protein: Math.round(mealDistribution.breakfast * 0.2 / 4),
        carbs: Math.round(mealDistribution.breakfast * 0.55 / 4),
        fat: Math.round(mealDistribution.breakfast * 0.25 / 9)
      },
      {
        meal: 'Collation matin',
        timing: '10h00',
        calories: Math.round(mealDistribution.snack1),
        foods: ['Pomme (1)', 'Amandes (20g)'],
        protein: Math.round(mealDistribution.snack1 * 0.15 / 4),
        carbs: Math.round(mealDistribution.snack1 * 0.70 / 4),
        fat: Math.round(mealDistribution.snack1 * 0.15 / 9)
      },
      {
        meal: 'Déjeuner',
        timing: '13h00',
        calories: Math.round(mealDistribution.lunch),
        foods: ['Poulet grillé (150g)', 'Riz complet (80g)', 'Légumes verts (200g)', 'Huile d\'olive (1càs)'],
        protein: Math.round(mealDistribution.lunch * 0.25 / 4),
        carbs: Math.round(mealDistribution.lunch * 0.50 / 4),
        fat: Math.round(mealDistribution.lunch * 0.25 / 9)
      },
      {
        meal: 'Collation après-entraînement',
        timing: '16h30',
        calories: Math.round(mealDistribution.snack2),
        foods: ['Smoothie protéiné', 'Barre de céréales'],
        protein: Math.round(mealDistribution.snack2 * 0.30 / 4),
        carbs: Math.round(mealDistribution.snack2 * 0.60 / 4),
        fat: Math.round(mealDistribution.snack2 * 0.10 / 9)
      },
      {
        meal: 'Dîner',
        timing: '19h30',
        calories: Math.round(mealDistribution.dinner),
        foods: ['Saumon (120g)', 'Patate douce (200g)', 'Brocoli (150g)', 'Avocat (1/2)'],
        protein: Math.round(mealDistribution.dinner * 0.30 / 4),
        carbs: Math.round(mealDistribution.dinner * 0.40 / 4),
        fat: Math.round(mealDistribution.dinner * 0.30 / 9)
      }
    ]
    
    console.log("Plan généré:", plan)
    setNutritionPlan(plan)
  }

  const addCustomMeal = () => {
    const newMeal = {
      id: Date.now(),
      name: 'Nouveau repas',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }
    setMeals(prev => [...prev, newMeal])
  }

  const updateMeal = (id, field, value) => {
    setMeals(prev => prev.map(meal => 
      meal.id === id ? { ...meal, [field]: value } : meal
    ))
  }

  const deleteMeal = (id) => {
    setMeals(prev => prev.filter(meal => meal.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">🥗 Plan Nutritionnel</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Votre Profil</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poids (kg)</label>
                <input
                  type="number"
                  value={userProfile.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Taille (cm)</label>
                <input
                  type="number"
                  value={userProfile.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="175"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Âge</label>
                <input
                  type="number"
                  value={userProfile.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                <select
                  value={userProfile.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Niveau d'activité</label>
                <select
                  value={userProfile.activityLevel}
                  onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="perte">Perte de poids</option>
                  <option value="maintenir">Maintenir</option>
                  <option value="prise">Prise de masse</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={calculateCalorieNeeds}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Calculer mes besoins caloriques
            </button>
          </div>

          {calorieNeeds && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vos Besoins Caloriques</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-sm text-blue-600">Métabolisme de base</div>
                  <div className="text-xl font-bold text-blue-800">{calorieNeeds.basal} cal</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-sm text-green-600">Total quotidien</div>
                  <div className="text-xl font-bold text-green-800">{calorieNeeds.total} cal</div>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                <div className="text-center mb-2">
                  <div className="text-sm text-indigo-600">Objectif quotidien{calorieNeeds.goalText}</div>
                  <div className="text-2xl font-bold text-indigo-800">{calorieNeeds.adjusted} cal</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-red-50 p-2 rounded">
                  <div className="text-xs text-red-600">Protéines</div>
                  <div className="font-bold text-red-800">{calorieNeeds.protein}g</div>
                </div>
                <div className="bg-yellow-50 p-2 rounded">
                  <div className="text-xs text-yellow-600">Glucides</div>
                  <div className="font-bold text-yellow-800">{calorieNeeds.carbs}g</div>
                </div>
                <div className="bg-purple-50 p-2 rounded">
                  <div className="text-xs text-purple-600">Lipides</div>
                  <div className="font-bold text-purple-800">{calorieNeeds.fat}g</div>
                </div>
              </div>
              
              <button
                onClick={generateNutritionPlan}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Générer mon plan nutritionnel
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {nutritionPlan.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Votre Plan Nutritionnel</h2>
              <div className="space-y-4">
                {nutritionPlan.map((meal, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{meal.meal}</h3>
                        <p className="text-sm text-gray-500">{meal.timing}</p>
                      </div>
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                        {meal.calories} cal
                      </span>
                    </div>
                    <div className="text-gray-700 mb-2">
                      <strong>Aliments :</strong> {meal.foods.join(', ')}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center bg-red-50 p-1 rounded">
                        <div className="text-xs text-red-600">Protéines</div>
                        <div className="font-semibold">{meal.protein}g</div>
                      </div>
                      <div className="text-center bg-yellow-50 p-1 rounded">
                        <div className="text-xs text-yellow-600">Glucides</div>
                        <div className="font-semibold">{meal.carbs}g</div>
                      </div>
                      <div className="text-center bg-purple-50 p-1 rounded">
                        <div className="text-xs text-purple-600">Lipides</div>
                        <div className="font-semibold">{meal.fat}g</div>
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
                {meals.map((meal) => (
                  <div key={meal.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <input
                        type="text"
                        value={meal.name}
                        onChange={(e) => updateMeal(meal.id, 'name', e.target.value)}
                        className="font-semibold border-none outline-none bg-transparent"
                      />
                      <button
                        onClick={() => deleteMeal(meal.id)}
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
                          onChange={(e) => updateMeal(meal.id, 'calories', parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-1 border rounded text-center"
                          placeholder="Cal"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          value={meal.protein}
                          onChange={(e) => updateMeal(meal.id, 'protein', parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-1 border rounded text-center"
                          placeholder="Prot"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          value={meal.carbs}
                          onChange={(e) => updateMeal(meal.id, 'carbs', parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-1 border rounded text-center"
                          placeholder="Gluc"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          value={meal.fat}
                          onChange={(e) => updateMeal(meal.id, 'fat', parseInt(e.target.value) || 0)}
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
