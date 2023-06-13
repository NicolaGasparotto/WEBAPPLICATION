import { Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";

import { pageList, deletePage } from "../API";

import dayjs from "dayjs";
import "./style.css";

function Blog() {
  const user = useContext(UserContext);

  const [webPages, setWebPages] = useState([]);

  useEffect(() => {
    pageList().then((list) => {
      setWebPages(list);
    });
  }, []);

  const handleDelete = async (id) => {
    //setWaiting(true);
    await deletePage(id);
    const list = await pageList();
    setWebPages(list);
    // setWaiting(false);
  };

  const isValid = (date) => {
    if (date === null) return 0;
    else if (dayjs(date).isAfter(dayjs())) return -1;
    else return 1;
  };

  return (
    <>
      <Container className="justify-content-center col-10 col-xxl-6 col-xl-7">
        <span> Order By:</span>
        <Container className="tHeader">
          <span> Title </span>
          <span> Author </span>
          <span> PublicationDate </span>
        </Container>
        <Table hover>
          <tbody>
            {webPages.map((webPage) => {
              if (user.backOfficeView || isValid(webPage.publicationDate) > 0)
                return (
                  <BlogRow
                    key={webPage.idPage}
                    webPage={webPage}
                    isValid={isValid(webPage.publicationDate)}
                    handleDelete={handleDelete}
                  />
                );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

function BlogRow(props) {
  const user = useContext(UserContext);

  const webPage = props.webPage;

  const navigate = useNavigate();

  const pubDate = () => {
    if (props.isValid > 0)
      return <b>{dayjs(webPage.publicationDate).format("DD-MM-YYYY")}</b>;
    else if (props.isValid === 0)
      return <span style={{ color: "red", fontWeight: "500" }}>DRAFT</span>;
    else
      return (
        <span style={{ color: "cornflowerblue", fontWeight: "500" }}>
          {" "}
          {dayjs(webPage.publicationDate).format("DD-MM-YYYY")} (not yet
          published)
        </span>
      );
  };

  return (
    <>
      <tr className="mt-5">
        <td className="row gx-4 gx-lg-5 justify-content-center mt-3">
          <div className="col-md-10 col-lg-8">
            <div>
              <div>
                <span className="trTitle"> {webPage.title} </span>
              </div>
              <span className="trInfo">
                {" "}
                Published by {webPage.author}, on {pubDate()}
              </span>
            </div>
            <div className="buttonDiv">
              <Button
                className="viewButton"
                onClick={() => {
                  navigate(`/pages/${webPage.idPage}`, {
                    state: {
                      idPage: webPage.idPage,
                      title: webPage.title,
                      author: webPage.author,
                      publicationDate: webPage.publicationDate,
                      creationDate: webPage.creationDate,
                    },
                  });
                }}
              >
                {" "}
                Read{" "}
              </Button>
              {user.backOfficeView &&
              (user.name === webPage.author || user.admin) ? (
                <>
                  <Button
                    className="editButton"
                    onClick={() =>
                      navigate(`/pages/${webPage.idPage}/edit`, {
                        state: {
                          idPage: webPage.idPage,
                          title: webPage.title,
                          author: webPage.author,
                          publicationDate: webPage.publicationDate,
                          creationDate: webPage.creationDate,
                        },
                      })
                    }
                  >
                    {" "}
                    EDIT{" "}
                  </Button>
                  <Button
                    className="deleteButton"
                    onClick={() => {
                      props.handleDelete(webPage.idPage);
                    }}
                  >
                    {" "}
                    DELETE ARTICLE{" "}
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

export { Blog };
