import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import NodeSidebar from "./NodeSidebar"; // Sidebar for adding nodes
import Popup from "./Popup"; // Component for displaying success popups
import { scheduleEmail } from "../api"; // API call to schedule the email
import "../styles/Flowchart.css"; // Styling for the Flowchart

function Flowchart() {
  // React Flow hooks for managing nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // State to manage selected node for displaying form
  const [selectedNode, setSelectedNode] = useState(null);

  // State for handling form data for the selected node
  const [nodeFormData, setNodeFormData] = useState({});

  // State to manage whether the popup is visible
  const [showPopup, setShowPopup] = useState(false);

  // Message to display in the popup
  const [popupMessage, setPopupMessage] = useState("");

  // Callback function to add an edge between nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handle changes to nodes (like position updates or deletions)
  const handleNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  // Save the flowchart and schedule the email
  const handleSaveFlowchart = () => {
    // Validate that all required data is present in the nodes
    const isValid = nodes.every((node) => {
      if (node.data.label === "Cold Email") {
        // Cold Email node requires email, subject, and body
        return node.data.email && node.data.subject && node.data.body;
      } else if (node.data.label === "Wait/Delay") {
        // Wait/Delay node requires scheduleTime
        return node.data.scheduleTime;
      }
      return true; // Other nodes have no specific requirements
    });

    if (!isValid) {
      alert("Please fill in all required fields for all nodes.");
      return; // Stop execution if validation fails
    }

    // Extract email data and scheduleTime from nodes
    const emailData = nodes.find((node) => node.data.label === "Cold Email");
    const scheduleTime = nodes.find((node) => node.data.label === "Wait/Delay")
      ?.data.scheduleTime;

    if (emailData && scheduleTime) {
      // Convert schedule time to ISO 8601 format (UTC)
      const scheduleTimeInUTC = new Date(scheduleTime).toISOString();

      // Prepare the payload for the API call
      const payload = {
        email: emailData.data.email,
        subject: emailData.data.subject,
        body: emailData.data.body,
        scheduleTime: scheduleTimeInUTC, // Use the ISO 8601 UTC time format
      };

      // Call the backend API to schedule the email
      scheduleEmail(payload)
        .then(() => {
          // Show a success popup upon successful scheduling
          setPopupMessage(
            `Email successfully scheduled for ${emailData.data.email}!`
          );
          setShowPopup(true);
        })
        .catch((error) => {
          console.error("Error scheduling email:", error);
        });
    }
  };

  // Handle the closing of the popup
  const handlePopupClose = () => {
    setShowPopup(false); // Close the popup
    setNodes([]); // Clear all nodes from the canvas
    setEdges([]); // Clear all edges from the canvas
  };

  return (
    <div className="flowchart">
      {/* Sidebar to add new nodes */}
      <NodeSidebar
        addNode={(label) =>
          setNodes((nds) => [
            ...nds,
            {
              id: `${label}-${Date.now()}`, // Generate a unique ID for the node
              data: { label }, // Assign the node label
              position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random position on the canvas
            },
          ])
        }
      />

      {/* React Flow Canvas */}
      <div className="flowchart-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange} // Handle node updates
          onEdgesChange={onEdgesChange} // Handle edge updates
          onConnect={onConnect} // Handle edge creation
          onNodeClick={(event, node) => {
            setSelectedNode(node); // Select the clicked node
            setNodeFormData(node.data); // Load the node's existing data
          }}
          deleteKeyCode={["Delete", "Backspace"]} // Allow deletion of nodes/edges
        >
          <Background /> {/* Background for the flowchart */}
          <Controls /> {/* Controls for zooming, centering, etc. */}
        </ReactFlow>
      </div>

      {/* Form for editing the selected node */}
      {selectedNode && (
        <div className="node-form">
          <h3>{selectedNode.data.label} Node</h3>
          {selectedNode.data.label === "Cold Email" && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Recipient Email"
                value={nodeFormData.email || ""}
                onChange={(e) =>
                  setNodeFormData({ ...nodeFormData, email: e.target.value })
                }
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={nodeFormData.subject || ""}
                onChange={(e) =>
                  setNodeFormData({ ...nodeFormData, subject: e.target.value })
                }
              />
              <textarea
                name="body"
                placeholder="Email Body"
                value={nodeFormData.body || ""}
                onChange={(e) =>
                  setNodeFormData({ ...nodeFormData, body: e.target.value })
                }
              />
            </>
          )}
          {selectedNode.data.label === "Wait/Delay" && (
            <input
              type="datetime-local"
              name="scheduleTime"
              placeholder="Schedule Time"
              value={nodeFormData.scheduleTime || ""}
              onChange={(e) =>
                setNodeFormData({
                  ...nodeFormData,
                  scheduleTime: e.target.value,
                })
              }
            />
          )}
          <button
            onClick={() => {
              // Save the form data back to the node
              setNodes((nds) =>
                nds.map((node) =>
                  node.id === selectedNode.id
                    ? { ...node, data: { ...node.data, ...nodeFormData } }
                    : node
                )
              );
              setSelectedNode(null); // Close the form
            }}
          >
            Save Node Data
          </button>
        </div>
      )}

      {/* Button to save and schedule the flowchart */}
      <button className="save-btn" onClick={handleSaveFlowchart}>
        Save Flowchart and Schedule Email
      </button>

      {/* Popup for success notification */}
      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={handlePopupClose} // Clear the canvas upon closing the popup
        />
      )}
    </div>
  );
}

export default Flowchart;
