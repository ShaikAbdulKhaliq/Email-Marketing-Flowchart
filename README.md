Flowchart Email Scheduler Application
Overview
This application allows users to create an email scheduling flowchart. The flowchart consists of various types of nodes, including:

Cold Email: Represents an email action, where users can define the recipient, subject, and body.
Wait/Delay: Represents a delay before sending another email or taking the next action.
Lead Source: (Optional) Represents the source from which the lead originates.
Users can interact with the flowchart by adding these nodes, connecting them, and scheduling emails based on the specified timing. Once the flowchart is created and validated, it triggers an API call to schedule the email to be sent.

Features
Add Nodes: Add Cold Email, Wait/Delay, and Lead Source nodes to the flowchart.
Email Scheduling: Emails are scheduled to be sent at a specific time (e.g., after a delay).
Popup Notification: A success notification popup appears once the email is successfully scheduled.
Canvas Reset: After scheduling an email, the flowchart is cleared and reset for a new sequence.
How it Works
1. Create a Flowchart
Users begin by adding nodes to the canvas. There are three types of nodes:

Cold Email Node: Specifies the email content (recipient, subject, body).
Wait/Delay Node: Defines the wait time before sending the next email. The time is collected in the datetime-local input format and is converted to UTC before sending it to the backend.
Lead Source Node: (Optional) Helps track where the lead came from but doesn't directly affect email scheduling.
2. Node Interactions
Each node can be selected and edited by clicking on it. Once selected, users can input data specific to that node (e.g., email content for the Cold Email node, schedule time for the Wait/Delay node).
Cold Email nodes require valid email, subject, and body fields.
Wait/Delay nodes require a valid scheduleTime field (formatted in ISO 8601 UTC format).
3. Schedule Email
Once the flowchart is created and validated, the user clicks the "Save Flowchart and Schedule Email" button. This triggers the following:

Validation: The system checks whether the required fields are filled for each node.
Cold Email: Requires recipient email, subject, and body.
Wait/Delay: Requires a valid schedule time.
API Call: The email data and schedule time are sent to the backend API (scheduleEmail) to schedule the email.
4. Success Popup and Canvas Reset
After the email is successfully scheduled, a popup notification appears, confirming that the email has been scheduled.
Upon closing the popup, the flowchart canvas is reset (cleared of all nodes and edges), preparing the system for a new flowchart to be created.
Installation
To run the project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/your-username/flowchart-email-scheduler.git
cd flowchart-email-scheduler
Install dependencies:

bash
Copy code
npm install
Start the application:

bash
Copy code
npm start
The application should now be running on http://localhost:3000.

Technologies Used
React: Frontend framework for building the flowchart UI.
React Flow: Library for creating and interacting with the flowchart.
Node.js: Backend server to handle scheduling the email.
Agenda: Task scheduling library for managing the timing of email sending.
Nodemailer: For sending the scheduled email.
Usage
1. Adding Nodes
Click on a node type in the sidebar (Cold Email, Wait/Delay, Lead Source) to add it to the canvas.
2. Editing Node Data
Click on a node to open the data form.
Fill in the required fields (email content for Cold Email, schedule time for Wait/Delay).
3. Saving and Scheduling
After filling out the form, click the "Save Node Data" button to save the node.
Click the "Save Flowchart and Schedule Email" button to validate the flowchart and schedule the email.
4. Success Notification
Once the email is successfully scheduled, a popup will appear with a success message. You can then close the popup, and the canvas will be reset for the next task.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

Fork the repository.
Create a new branch (git checkout -b feature-name).
Commit your changes (git commit -am 'Add new feature').
Push to your branch (git push origin feature-name).
Submit a pull request.