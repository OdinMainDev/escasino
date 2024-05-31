import { ReactNode } from 'react';

export interface IAlert {
  title?: string;
  text?: ReactNode | string;
  close?: () => void;
  buttons?: IAlertButton[];
}

export interface IAlertButton {
  text: string;
  type: 'outlined' | 'contained';
  onClick: () => void;
}
