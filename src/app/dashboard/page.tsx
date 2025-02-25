"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/layout'
import { supabase } from '../../utils/supabase'
import type { Note } from '../../types'

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([])
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Uploaded Notes</h1>
        {loading ? (
          <p>Loading...</p>
        ) : notes.length === 0 ? (
          <p className="text-gray-700">You have not uploaded any notes yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <div key={note.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
                  <p className="mt-1 text-gray-700">{note.courses?.code} - {note.courses?.name}</p>
                  <p className="mt-1 text-gray-700">Professor: {note.professors?.name}</p>
                  <p className="mt-1 text-gray-700">Uploaded: {new Date(note.created_at).toLocaleDateString()}</p>
                  <p className="mt-1 text-gray-700">Upvotes: {note.upvotes} | Downvotes: {note.downvotes}</p>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <button
                    onClick={() => router.push(`/notes/${note.id}`)}
                    className="text-blue-600 hover:text-blue-900"
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