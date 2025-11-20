import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal Component', () => {
  it('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        Test content
      </Modal>
    );
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        Test content
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        Test content
      </Modal>
    );
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when backdrop is clicked', () => {
    const handleClose = vi.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        Test content
      </Modal>
    );
    const backdrop = container.querySelector('.modal-backdrop');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(handleClose).toHaveBeenCalled();
    }
  });

  it('should render action buttons with correct labels', () => {
    const actions = [
      { label: 'Cancel', onClick: vi.fn(), variant: 'secondary' as const },
      { label: 'Confirm', onClick: vi.fn(), variant: 'primary' as const },
    ];
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal" actions={actions}>
        Test content
      </Modal>
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('should call action onClick when action button is clicked', () => {
    const handleConfirm = vi.fn();
    const actions = [
      { label: 'Confirm', onClick: handleConfirm, variant: 'primary' as const },
    ];
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal" actions={actions}>
        Test content
      </Modal>
    );
    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('should render children content correctly', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Child paragraph</p>
        <button>Child button</button>
      </Modal>
    );
    expect(screen.getByText('Child paragraph')).toBeInTheDocument();
    expect(screen.getByText('Child button')).toBeInTheDocument();
  });

  it('should not render footer when no actions provided', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        Test content
      </Modal>
    );
    const footer = container.querySelector('.modal-footer');
    expect(footer).not.toBeInTheDocument();
  });
});
