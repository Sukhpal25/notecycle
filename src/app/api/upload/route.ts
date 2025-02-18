import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '../../../utils/supabase'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  const courseId = formData.get('courseId') as string
  const professorId = formData.get('professorId') as string
  const title = formData.get('title') as string
  const userId = formData.get('userId') as string

  if (!file || !courseId || !professorId || !title || !userId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${uuidv4()}.${fileExt}`
  const { data, error } = await supabase.storage
    .from('notes')
    .upload(fileName, file)

  if (error) {
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
  }

  const { data: note, error: noteError } = await supabase
    .from('notes')
    .insert({
      title,
      file_path: data.path,
      user_id: userId,
      course_id: courseId,
      professor_id: professorId
    })
    .select()

  if (noteError) {
    return NextResponse.json({ error: 'Error creating note entry' }, { status: 500 })
  }

  return NextResponse.json({ success: true, note })
}