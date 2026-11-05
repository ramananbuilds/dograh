export interface KnowledgeDoc {
  id: string;
  name: string;
  file_type: 'pdf' | 'docx' | 'txt' | 'url';
  size_kb: number;
  total_chunks: number;
  status: 'indexed' | 'indexing' | 'failed';
  created_at: string;
}

