import { KeyboardEvent } from 'react';
import { IconType } from 'react-icons';

export interface ITask {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  created_by: string;
}
export interface IButton {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  clickHandler: () => void;
  styles?: string;
  Icon?: IconType;
}

export interface InputProps {
  label: string;
  id: string;
  type?: 'text' | 'password' | 'email';
  value: string;
  setValue: (value: string) => void;
  onPressEnter: (e: KeyboardEvent) => void;
  containerStyles?: string;
  required?: boolean;
}
