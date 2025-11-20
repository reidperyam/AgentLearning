import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders with children content', () => {
    render(<Icon ariaLabel="test icon">🏠</Icon>);
    expect(screen.getByLabelText('test icon')).toBeInTheDocument();
    expect(screen.getByText('🏠')).toBeInTheDocument();
  });

  it('applies default size and variant classes', () => {
    render(<Icon ariaLabel="test icon">🏠</Icon>);
    const icon = screen.getByLabelText('test icon');
    expect(icon).toHaveClass('icon');
    expect(icon).toHaveClass('icon--medium');
    expect(icon).toHaveClass('icon--primary');
  });

  it('applies small size variant', () => {
    render(<Icon size="small" ariaLabel="test icon">🏠</Icon>);
    const icon = screen.getByLabelText('test icon');
    expect(icon).toHaveClass('icon--small');
  });

  it('applies large size variant', () => {
    render(<Icon size="large" ariaLabel="test icon">🏠</Icon>);
    const icon = screen.getByLabelText('test icon');
    expect(icon).toHaveClass('icon--large');
  });

  it('applies secondary color variant', () => {
    render(<Icon variant="secondary" ariaLabel="test icon">🏠</Icon>);
    const icon = screen.getByLabelText('test icon');
    expect(icon).toHaveClass('icon--secondary');
  });

  it('applies success color variant', () => {
    render(<Icon variant="success" ariaLabel="test icon">🏠</Icon>);
    const icon = screen.getByLabelText('test icon');
    expect(icon).toHaveClass('icon--success');
  });

  it('applies danger color variant', () => {
    render(<Icon variant="danger" ariaLabel="test icon">🏠</Icon>);
    const icon = screen.getByLabelText('test icon');
    expect(icon).toHaveClass('icon--danger');
  });

  it('applies neutral color variant', () => {
    render(<Icon variant="neutral" ariaLabel="test icon">🏠</Icon>);
    const icon = screen.getByLabelText('test icon');
    expect(icon).toHaveClass('icon--neutral');
  });

  it('applies custom className', () => {
    render(<Icon className="custom-class" ariaLabel="test icon">🏠</Icon>);
    const icon = screen.getByLabelText('test icon');
    expect(icon).toHaveClass('custom-class');
  });

  it('handles click events when onClick is provided', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Icon onClick={handleClick} ariaLabel="clickable icon">🏠</Icon>);

    const icon = screen.getByLabelText('clickable icon');
    expect(icon).toHaveClass('icon--clickable');
    expect(icon).toHaveAttribute('role', 'button');
    expect(icon).toHaveAttribute('tabIndex', '0');

    await user.click(icon);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles Enter key press when clickable', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Icon onClick={handleClick} ariaLabel="clickable icon">🏠</Icon>);

    const icon = screen.getByLabelText('clickable icon');
    icon.focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles Space key press when clickable', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Icon onClick={handleClick} ariaLabel="clickable icon">🏠</Icon>);

    const icon = screen.getByLabelText('clickable icon');
    icon.focus();
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not have button role when not clickable', () => {
    render(<Icon ariaLabel="static icon">🏠</Icon>);
    const icon = screen.getByLabelText('static icon');
    expect(icon).not.toHaveAttribute('role', 'button');
    expect(icon).not.toHaveAttribute('tabIndex');
  });

  it('renders SVG content', () => {
    render(
      <Icon ariaLabel="svg icon">
        <svg width="24" height="24" data-testid="svg-icon">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </Icon>
    );
    expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
  });

  it('renders text content', () => {
    render(<Icon ariaLabel="text icon">A</Icon>);
    expect(screen.getByText('A')).toBeInTheDocument();
  });
});
