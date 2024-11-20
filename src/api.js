export const scheduleEmail = async (emailData) => {
    try {
      const response = await fetch(
        "https://nodeandagendamailer.onrender.com/api/email/schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );
      return response.json();
    } catch (error) {
      console.error("Error scheduling email:", error);
    }
  };
  