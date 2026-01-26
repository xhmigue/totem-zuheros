


import React from 'react';
import MenuCard from './MenuCard';
import { MenuSection } from '../types';

interface MenuGridProps {
  onSelect: (section: MenuSection) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ onSelect }) => {
  // Fix: Explicitly cast to MenuSection[] to resolve typing issues where Object.values returns unknown[]
  const sections = Object.values(MenuSection) as MenuSection[];

  return (
    <div className="max-w-7xl mx-auto pt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
      {sections.map((section) => (
        <MenuCard 
          key={section as string} 
          label={section} 
          onClick={() => onSelect(section)} 
        />
      ))}
    </div>
  );
};

export default MenuGrid;
