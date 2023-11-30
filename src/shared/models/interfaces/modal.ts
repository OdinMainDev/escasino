import { ReactElement } from 'react';

export interface IModal {
  isOpen?: boolean;
  close?: () => void;
  children?: ReactElement;
}
