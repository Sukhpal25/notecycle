"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/layout'
import { supabase } from '../../utils/supabase'
 
export default function UploadNote() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [courseId, setCourseId] = useState('')
  const [professorId, setProfessorId] = useState('')
  const [courses, setCourses] = useState<any[]>([])
  const [professors, setProfessors] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
      } else {
        setUser(user)
        const { data: coursesData } = await supabase.from('courses').select('*')
        const { data: professorsData } = await supabase.from('professors').select('*')
        setCourses(coursesData || [])
        setProfessors(professorsData || [])
      }
    }
    fetchData()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !courseId || !professorId || !title) {
      alert('Please fill all fields')
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('courseId', courseId)
    formData.append('professorId', professorId)
    formData.append('title', title)
    formData.append('userId', user.id)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()
    if (result.success) {
      alert('Note uploaded successfully')
      router.push('/')
    } else {
      alert('Error uploading note')
    }
    setLoading(false)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Upload Note</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
            <select
              id="course"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>{course.code} - {course.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="professor" className="block text-sm font-medium text-gray-700">Professor</label>
            <select
              id="professor"
              value={professorId}
              onChange={(e) => setProfessorId(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a professor</option>
              {professors.map((professor) => (
                <option key={professor.id} value={professor.id}>{professor.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">File</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Uploading...' : 'Upload Note'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}