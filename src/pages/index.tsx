import React from 'react'
import Hero from '@/components/sections/Hero'
import ProblemRecognition from '@/components/sections/ProblemRecognition'
import CoreSolutions from '@/components/sections/CoreSolutions'
import HowItWorks from '@/components/sections/HowItWorks'
import BusinessOutcomes from '@/components/sections/BusinessOutcomes'
import WhoBenefits from '@/components/sections/WhoBenefits'
import CredibilityBridge from '@/components/sections/CredibilityBridge'
import FounderCredibility from '@/components/sections/FounderCredibility'
import AIVisibility from '@/components/sections/AIVisibility'
import RevenueDiagnostic from '@/components/sections/RevenueDiagnostic'

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Problem Recognition */}
      <ProblemRecognition />

      {/* 3. Core Solution Modules */}
      <CoreSolutions />

      {/* 4. How GWS Works */}
      <HowItWorks />

      {/* 5. Four Business Outcomes */}
      <BusinessOutcomes />

      {/* 6. Who GWS Serves */}
      <WhoBenefits />

      {/* 7. Credibility Bridge */}
      <CredibilityBridge />

      {/* 8. Founder Credibility */}
      <FounderCredibility />

      {/* 9. AI Visibility Differentiator */}
      <AIVisibility />

      {/* 10. Revenue Diagnostic CTA */}
      <RevenueDiagnostic />
    </div>
  )
}
