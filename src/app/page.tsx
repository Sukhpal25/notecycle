import Image from 'next/image'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Hero Section with Gradient Background */}
        <div className="relative">
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden bg-gradient-to-r from-[#002851] to-[#004b9b]">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff33_25%,transparent_25%,transparent_50%,#ffffff33_50%,#ffffff33_75%,transparent_75%,transparent)]" />
            </div>
          </div>

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Welcome to NoteCycle
            </h1>
            <p className="text-xl md:text-2xl text-center max-w-2xl">
              Share and access UC Davis lecture notes, empowering student success through collaborative learning.
            </p>
          </div>
        </div>

        {/* Content below hero */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Share Your Notes</h2>
            <p className="text-gray-700">Upload your lecture notes and earn rewards based on peer ratings.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Quality Content</h2>
            <p className="text-gray-700">Browse through verified notes from top-performing students.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Earn Rewards</h2>
            <p className="text-gray-700">Get paid for your contributions and help others succeed.</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}