// COMPONENT LIST EMAILS
import React, { useState, useEffect } from 'react';
import { Loader } from "semantic-ui-react";
import { map, size } from "lodash";
import { Newsletter } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { EmailItem } from "../EmailItem";

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

  // If there are no emails or emails are charging we insert a Loader (spinner)
  if (!emails) return <Loader active inline="center" />
  // Message if there are no emails
  if (size(emails) === 0) return "There are no registered emails.";

  return (
    //Rendering all emails and each one is rendered inside EmailItem component
    <div className="list-emails" >
      {map(emails, (email) => (
        <EmailItem  key={email._id} email={email}/>
      ))}

      <div>
        {/*PAGINATION*/}
      </div>
    </div>
  )
}
