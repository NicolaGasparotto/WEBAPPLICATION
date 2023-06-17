import { Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";

import { pageList, deletePage } from "../API";

import dayjs from "dayjs";
import "./style.css";

function Blog(props) {
  const user = useContext(UserContext);

  const [webPages, setWebPages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    pageList().then((list) => {
      list.sort((a, b) => {
        const dateA = a.publicationDate
          ? dayjs(a.publicationDate).format("YYYY-MM-DD")
          : "0000-01-01";
        const dateB = b.publicationDate
          ? dayjs(b.publicationDate).format("YYYY-MM-DD")
          : "0000-01-01";

        // the most recent date first
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        return 0;
      });

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
      <Container
        fluid
        className="d-grid justify-content-center col-11 col-sm-10 col-md-9 col-xxl-6 col-xl-7"
      >
        <header
          style={{ marginBottom: "3rem", marginTop: "2rem", display: "flex" }}
          id="headerWebPages"
        >
          <h1 style={{ fontStyle: "italic" }}>Welcome to the Home Page</h1>
        </header>
        {user.id ? (
          <div className="optionsButtons col-10" id="headerWebPages">
            <Button
              className="backOfficeButton mb-3"
              onClick={() => {
                navigate("/"),
                  user.backOfficeView
                    ? props.setUser({ ...user, backOfficeView: false })
                    : props.setUser({ ...user, backOfficeView: true });
              }}
            >
              {" "}
              {user.backOfficeView
                ? "FrontOffice View"
                : "BackOffice View"}{" "}
            </Button>
            {user.backOfficeView ? (
              <Button
                className="newPageButton"
                onClick={() => {
                  navigate("/newPage");
                }}
              >
                <i className="bi bi-plus-lg"></i> new Page
              </Button>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {/*
                <span style={{ fontSize: "1rem" }} id="headerWebPages"> Order by:</span>
                <Container className="tHeader mt-1 mb-4" id="headerWebPages">
                  <span> Title </span>
                  <span> Author </span>
                  <span> PublicationDate </span>
                </Container>
        */}

        <Container className="divider-container">
          <hr className="divider-line" />
          <div className="divider-text"> Most Recent Post </div>
          <hr className="divider-line" />
        </Container>

        <Table hover >
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
          <div className="col-11 col-sm-10 col-md-9 col-lg-8">
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
