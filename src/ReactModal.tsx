import './index.css';
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { ReactModalProps } from './ReactModal.props';

const ReactModal = ({
  open,
  onClose,
  options = {},
  style = {},
  children,
}: PropsWithChildren<ReactModalProps>) => {
  const { shouldCloseOnOverlayClick = false, darkMode = false } = options;

  const {
    customCloseButton = undefined,
    closeButtonSize = 'm',
    backgroundColor = darkMode ? '#333' : 'white',
    color = darkMode ? 'white' : 'black',
    width = '50%',
    height = 'auto',
    borderRounded = true,
  } = style;

  const modalRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = (): NodeListOf<HTMLElement> => {
    return (modalRef.current as HTMLElement)?.querySelectorAll(
      'button, [href], [tabindex]:not([tabindex="-1"])',
    ) as NodeListOf<HTMLElement>;
  };

  const setFocusableRefs = (focusableElements: NodeListOf<HTMLElement>) => {
    if (focusableElements?.length) {
      firstFocusableRef.current = focusableElements[0];
      lastFocusableRef.current =
        focusableElements[focusableElements.length - 1];
    }
  };

  const isClickOutside = (e: MouseEvent): boolean => {
    return (
      modalRef.current !== null &&
      modalRef.current instanceof Node &&
      e.target instanceof Node &&
      !modalRef.current.contains(e.target)
    );
  };

  const storePreviousActiveElement = () => {
    previousActiveElementRef.current = document.activeElement as HTMLElement;
  };

  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
      previousActiveElementRef.current?.focus();
    }
  }, [onClose]);

  const handleTab = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        handleFocusTrap(e);
      } else if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal],
  );

  const handleFocusTrap = (e: KeyboardEvent) => {
    const activeElement = document.activeElement as HTMLElement | null;
    e.preventDefault();

    if (activeElement === firstFocusableRef.current) {
      lastFocusableRef.current?.focus();
    }

    if (activeElement === lastFocusableRef.current) {
      firstFocusableRef.current?.focus();
    }
  };

  useEffect(() => {
    const focusableElements = getFocusableElements();
    setFocusableRefs(focusableElements);

    const handleClickOutside = (e: MouseEvent) => {
      if (shouldCloseOnOverlayClick && isClickOutside(e)) {
        closeModal();
      }
    };

    if (open) {
      storePreviousActiveElement();
      document.addEventListener('mousedown', handleClickOutside);
      firstFocusableRef.current?.focus();
      document.addEventListener('keydown', handleTab);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleTab);
      };
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, shouldCloseOnOverlayClick, closeModal, handleTab]);

  if (!open) return null;

  return createPortal(
    <>
      <div className="react-modal-oop-overlay"></div>
      <div
        role="dialog"
        aria-modal="true"
        className={`react-modal-oop-modal ${borderRounded && 'react-modal-oop-rounded'}`}
        ref={modalRef}
        style={{
          backgroundColor,
          color,
          width,
          height,
        }}
      >
        {customCloseButton ? (
          <div className="custom-button-container" onClick={closeModal}>
            {customCloseButton}
          </div>
        ) : (
          <button
            type="button"
            className={`react-modal-oop-close-btn react-modal-oop-close-btn-size-${closeButtonSize} ${darkMode ? 'react-modal-oop-close-btn-dark' : 'react-modal-oop-close-btn-light'}`}
            onClick={closeModal}
          >
            &times;
          </button>
        )}
        <div>{children}</div>
      </div>
    </>,
    document.body,
  );
};

export default ReactModal;
