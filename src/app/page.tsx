import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to NoteCycle</h1>
        <p className="mt-2 text-gray-600">Share and access UC Davis lecture notes.</p>
      </div>
    </Layout>
  )
}