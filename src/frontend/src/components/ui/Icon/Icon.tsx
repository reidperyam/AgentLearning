import React from 'react';
import './Icon.css';

export interface IconProps {
  /**
   * The icon content - can be emoji, SVG, or text
   */
  children: React.ReactNode;
  /**
   * Size variant of the icon
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Color variant of the icon background
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  /**
   * Optional aria-label for accessibility
   */
  ariaLabel?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Additional CSS class names
   */
  className?: string;
}

export function Icon({
  children,
  size = 'medium',
  variant = 'primary',
  ariaLabel,
  onClick,
  className = '',
}: IconProps): JSX.Element {
  const classes = [
    'icon',
    `icon--${size}`,
    `icon--${variant}`,
    onClick ? 'icon--clickable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
