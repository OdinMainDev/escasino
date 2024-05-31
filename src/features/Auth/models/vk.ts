export interface ISocialsVkRequest {
  fid: string;
  terms: boolean;
  return_url: string;
}

export interface ISocialsVkProcessRequest {
  fid: string;
  code: string;
  a_hash: string | null;
  a_cid: string | null;
  return_url: string;
}
