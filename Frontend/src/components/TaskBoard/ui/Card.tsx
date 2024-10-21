
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  draggable,
  onDragStart 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow ${className}`}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`p-3 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`p-3 ${className}`}>
      {children}
    </div>
  );
};

export default Card;