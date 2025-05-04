import Swal from "sweetalert2";

/**
 * Displays a confirmation dialog using SweetAlert2.
 * @param {string} title - Title of the confirmation dialog.
 * @param {string} text - Message inside the dialog.
 * @param {string} confirmText - Text on the confirm button.
 * @returns {Promise<boolean>} - Returns true if confirmed, false otherwise.
 */
const ConfirmDialog = async (title = "Are you sure?", text = "You won't be able to revert this!", confirmText = "Yes, delete it!") => {
    const result = await Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: confirmText
    });

    return result.isConfirmed; // Returns true if user confirms, false otherwise
};

export default ConfirmDialog;
