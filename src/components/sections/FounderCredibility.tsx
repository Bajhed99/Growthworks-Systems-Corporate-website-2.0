'use client'

import React from 'react'

export default function FounderCredibility() {
  return (
    <section className="section bg-neutral-50">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Placeholder */}
          <div className="relative h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-neutral-400">
                <p className="text-lg font-medium">[Founder Photo]</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet the Founder</h2>
              <p className="text-xl text-neutral-600 mb-4">
                With 20+ years of experience in wealth management and financial innovation
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">Leadership Experience</h4>
                <p className="text-neutral-600">Led teams managing billions in assets across multiple markets</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Innovation Track Record</h4>
                <p className="text-neutral-600">Pioneer in implementing AI and automation in wealth management</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Industry Recognition</h4>
                <p className="text-neutral-600">Recognized as thought leader by major financial publications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
