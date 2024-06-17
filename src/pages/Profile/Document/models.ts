export interface IDocument {
  fid: string;
  tag: string;
  file: File | null;
}

export type documentType = 'passport' | 'card' | 'something';

export interface IVerificationHistoryItem {
  status: number;
  reason: string;
  tag: string;
  created_at: number;
  updated_at: number;
}
