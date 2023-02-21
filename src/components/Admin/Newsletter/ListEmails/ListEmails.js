// COMPONENT LIST EMAILS
import React, { useState, useEffect } from 'react';
import { Newsletter } from "../../../../api";
import { useAuth } from "../../../../hooks";

const newsletterController = new Newsletter();

export function ListEmails() {

  // state where emails are stored
  const [emails, setEmails] = useState(null);

  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        // getEmails function getting called to receive emails/data
        const response = await newsletterController.getEmails(accessToken);
       //Storing emails (without pagintion info) in state emails.
        setEmails(response.docs)
      } catch (error) {
        console.error(error);
      }
    })()
  }, [])



  return (
    <div>
      <h2>List Emails</h2>
    </div>
  )
}
