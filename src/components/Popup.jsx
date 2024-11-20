import React from "react"; // Import React to define the functional component
import "../styles/Popup.css"; // Import the CSS file for styling the popup

/**
 * Popup Component
 * Displays a modal overlay with a success message and a close button.
 *
 * Props:
 * - message (string): The success message to display in the popup.
 * - onClose (function): Callback function triggered when the user clicks the "Close" button.
 */
const Popup = ({ message, onClose }) => {
  return (
    // The backdrop for the popup, which dims the background
    <div className="popup-backdrop">
      {/* The popup container */}
      <div className="popup">
        {/* Title of the popup */}
        <h3>Success!</h3>

        {/* Display the success message */}
        <p>{message}</p>

        {/* Close button to dismiss the popup */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup; // Export the component for use in other parts of the application
