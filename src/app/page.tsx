import Image from 'next/image'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Title Section Above Image */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Welcome to NoteCycle
          </h1>
        </div>

        {/* Hero Section with Image */}
        <div className="relative">
          {/* Hero Image */}
          <div className="relative h-[600px] w-full rounded-xl overflow-hidden">
            <Image
              src="/images/main.webp" // Your image path
              alt="NoteCycle Hero Image"
              fill
              priority
              className="object-cover"
            />
            {/* Overlay for better image contrast */}
            
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
