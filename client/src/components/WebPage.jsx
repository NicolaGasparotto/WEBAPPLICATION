import Page from "./page";
import { Button, Row, Image, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { UserContext } from "./UserContext";
import { useContext, useState, useEffect } from "react";

import "./style.css";
import dayjs from "dayjs";

import { PageNotFound } from "./PageNotFound";
import { deletePage, getContents, getPageById } from "../API";

function WebPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useContext(UserContext);
  const { pageId } = useParams();

  const [lContent, setLContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(false);

  const [page, setPage] = useState({});

  let pageTmp = undefined;
  if (location.state) {
    pageTmp = location.state;
    pageTmp = new Page(
      pageTmp.idPage,
      pageTmp.title,
      pageTmp.author,
      pageTmp.creationDate,
      pageTmp.publicationDate,
      lContent
    );

    useEffect(() => {
      setLoading(true);
      setPage(pageTmp);
      getContents(pageId).then((list) => {
        setLContent(list);
        setLoading(false);
      });
    }, [lContent.length]);
  } else if (pageId) {
    /* load the page from the url */
    useEffect(() => {
      setLoading(true);
      getPageById(pageId)
        .then((p) => {
          getContents(pageId).then((list) => {
            setLContent(list);
            const pi = new Page(...Object.values(p), list);
            setPage(pi);
            setLoading(false);
          });
        })
        .catch(() => {
          navigate("/pageNotFound");
        });
    }, [pageId]);
  } else {
    return (
      <>
        <PageNotFound />
      </>
    );
  }

  const handleDelete = async (id) => {
    setWaiting(true);
    await deletePage(id);
    setWaiting(false);
    navigate("/");
  };

  const pubDate = () => {
    if (page.publicationDate === null)
      return <span style={{ color: "red", fontWeight: "500" }}>DRAFT</span>;
    else if (dayjs(page.publicationDate).isBefore(dayjs()))
      return <b>{page.publicationDate.format("DD-MM-YYYY")}</b>;
    else
      return (
        <span style={{ color: "cornflowerblue", fontWeight: "500" }}>
          {" "}
          {page.publicationDate.format("DD-MM-YYYY")} (not yet published)
        </span>
      );
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner
            as="span"
            animation="border"
            role="status"
            className="me-2"
          />
          <b>Loading...</b>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "8rem" }}>
            <Row className="justify-content-center row gx-4 gx-lg-5 mb-5">
              <header className="col-11 col-sm-10 col-md-8 col-xl-6 col-lg-6">
                <h1 className="title">{page.title}</h1>
                <h3 className="subtitle">
                  Published by <b>{page.author}</b> on {pubDate()}{" "}
                </h3>
                <h4 className="subtitle2">
                  Created on {page.creationDate.format("DD-MM-YYYY")}{" "}
                </h4>
              </header>
            </Row>
            <Row className="justify-content-center row gx-4 gx-lg-5">
              <article className="col-11 col-sm-10 col-md-8 col-xl-6 col-lg-6">
                {page.contentList.map((contentI) => {
                  if (contentI.type === "header") {
                    return (
                      <h2 className="heading2" key={contentI.idContent}>
                        {" "}
                        {contentI.content}
                      </h2>
                    );
                  } else if (contentI.type === "paragraph") {
                    return <p key={contentI.idContent}>{contentI.content}</p>;
                  } else if (contentI.type === "image") {
                    return (
                      <div
                        key={contentI.idContent}
                        className="row gx-3 mb-5 mt-5"
                      >
                        <Image
                          src={
                            "http://localhost:3000/static/images/" +
                            contentI.content
                          }
                          alt="Image"
                          fluid
                        />
                      </div>
                    );
                  }
                })}
              </article>
            </Row>
          </div>
          <footer className="footerWebPage">
            <Button
              disabled={waiting}
              className="footerButton"
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              Back to Home Page{" "}
            </Button>

            {user.backOfficeView &&
            (user.name === page.author || user.admin) ? (
              <>
                <Button
                  disabled={waiting}
                  className="footerEdit"
                  onClick={() => {
                    navigate(`/pages/${page.idPage}/edit`, {
                      state: {
                        nextpage: `/pages/${page.idPage}`,
                        idPage: page.idPage,
                        title: page.title,
                        author: page.author,
                        publicationDate:
                          page.publicationDate ? page.publicationDate.format("YYYY-MM-DD") : page.publicationDate,
                        creationDate: page.creationDate.format("YYYY-MM-DD"),
                      },
                    });
                  }}
                >
                  {" "}
                  EDIT Page{" "}
                </Button>
                <Button
                  disabled={waiting}
                  className="footerDelete"
                  onClick={() => {
                    handleDelete(page.idPage);
                  }}
                >
                  {" "}
                  DELETE PAGE{" "}
                </Button>
              </>
            ) : (
              <></>
            )}
          </footer>
        </>
      )}
    </>
  );
}

export { WebPage };
