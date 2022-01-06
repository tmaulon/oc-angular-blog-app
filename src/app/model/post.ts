export interface Post {
  id: number;
  title: string;
  content: string;
  loveIts: number;
  created_at: Date;
}

export interface DraftPost {
  title: string;
  content: string;
}
