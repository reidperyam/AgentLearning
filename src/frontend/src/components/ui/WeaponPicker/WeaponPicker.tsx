import { useState, useEffect } from 'react';
import './WeaponPicker.css';

export interface Weapon {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export interface WeaponPickerProps {
  onWeaponSelect?: (weapon: Weapon) => void;
}

const WEAPONS: Weapon[] = [
  {
    id: 1,
    name: 'Longsword',
    icon: '⚔️',
    description: 'A versatile blade for offense and defense'
  },
  {
    id: 2,
    name: 'Battle Axe',
    icon: '🪓',
    description: 'Heavy weapon with devastating power'
  },
  {
    id: 3,
    name: 'War Hammer',
    icon: '🔨',
    description: 'Crushing force against armored foes'
  },
  {
    id: 4,
    name: 'Bow & Arrow',
    icon: '🏹',
    description: 'Strike from distance with precision'
  }
];

export function WeaponPicker({ onWeaponSelect }: WeaponPickerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrevious = () => {
    const newIndex = selectedIndex === 0 ? WEAPONS.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    onWeaponSelect?.(WEAPONS[newIndex]);
  };

  const handleNext = () => {
    const newIndex = selectedIndex === WEAPONS.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    onWeaponSelect?.(WEAPONS[newIndex]);
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    onWeaponSelect?.(WEAPONS[index]);
  };

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle if focus is within weapon picker
      const weaponPicker = document.querySelector('.weapon-picker');
      if (!weaponPicker?.contains(document.activeElement)) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleNext();
          break;
        case 'Home':
          event.preventDefault();
          setSelectedIndex(0);
          onWeaponSelect?.(WEAPONS[0]);
          break;
        case 'End':
          event.preventDefault();
          setSelectedIndex(WEAPONS.length - 1);
          onWeaponSelect?.(WEAPONS[WEAPONS.length - 1]);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onWeaponSelect]);

  const currentWeapon = WEAPONS[selectedIndex];

  return (
    <div className="weapon-picker" role="group" aria-label="Weapon selection carousel">
      {/* ARIA live region for screen readers */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {currentWeapon.name} selected. {currentWeapon.description}. Item {selectedIndex + 1} of {WEAPONS.length}.
      </div>

      <div className="weapon-display">
        <button
          className="carousel-button prev"
          onClick={handlePrevious}
          aria-label="Previous weapon"
        >
          ‹
        </button>

        <div className="weapon-card">
          <div className="weapon-icon">{currentWeapon.icon}</div>
          <h3 className="weapon-name">{currentWeapon.name}</h3>
          <p className="weapon-description">{currentWeapon.description}</p>
        </div>

        <button
          className="carousel-button next"
          onClick={handleNext}
          aria-label="Next weapon"
        >
          ›
        </button>
      </div>

      <div className="weapon-indicators">
        {WEAPONS.map((weapon, index) => (
          <button
            key={weapon.id}
            className={`indicator ${index === selectedIndex ? 'active' : ''}`}
            onClick={() => handleSelect(index)}
            aria-label={`Select ${weapon.name}`}
            title={weapon.name}
          >
            <span className="indicator-icon">{weapon.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
