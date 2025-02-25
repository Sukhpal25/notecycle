"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Layout from '../../../components/layout'
import { supabase } from '../../../utils/supabase'
import type { Course, Note } from '../../../types'

export default function CourseNotes() {
  const params = useParams()
  const courseId = params.id

  const [course, setCourse] = useState<Course | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCourseAndNotes() {
      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single()

      if (courseError) {
        console.error('Error fetching course:', courseError)
      } else {
        setCourse(courseData)
      }

      // Fetch notes for the course
      const { data: notesData, error: notesError } = await supabase
        .from('notes')
        .select(`
          *,
          professors (name)
        `)
        .eq('course_id', courseId)
        .order('created_at', { ascending: false })

      if (notesError) {
        console.error('Error fetching notes:', notesError)
      } else {
        setNotes(notesData || [])
      }

      setLoading(false)
    }

    if (courseId) {
      fetchCourseAndNotes()
    }
  }, [courseId])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {loading ? (
          <p>Loading course and notes...</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{course?.code}</h1>
            <h2 className="text-xl text-gray-700 mb-6">{course?.name}</h2>
            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="border rounded-lg p-4 bg-white">
                  <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
                  <p className="text-gray-700">Professor: {note.professors?.name}</p>
                  <p className="text-gray-700">Uploaded: {new Date(note.created_at).toLocaleDateString()}</p>
                  <div className="mt-2">
                    <Link href={`/notes/${note.id}`} className="text-blue-600 hover:underline">
                      View Note
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}