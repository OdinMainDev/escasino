export interface IDocument {
  fid: string;
  tag: string;
  file: File | null;
}

export type documentType = 'passport' | 'card' | 'something';
