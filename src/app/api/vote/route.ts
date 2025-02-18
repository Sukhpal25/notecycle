import { NextResponse } from 'next/server'
import { supabase } from '../../../utils/supabase'

export async function POST(request: Request) {
  const { noteId, userId, voteType } = await request.json()

  if (!noteId || !userId || voteType === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Check if the user has already voted on this note
  const { data: existingVote, error: existingVoteError } = await supabase
    .from('votes')
    .select('*')
    .eq('user_id', userId)
    .eq('note_id', noteId)
    .single()

  if (existingVoteError && existingVoteError.code !== 'PGRST116') {
    return NextResponse.json({ error: 'Error checking existing vote' }, { status: 500 })
  }

  let voteResult

  if (existingVote) {
    // Update existing vote
    const { data, error } = await supabase
      .from('votes')
      .update({ vote_type: voteType })
      .eq('id', existingVote.id)
    
    if (error) {
      return NextResponse.json({ error: 'Error updating vote' }, { status: 500 })
    }
    voteResult = data
  } else {
    // Insert new vote
    const { data, error } = await supabase
      .from('votes')
      .insert({ user_id: userId, note_id: noteId, vote_type: voteType })
    
    if (error) {
      return NextResponse.json({ error: 'Error inserting vote' }, { status: 500 })
    }
    voteResult = data
  }

  // Update note's upvotes and downvotes count
  const { data: updatedNote, error: updateError } = await supabase
    .rpc('update_note_votes', { note_id: noteId })

  if (updateError) {
    return NextResponse.json({ error: 'Error updating note votes' }, { status: 500 })
  }

  return NextResponse.json({ success: true, vote: voteResult, updatedNote })
}