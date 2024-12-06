import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

/**
 * Shows a confirmation dialog for deleting a post.
 *
 * @param {Function} onConfirm - The function to call when the user confirms the deletion.
 */
export const showDeleteConfirmation = (onConfirm: () => void) => {
  confirmAlert({
    title: "Confirm deletion",
    message: "Are you sure you would like to delete this post?",
    buttons: [
      {
        label: "No",
      },
      {
        label: "Yes",
        onClick: onConfirm,
      },
    ],
  });
};
