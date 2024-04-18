export interface IAlert {
  title?: string;
  text?: string;
  close?: () => void;
  buttons?: IAlertButton[];
}

export interface IAlertButton {
  text: string;
  type: 'outlined' | 'contained';
  onClick: () => void;
}
