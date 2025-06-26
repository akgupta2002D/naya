"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ArrowLeft, ArrowRight, Sparkles } from "lucide-react"

interface SurveyProps {
  onClose: () => void
}

interface Answer {
  questionId: string
  value: string | boolean
}

interface Product {
  name: string
  purpose: string
  description: string
  color: string
  statement: string
}

const products: Record<string, Product> = {
  "Ease Up": {
    name: "Ease Up",
    purpose: "Bloating Relief",
    description:
      "Your fast track to feeling light and comfortable. This refreshing tonic combines soothing peppermint and chamomile with digestive ginger and fennel.",
    color: "from-green-400 to-emerald-500",
    statement: "Your fast track to feeling light and comfortable.",
  },
  "Golden Hour": {
    name: "Golden Hour",
    purpose: "Anti-Inflammatory",
    description:
      "Soothe, recover, and reclaim your radiance. This vibrant tonic harnesses turmeric and ginger to combat inflammation at its source.",
    color: "from-orange-400 to-amber-500",
    statement: "Soothe, recover, and reclaim your radiance.",
  },
  "Power Plant": {
    name: "Power Plant",
    purpose: "Iron Boost",
    description:
      "Your daily defense against fatigue. Plant-based iron boost with Vitamin C for maximum absorption to energize your system.",
    color: "from-red-400 to-rose-500",
    statement: "Your daily defense against fatigue.",
  },
  "Reset Ritual": {
    name: "Reset Ritual",
    purpose: "Gut Cleanse",
    description:
      "Your daily reset for a clearer, cleaner you. A gentle cleanse with apple cider vinegar and prebiotic fiber for gut health.",
    color: "from-blue-400 to-cyan-500",
    statement: "Your daily reset for a clearer, cleaner you.",
  },
  "Glow Up": {
    name: "Glow Up",
    purpose: "Healthy Skin",
    description:
      "Drink your way to beautiful, glowing skin. Packed with skin-loving vitamins and antioxidants for radiant complexion.",
    color: "from-pink-400 to-rose-500",
    statement: "Drink your way to beautiful, glowing skin.",
  },
}

const questions = [
  {
    id: "primary_concern",
    question: "What's your primary wellness goal right now?",
    type: "single_choice",
    options: [
      { label: "Reduce bloating or digestive discomfort", value: "bloating" },
      { label: "Soothe inflammation or aches", value: "inflammation" },
      { label: "Boost energy and reduce fatigue", value: "iron_deficiency" },
      { label: "Cleanse or reset your gut", value: "gut_cleanse" },
      { label: "Improve skin clarity and glow", value: "healthy_skin" },
    ],
  },
  {
    id: "energy_level",
    question: "How are your energy levels lately?",
    type: "single_choice",
    options: [
      { label: "I feel tired or drained often", value: "low_energy" },
      { label: "I feel okay but could use a boost", value: "moderate_energy" },
      { label: "I'm energized and thriving", value: "high_energy" },
    ],
  },
  {
    id: "digestion_check",
    question: "Do you frequently experience digestive issues like gas or bloating?",
    type: "yes_no",
  },
  {
    id: "skin_health",
    question: "Would you like to support your skin health from the inside out?",
    type: "yes_no",
  },
  {
    id: "daily_routine",
    question: "How do you prefer to take your wellness products?",
    type: "single_choice",
    options: [
      { label: "Quick, drinkable shots I can grab and go", value: "convenient" },
      { label: "Mixed into smoothies or other drinks", value: "blended" },
      { label: "Doesn't matter as long as it works", value: "flexible" },
    ],
  },
]

export default function Survey({ onClose }: SurveyProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [recommendation, setRecommendation] = useState<string | null>(null)

  const handleAnswer = (value: string | boolean) => {
    const newAnswers = [...answers]
    const existingIndex = newAnswers.findIndex((a) => a.questionId === questions[currentQuestion].id)

    if (existingIndex >= 0) {
      newAnswers[existingIndex].value = value
    } else {
      newAnswers.push({ questionId: questions[currentQuestion].id, value })
    }

    setAnswers(newAnswers)
  }

  const getRecommendation = (answers: Answer[]): string => {
    const answerMap = answers.reduce(
      (acc, answer) => {
        acc[answer.questionId] = answer.value
        return acc
      },
      {} as Record<string, string | boolean>,
    )

    // Primary concern mapping
    const primaryConcernMap: Record<string, string> = {
      bloating: "Ease Up",
      inflammation: "Golden Hour",
      iron_deficiency: "Power Plant",
      gut_cleanse: "Reset Ritual",
      healthy_skin: "Glow Up",
    }

    // Check primary concern first
    if (answerMap.primary_concern && typeof answerMap.primary_concern === "string") {
      const primaryRecommendation = primaryConcernMap[answerMap.primary_concern]
      if (primaryRecommendation) return primaryRecommendation
    }

    // Fallback rules
    if (answerMap.energy_level === "low_energy" && answerMap.primary_concern !== "iron_deficiency") {
      return "Power Plant"
    }

    if (answerMap.digestion_check === true && answerMap.primary_concern !== "bloating") {
      return "Ease Up"
    }

    if (answerMap.skin_health === true && answerMap.primary_concern !== "healthy_skin") {
      return "Glow Up"
    }

    // Default fallback
    return "Ease Up"
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate recommendation
      const rec = getRecommendation(answers)
      setRecommendation(rec)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getCurrentAnswer = () => {
    return answers.find((a) => a.questionId === questions[currentQuestion].id)?.value
  }

  const canProceed = () => {
    return getCurrentAnswer() !== undefined
  }

  if (recommendation) {
    const product = products[recommendation]
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-emerald-600" />
                <h2 className="text-2xl font-bold text-emerald-900">Your Perfect Match!</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="text-center space-y-6">
              <div
                className={`w-full h-48 bg-gradient-to-r ${product.color} rounded-2xl mb-6 flex items-center justify-center`}
              >
                <div className="text-white text-4xl font-bold">{product.name}</div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-emerald-900 mb-2">{product.name}</h3>
                <p className="text-xl text-emerald-600 font-semibold mb-4">{product.purpose}</p>
                <p className="text-emerald-700 mb-6 leading-relaxed">{product.description}</p>
                <p className="text-emerald-800 font-medium italic text-lg">"{product.statement}"</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1">
                  Join Waitlist for {product.name}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setRecommendation(null)
                    setCurrentQuestion(0)
                    setAnswers([])
                  }}
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  Retake Survey
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white">
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-2">Find Your Perfect Naya Tonic</h2>
              <p className="text-emerald-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-emerald-100 rounded-full h-2 mb-8">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-emerald-900">{question.question}</h3>

            <div className="space-y-3">
              {question.type === "single_choice" && question.options && (
                <>
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        getCurrentAnswer() === option.value
                          ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                          : "border-emerald-200 hover:border-emerald-300 text-emerald-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </>
              )}

              {question.type === "yes_no" && (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAnswer(true)}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      getCurrentAnswer() === true
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                        : "border-emerald-200 hover:border-emerald-300 text-emerald-700"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      getCurrentAnswer() === false
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                        : "border-emerald-200 hover:border-emerald-300 text-emerald-700"
                    }`}
                  >
                    No
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {currentQuestion === questions.length - 1 ? "Get My Recommendation" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
