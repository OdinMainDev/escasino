/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const AffiliateProvider = ({ children }: IProps) => {
  const [searchParams] = useSearchParams();
  const aff_hash = searchParams.get('a_hash');
  if (aff_hash && aff_hash.length > 0) {
    localStorage.setItem('a_hash', aff_hash);
  }
  const aff_client_id = searchParams.get('a_cid');
  if (aff_client_id && aff_client_id.length > 0) {
    localStorage.setItem('a_cid', aff_client_id);
  }
  return children;
};

export default AffiliateProvider;
