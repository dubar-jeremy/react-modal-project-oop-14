import { ReactNode } from 'react';

export interface ReactModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string | ReactNode;
  content?: string | ReactNode;
  options?: {
    shouldCloseOnOverlayClick?: boolean;
    darkMode?: boolean;
  };
  style?: {
    width?: string;
    height?: string;
    borderRounded?: boolean;
    customCloseButton?: ReactNode;
    closeButtonSize?: 's' | 'm' | 'l' | 'xl';
    color?: string;
    backgroundColor?: string;
  };
}
