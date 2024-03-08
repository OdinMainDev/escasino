import { ReactElement } from 'react';

export interface IModal {
  close?: () => void;
  children?: ReactElement;
  reRendering?: boolean;
}
