import { useCallback, useEffect, useState } from 'react';

/**credit to: https://phuoc.ng/collection/react-drag-drop/scroll-by-dragging/ */
export const useHorizontalScroll = () => {
  const [node, setNode] = useState<HTMLElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollRef = useCallback((nodeEle: any) => {
    setNode(nodeEle);
  }, []);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!node) {
        return;
      }
      const startPos = {
        left: node.scrollLeft,
        top: node.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };

      const handleMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        node.scrollTop = startPos.top - dy;
        node.scrollLeft = startPos.left - dx;
        updateCursor(node);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        resetCursor(node);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [node]
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!node) {
        return;
      }
      const touch = e.touches[0];
      const startPos = {
        left: node.scrollLeft,
        top: node.scrollTop,
        x: touch.clientX,
        y: touch.clientY,
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const dx = touch.clientX - startPos.x;
        const dy = touch.clientY - startPos.y;
        node.scrollTop = startPos.top - dy;
        node.scrollLeft = startPos.left - dx;
        updateCursor(node);
      };

      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        resetCursor(node);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    },
    [node]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateCursor = (ele: any) => {
    ele.style.cursor = 'grabbing';
    ele.style.userSelect = 'none';
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resetCursor = (ele: any) => {
    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');
  };

  useEffect(() => {
    if (!node) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      node.scrollTo({
        left: node.scrollLeft + e.deltaY,
        behavior: 'smooth',
      });
    };

    node.addEventListener('wheel', onWheel);

    node.addEventListener('mousedown', handleMouseDown);
    node.addEventListener('touchstart', handleTouchStart);
    return () => {
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('wheel', onWheel);
    };
  }, [handleMouseDown, handleTouchStart, node]);

  return [scrollRef];
};
