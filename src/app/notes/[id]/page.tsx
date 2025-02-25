"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Layout from '../../../components/layout'
import VoteButtons from '../../../components/VoteButtons'
import { supabase } from '../../../utils/supabase'

export default function NotePage() {
  const params = useParams()
  const noteId = params.id

  const [note, setNote] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNote() {
      const { data, error } = await supabase
        .from('notes')
        .select(`
          *,
          courses (code, name),
          professors (name)
        `)
        .eq('id', noteId)
        .single()

      if (error) {
        console.error('Error fetching note:', error)
      } else {
        setNote(data)
      }
      setLoading(false)
    }

    if (noteId) {
      fetchNote()
    }
  }, [noteId])

  if (loading) {
    return <Layout><div>Loading...</div></Layout>
  }

  if (!note) {
    return <Layout><div>Note not found</div></Layout>
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{note.title}</h1>
        <p className="text-gray-900 mb-4 font-medium">  {/* Changed from text-gray-600 to text-gray-900 */}
          Course: {note.courses.code} - {note.courses.name}
        </p>
        <p className="text-gray-900 mb-4 font-medium">  {/* Changed from text-gray-600 to text-gray-900 */}
          Professor: {note.professors.name}
        </p>
        <div className="mb-4">
          <VoteButtons noteId={note.id} initialUpvotes={note.upvotes} initialDownvotes={note.downvotes} />
        </div>
        <div className="border rounded-lg p-4">
          {/* Here you would typically render the note content or provide a download link */}
          <p className="text-gray-900">Note content or download link would go here</p>
        </div>
      </div>
    </Layout>
  )
}