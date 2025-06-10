import { createContext, use, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import useOutsideClick from '../hooks/useOutsideClick';

function StyledWindow({ children, ref }) {
  return (
    <div
      ref={ref}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-grey-0 rounded-lg shadow-lg px-10 py-8 transition-all duration-500"
    >
      {children}
    </div>
  );
}

function Overlay({ children }) {
  return (
    <div className="fixed inset-0 w-full h-screen bg-(--backdrop-color) backdrop-blur-xs z-10 transition-all duration-500">
      {children}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button
      className="absolute top-3 right-5 bg-none border-none p-1 rounded-sm translate-x-2 transition-all duration-200 hover:bg-(--color-grey-100) [&_svg]:w-6 [&_svg]:h-6 [&_svg]:text-grey-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = use(ModalContext);

  // Render Props Method
  return typeof children === 'function'
    ? children(() => open(opensWindowName))
    : children;
}

// 顯示的視窗
function Window({ children, name }) {
  const { openName, close } = use(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledWindow ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{typeof children === 'function' ? children(close) : children}</div>
      </StyledWindow>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
