import { useEffect, useRef } from 'react';

function useResizeToggle(handler, delay, isOpen) {
  const ref = useRef(null);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    // 中止控制器
    const controller = new AbortController();
    const signal = controller.signal;

    // 如果選單關閉，清除之前建立的事件，並且不會建立事件聆聽
    if (!isOpen) {
      clearTimeout(timeoutIdRef.current); // 清除 timeout 防抖
      controller.abort(); // 清除事件
      return;
    }

    // Debounce 防抖 延遲 handler
    function handleResize() {
      if (!ref.current) return; // 確保 ref 仍然有效
      clearTimeout(timeoutIdRef.current); // 確保清除舊的 timeout
      timeoutIdRef.current = setTimeout(() => handler(ref.current), delay);
    }

    window.addEventListener('resize', handleResize, { signal });
    window.addEventListener('scroll', handleResize, {
      capture: true,
      signal,
    });

    return () => {
      clearTimeout(timeoutIdRef.current); // 在 unmount 時清除 timeout
      controller.abort();
    };
  }, [handler, delay, isOpen]);

  return ref;
}

export default useResizeToggle;
