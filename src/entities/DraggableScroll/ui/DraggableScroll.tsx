import React, { useRef, useState, MouseEvent, ReactNode } from 'react';

interface DraggableScrollProps {
  children: ReactNode;
  className?: string;
}

const DraggableScroll: React.FC<DraggableScrollProps> = ({ children, className }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const scrollableElementRef = useRef<HTMLDivElement>(null);

  const startDragging = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollableElementRef.current?.offsetLeft ?? 0));
    setScrollLeft(scrollableElementRef.current?.scrollLeft ?? 0);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollableElementRef.current?.offsetLeft ?? 0);
    const walk = (x - startX) * 1;
    if (scrollableElementRef.current) {
      scrollableElementRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div
      ref={scrollableElementRef}
      onMouseDown={startDragging}
      onMouseLeave={stopDragging}
      onMouseUp={stopDragging}
      onMouseMove={onDrag}
      className={className}
    >
      {children}
    </div>
  );
};

export default DraggableScroll;
