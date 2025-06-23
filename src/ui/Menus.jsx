import { createContext, use, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import useOutsideClick from '../hooks/useOutsideClick';
import useResizeToggle from '../hooks/useResizeToggle';

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = use(MenusContext);

  // 判斷選單是否開啟，渲染時 useEffect 只會執行一次
  const isOpen = openId === id;

  const buttonRef = useResizeToggle(
    (refCurrent) => {
      const rect = refCurrent.getBoundingClientRect();
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });
    },
    100,
    isOpen
  );

  // 打開選單 (複製、新增、刪除)
  function handleClick(e) {
    // 停止冒泡事件
    e.stopPropagation();

    // 取得點擊元素的位置
    // const buttonRect = buttonRef.current.getBoundingClientRect();
    const buttonRect = e.target.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - buttonRect.width - buttonRect.x,
      y: buttonRect.y + buttonRect.height + 8,
    });

    // 沒有一個菜單是打開的 或 已經有一個打開的菜單，但它與被點擊的菜單不同
    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <button
      ref={buttonRef} // 綁定 ref
      onClick={handleClick}
      className="p-1 bg-none border-none rounded-sm translate-x-2 transition-all duration-200 hover:bg-grey-100 [&_svg]:w-6 [&_svg]:h-6 [&_svg]:text-grey-700"
    >
      <HiEllipsisVertical />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = use(MenusContext);
  // 點擊視窗外，關閉 Menus
  // false -> 在冒泡階段監聽 close 事件
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={ref}
      style={{ top: position.y, right: position.x }}
      className="fixed bg-grey-0 shadow-md rounded-lg p-1 flex flex-col"
    >
      {children}
    </ul>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = use(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="w-full text-left bg-none border-none rounded-sm px-3 py-2 text-sm transition-all duration-200 flex items-center gap-2 hover:bg-grey-100 [&_svg]:w-4 [&_svg]:h-4 text-grey-400 hover:text-grey-700 [&_svg]:transition-all [&_svg]:duration-300"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

// Menus 只是 Provider；Menu 是放置菜單的容器
Menus.Menu = Menu;
// Toggle 是 打開菜單的按鈕
Menus.Toggle = Toggle;
// List 透過 children 傳入 Button 作為菜單的選項
Menus.List = List;
// Button 透過 children 傳入 菜單內的選項
Menus.Button = Button;

export default Menus;
