
import React from 'react';
import MenuCard from './MenuCard';
import { MenuSection } from '../types';

interface MenuGridProps {
  onSelect: (section: MenuSection) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ onSelect }) => {
  const sections = Object.values(MenuSection);

  return (
    <div className="max-w-7xl mx-auto pt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
      {sections.map((section) => (
        <MenuCard 
          key={section} 
          label={section} 
          onClick={() => onSelect(section)} 
        />
      ))}
    </div>
  );
};

export default MenuGrid;
