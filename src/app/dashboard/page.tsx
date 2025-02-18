"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/layout'
import { supabase } from '../../utils/supabase'

export default function Dashboard() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchUserNotes() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from('notes')
          .select(`
            *,
            courses (code, name),
            professors (name)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching notes:', error)
        } else {
          setNotes(data || [])
        }
      } else {
        router.push('/auth')
      }
      setLoading(false)
    }

    fetchUserNotes()
  }, [router])

  if (loading) {
    return <Layout><div>Loading...</div></Layout>
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Uploaded Notes</h1>
        {notes.length === 0 ? (
          <p>You haven't uploaded any notes yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <div key={note.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{note.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{note.courses.code} - {note.courses.name}</p>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Professor: {note.professors.name}</p>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Uploaded: {new Date(note.created_at).toLocaleDateString()}</p>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Upvotes: {note.upvotes} | Downvotes: {note.downvotes}</p>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <button
                    onClick={() => router.push(`/notes/${note.id}`)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Note
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}