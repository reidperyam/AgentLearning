import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WeaponPicker, Weapon } from './WeaponPicker';

describe('WeaponPicker', () => {
  it('renders the first weapon by default', () => {
    render(<WeaponPicker />);

    expect(screen.getByText('Longsword')).toBeInTheDocument();
    expect(screen.getByText('A versatile blade for offense and defense')).toBeInTheDocument();
  });

  it('displays all weapon indicators', () => {
    render(<WeaponPicker />);

    const indicators = screen.getAllByRole('button', { name: /Select/ });
    expect(indicators).toHaveLength(4);
  });

  it('navigates to next weapon when next button is clicked', () => {
    render(<WeaponPicker />);

    const nextButton = screen.getByRole('button', { name: 'Next weapon' });
    fireEvent.click(nextButton);

    expect(screen.getByText('Battle Axe')).toBeInTheDocument();
    expect(screen.getByText('Heavy weapon with devastating power')).toBeInTheDocument();
  });

  it('navigates to previous weapon when previous button is clicked', () => {
    render(<WeaponPicker />);

    const prevButton = screen.getByRole('button', { name: 'Previous weapon' });
    fireEvent.click(prevButton);

    expect(screen.getByText('Bow & Arrow')).toBeInTheDocument();
    expect(screen.getByText('Strike from distance with precision')).toBeInTheDocument();
  });

  it('wraps around when navigating past the last weapon', () => {
    render(<WeaponPicker />);

    const nextButton = screen.getByRole('button', { name: 'Next weapon' });

    // Click through all weapons
    fireEvent.click(nextButton); // Battle Axe
    fireEvent.click(nextButton); // War Hammer
    fireEvent.click(nextButton); // Bow & Arrow
    fireEvent.click(nextButton); // Should wrap to Longsword

    expect(screen.getByText('Longsword')).toBeInTheDocument();
  });

  it('wraps around when navigating before the first weapon', () => {
    render(<WeaponPicker />);

    const prevButton = screen.getByRole('button', { name: 'Previous weapon' });
    fireEvent.click(prevButton);

    expect(screen.getByText('Bow & Arrow')).toBeInTheDocument();
  });

  it('selects weapon when indicator is clicked', () => {
    render(<WeaponPicker />);

    const warHammerIndicator = screen.getByRole('button', { name: 'Select War Hammer' });
    fireEvent.click(warHammerIndicator);

    expect(screen.getByText('War Hammer')).toBeInTheDocument();
    expect(screen.getByText('Crushing force against armored foes')).toBeInTheDocument();
  });

  it('calls onWeaponSelect callback when weapon changes', () => {
    const handleSelect = vi.fn();
    render(<WeaponPicker onWeaponSelect={handleSelect} />);

    const nextButton = screen.getByRole('button', { name: 'Next weapon' });
    fireEvent.click(nextButton);

    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Battle Axe',
        icon: '🪓'
      })
    );
  });

  it('calls onWeaponSelect when indicator is clicked', () => {
    const handleSelect = vi.fn();
    render(<WeaponPicker onWeaponSelect={handleSelect} />);

    const bowIndicator = screen.getByRole('button', { name: 'Select Bow & Arrow' });
    fireEvent.click(bowIndicator);

    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Bow & Arrow',
        icon: '🏹'
      })
    );
  });

  it('marks the active indicator correctly', () => {
    render(<WeaponPicker />);

    const indicators = screen.getAllByRole('button', { name: /Select/ });

    // First indicator should be active by default
    expect(indicators[0]).toHaveClass('active');
    expect(indicators[1]).not.toHaveClass('active');

    // Click next button
    const nextButton = screen.getByRole('button', { name: 'Next weapon' });
    fireEvent.click(nextButton);

    // Second indicator should now be active
    expect(indicators[0]).not.toHaveClass('active');
    expect(indicators[1]).toHaveClass('active');
  });
});
