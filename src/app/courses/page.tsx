"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../../components/layout'
import { supabase } from '../../utils/supabase'

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('subject', { ascending: true })

      if (error) {
        console.error('Error fetching courses:', error)
      } else {
        setCourses(data || [])
      }
      setLoading(false)
    }

    fetchCourses()
  }, [])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Courses</h1>
        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link href={`/courses/${course.id}`} key={course.id} className="block">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h2 className="text-xl font-semibold">{course.code}</h2>
                  <p className="text-gray-600">{course.name}</p>
                  <p className="text-sm text-gray-500 mt-2">Subject: {course.subject}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}