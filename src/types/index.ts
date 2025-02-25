export interface Course {
    id: number
    code: string
    name: string
    subject: string
  }
  
  export interface Professor {
    id: number
    name: string
  }
  
  export interface Note {
    id: number
    title: string
    file_path: string
    user_id: string
    course_id: number
    professor_id: number
    created_at: string
    upvotes: number
    downvotes: number
    courses?: Course
    professors?: Professor
  }
  
  export interface User {
    id: string
    email: string
    full_name?: string
  } 