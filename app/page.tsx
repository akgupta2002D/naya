"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Survey from "@/components/survey"

export default function HomePage() {
  const [videoEnded, setVideoEnded] = useState(false)
  const [showReadyPage, setShowReadyPage] = useState(false)
  const [showWebsite, setShowWebsite] = useState(false)
  const [showSurvey, setShowSurvey] = useState(false)

  useEffect(() => {
    // Simulate video ending after 8 seconds
    const timer = setTimeout(() => {
      setVideoEnded(true)
      setTimeout(() => setShowReadyPage(true), 500)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  const handleSkipVideo = () => {
    setVideoEnded(true)
    setTimeout(() => setShowReadyPage(true), 500)
  }

  const handleReadyClick = () => {
    setShowReadyPage(false)
    setTimeout(() => setShowWebsite(true), 500)
  }

  // Video Screen
  if (!videoEnded) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl max-h-3xl">
          <Image
            src="/placeholder.svg?height=800&width=1200"
            alt="NAYA Brand Video Placeholder"
            fill
            className="object-cover rounded-lg shadow-2xl"
            priority
          />
          <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-medium mb-4">NAYA Brand Story</p>
              <Button
                variant="outline"
                onClick={handleSkipVideo}
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                Skip Video
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Ready Page
  if (showReadyPage && !showWebsite) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-emerald-300 mx-auto mb-6 animate-pulse" />
            <div className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              Are you ready to
              <div className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent animate-pulse">
                reinvent
              </div>
              your health?
            </div>
          </div>

          <div className="mb-12">
            <p className="text-xl md:text-2xl text-emerald-100 font-light max-w-2xl mx-auto leading-relaxed">
              Transform your wellness journey with functional tonics designed for ambitious minds
            </p>
          </div>

          <Button
            onClick={handleReadyClick}
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Yes, I'm Ready
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>

          <div className="mt-8 text-emerald-200/60 text-sm">Click to begin your transformation</div>
        </div>
      </div>
    )
  }

  // Main Website
  if (!showWebsite) return null

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${showWebsite ? "opacity-100" : "opacity-0"}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-emerald-100 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-emerald-800">NAYA</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#mission" className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors">
                Our Mission
              </a>
              <a href="#products" className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors">
                Products
              </a>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Join the Waitlist</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Simplified */}
      <section className="pt-20 min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Text Content - Simplified */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                  Wellness Made Simple
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-emerald-900 leading-tight">
                  Daily Wellness
                  <span className="text-emerald-600"> Reinvented</span>
                </h1>
                <p className="text-xl text-emerald-700 leading-relaxed">
                  Functional tonics that solve real health challenges. One sip, endless possibilities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
                  Join the Waitlist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-3"
                >
                  Learn More
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowSurvey(true)}
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-3"
                >
                  Take Our Survey
                </Button>
              </div>

              <div className="pt-6">
                <p className="text-emerald-600 font-medium italic">"Your partner in growth, one sip at a time."</p>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="NAYA Wellness Tonics"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                  priority
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-cyan-200 to-emerald-200 rounded-full opacity-20 blur-3xl"></div>

              {/* Floating Cards */}
              <div className="absolute -left-8 top-1/4 bg-white rounded-xl p-4 shadow-lg border border-emerald-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium text-emerald-800">100% Organic</span>
                </div>
              </div>

              <div className="absolute -right-8 bottom-1/4 bg-white rounded-xl p-4 shadow-lg border border-emerald-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                  <span className="text-sm font-medium text-emerald-800">60ml Bottles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same... */}
      {/* Mission Section */}
      <section id="mission" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-8">Our Mission</h2>
            <p className="text-lg text-emerald-700 leading-relaxed mb-8">
              We believe that wellness should be accessible, not complicated. Our carefully crafted tonics are designed
              to address the real health challenges faced by ambitious individuals living busy lives.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full"></div>
                </div>
                <h3 className="font-semibold text-emerald-800 mb-2">Functional</h3>
                <p className="text-emerald-600 text-sm">Targeted solutions for specific health needs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full"></div>
                </div>
                <h3 className="font-semibold text-emerald-800 mb-2">Organic</h3>
                <p className="text-emerald-600 text-sm">Pure, natural ingredients you can trust</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full"></div>
                </div>
                <h3 className="font-semibold text-emerald-800 mb-2">Accessible</h3>
                <p className="text-emerald-600 text-sm">Simple wellness that fits your lifestyle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section id="products" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">Our Wellness Collection</h2>
            <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
              Five carefully crafted tonics, each designed to address specific wellness needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Ease Up", purpose: "Bloating Relief", color: "from-green-400 to-emerald-500" },
              { name: "Golden Hour", purpose: "Anti-Inflammatory", color: "from-orange-400 to-amber-500" },
              { name: "Power Plant", purpose: "Iron Boost", color: "from-red-400 to-rose-500" },
              { name: "Reset Ritual", purpose: "Gut Cleanse", color: "from-blue-400 to-cyan-500" },
              { name: "Glow Up", purpose: "Healthy Skin", color: "from-pink-400 to-rose-500" },
            ].map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow"
              >
                <div className={`w-full h-32 bg-gradient-to-r ${product.color} rounded-xl mb-4`}></div>
                <h3 className="text-xl font-bold text-emerald-900 mb-2">{product.name}</h3>
                <p className="text-emerald-600 font-medium mb-4">{product.purpose}</p>
                <Button variant="outline" className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Wellness Journey?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join our waitlist to be the first to experience NAYA's functional wellness tonics.
          </p>
          <Button size="lg" className="bg-white text-emerald-800 hover:bg-emerald-50 px-8 py-3">
            Join the Waitlist
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      {/* Survey Modal */}
      {showSurvey && <Survey onClose={() => setShowSurvey(false)} />}
    </div>
  )
}
