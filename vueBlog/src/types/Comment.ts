export interface Comment {
  id: number | null
  content: string
  time: string
  parentId: number | null
  responseId: number | null
}

export interface CommentPlus {
  id: number | null
  content: string
  time: string
  parentId: number | null
  responseId: number | null
  uid: number | null
  user: { name: string; avatar: string; homeLink: string }
}

