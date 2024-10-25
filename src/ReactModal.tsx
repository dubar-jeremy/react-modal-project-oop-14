import { PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './index.css';

export interface ModalOptions {
  shouldCloseOnOverlayClick?: boolean;
}

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  options?: ModalOptions;
}

const ReactModal = ({
  open,
  onClose,
  options = {},
  children,
}: PropsWithChildren<ModalProps>) => {
  const { shouldCloseOnOverlayClick = false } = options;

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        shouldCloseOnOverlayClick &&
        modalRef.current &&
        modalRef.current instanceof Node &&
        e.target instanceof Node &&
        !modalRef.current.contains(e.target)
      ) {
        if (onClose) {
          onClose();
        }
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, shouldCloseOnOverlayClick, onClose]);

  if (!open) return null;

  return createPortal(
    <>
      <div className="modal-overlay"></div>
      <div className="modal" ref={modalRef}>
        <div>{children}</div>
      </div>
    </>,
    document.body,
  );
};

export default ReactModal;
