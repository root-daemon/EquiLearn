'use client'

import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      <div className="container px-4 py-16 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Learning Journey</h1>
          <p className="text-lg text-gray-600">Transform How You Learn with Customizable Tools for Every Need</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="relative overflow-hidden border-2 border-gray-100">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold">Free Plan</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="text-3xl font-bold">$0</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {['Basic AI-powered study materials', 'Three visual modes', 'Limited content generation', 'Community support'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5" style={{ color: '#256D76' }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full text-white" 
                style={{ backgroundColor: '#256D76' }}
                variant="default"
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="relative overflow-hidden border-2" style={{ borderColor: '#256D76' }}>
            <div className="absolute top-0 right-0 px-3 py-1 text-sm text-white rounded-bl-lg" style={{ backgroundColor: '#256D76' }}>
              Recommended
            </div>
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold">Premium Plan</CardTitle>
              <CardDescription>For serious learners</CardDescription>
              <div className="text-3xl font-bold">$19.99<span className="text-lg font-normal text-gray-500">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {[
                  'Advanced AI-powered study materials',
                  'All five specialized visual modes',
                  'Unlimited content generation',
                  'Priority support',
                  'Custom flashcard creation',
                  'Video summaries',
                  'Progress tracking'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5" style={{ color: '#256D76' }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full text-white" 
                style={{ backgroundColor: '#256D76' }}
                variant="default"
              >
                Start Premium
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

