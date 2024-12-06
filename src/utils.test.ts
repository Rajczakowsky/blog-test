import { describe, it, expect, vi } from 'vitest';
import { showDeleteConfirmation } from './utils';
import { confirmAlert } from 'react-confirm-alert';

vi.mock('react-confirm-alert', () => ({
    confirmAlert: vi.fn(),
}));

describe('showDeleteConfirmation', () => {
    it('should call confirmAlert with the correct parameters', () => {
        const onConfirmMock = vi.fn();

        showDeleteConfirmation(onConfirmMock);

        expect(confirmAlert).toHaveBeenCalledWith({
            title: "Confirm deletion",
            message: "Are you sure you would like to delete this post?",
            buttons: [
                { label: "No" },
                { label: "Yes", onClick: onConfirmMock },
            ],
        });
    });
});