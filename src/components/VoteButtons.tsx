"use client"

import { useState } from 'react'
import { supabase } from '../utils/supabase'

type VoteButtonsProps = {
  noteId: number
  initialUpvotes: number
  initialDownvotes: number
}

export default function VoteButtons({ noteId, initialUpvotes, initialDownvotes }: VoteButtonsProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [downvotes, setDownvotes] = useState(initialDownvotes)
  const [userVote, setUserVote] = useState<boolean | null>(null)

  const handleVote = async (voteType: boolean) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('You must be logged in to vote')
      return
    }

    const response = await fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        noteId,
        userId: user.id,
        voteType,
      }),
    })

    const result = await response.json()
    if (result.success) {
      setUpvotes(result.updatedNote.upvotes)
      setDownvotes(result.updatedNote.downvotes)
      setUserVote(voteType)
    } else {
      alert('Error voting')
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => handleVote(true)}
        className={`px-2 py-1 rounded ${userVote === true ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
      >
        👍 {upvotes}
      </button>
      <button
        onClick={() => handleVote(false)}
        className={`px-2 py-1 rounded ${userVote === false ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
      >
        👎 {downvotes}
      </button>
    </div>
  )
}