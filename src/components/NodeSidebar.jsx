import React from "react"; // Import React to define the functional component
import "../styles/NodeSidebar.css"; // Import the CSS file for styling the sidebar

/**
 * NodeSidebar Component
 * This component provides a user interface for adding nodes to the flowchart.
 *
 * Props:
 * - addNode (function): A callback function passed from the parent component 
 *   to add a node of a specific type to the flowchart.
 */
function NodeSidebar({ addNode }) {
  return (
    <div className="node-sidebar">
      {/* Sidebar Title */}
      <h3>Add Nodes</h3>

      {/* Button to add a "Cold Email" node */}
      <button onClick={() => addNode("Cold Email")}>Cold Email</button>

      {/* Button to add a "Wait/Delay" node */}
      <button onClick={() => addNode("Wait/Delay")}>Wait/Delay</button>

      {/* Button to add a "Lead Source" node */}
      <button onClick={() => addNode("Lead Source")}>Lead Source</button>
    </div>
  );
}

export default NodeSidebar; // Export the component for use in other parts of the application
