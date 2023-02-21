// COMPONENT LIST EMAILS
import React, { useState, useEffect } from 'react';
import { Loader, Pagination } from "semantic-ui-react";
import { map, size } from "lodash";
import { Newsletter } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { EmailItem } from "../EmailItem";
import "./ListEmails.scss";

const newsletterController = new Newsletter();

export function ListEmails() {

  // state where emails are stored
  const [emails, setEmails] = useState(null);
  // State to store pagination data from server.
  const [pagination, setPagination] = useState(null);
  // State to change page
  const [page, setPage] = useState(1);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        // getEmails function getting called to receive emails/data
        const response = await newsletterController.getEmails(
          accessToken,
          page
        ); //passing page state we are telling the page we want in each render.
        //Storing emails (without pagintion info) in state emails.
        setEmails(response.docs)
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.pages,
          total: response.total
        })
      } catch (error) {
        console.error(error);
      }
    })()
  }, [page])

  //Function to change page. It receives the data of the pages
  const changePage = (_, data) => {
    setPage(data.activePage)
  }

  // If there are no emails or emails are charging we insert a Loader (spinner)
  if (!emails) return <Loader active inline="center" />
  // Message if there are no emails
  if (size(emails) === 0) return "There are no registered emails.";

  return (
    //Rendering all emails and each one is rendered inside EmailItem component
    <div className="list-emails" >
      {map(emails, (email) => (
        <EmailItem key={email._id} email={email} />
      ))}

      <div className='list-emails__pagination'>
        <Pagination
          totalPages={pagination.pages} //Setting the number of pages
          defaultActivePage={pagination.page}
          elipseItem={false}
          firstItem={false}
          lastItem={false}
          onPageChange={changePage} // Calling function to change page
        />
      </div>
    </div>
  )
}
