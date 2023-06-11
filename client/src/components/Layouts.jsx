import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";

import { Outlet, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Navbar, Button, Form } from "react-bootstrap";
import { Blog } from "./webpages";

import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

function DefaultLayout() {
  return (
    <>
      <header>
        <NavigationBar />
      </header>
      <main>
        <Container fluid>
          <Row>
            <Col style={{ marginTop: "6rem" }}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

/**
 * MainLayout is the layout for the main page of the blog.
 * It works as both FrontOffice and BackOffice view.
 * @returns view of a list of webpages (element Blog)
 */
function MainLayout(props) {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  return (
    <>
      <Blog />
      <footer className="footerWebPage">
        {user.id ? (
          <>
            {user.backOfficeView ? (
              <Button
                className="newPageButton"
                onClick={() => {
                  navigate("/newPage");
                }}
              >
                {" "}
                Create New Page{" "}
              </Button>
            ) : (
              <></>
            )}
            <Button
              className="backOfficeButton"
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
          </>
        ) : (
          <></>
        )}
      </footer>
    </>
  );
}

function NavigationBar() {
  const user = useContext(UserContext);

  const initialBlogName = "BlogName";

  const [editing, setEditing] = useState(false);
  const [blogName, setBlogName] = useState(initialBlogName);
  const [name, setName] = useState(initialBlogName);

  return (
    <>
      <Navbar bg="light" fixed="top" className="personalizedNavbar">
        <Container fluid>
          <Navbar.Brand>
            {editing ? (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Form.Control
                  type="text"
                  placeholder={blogName}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <div>
                  <Button
                    className="saveButtonNav"
                    onClick={() => {
                      setBlogName(name);
                      setEditing(false);
                    }}
                  >
                    Salva
                  </Button>
                  <Button
                    className="cancelButtonNav"
                    onClick={() => {
                      setEditing(false);
                    }}
                  >
                    X
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {user.backOfficeView && user.admin ? (
                  <Button
                    className="editBlogNameButton"
                    onClick={() => {
                      setEditing(true);
                    }}
                  >
                    <i className="bi bi-pencil-square" />
                  </Button>
                ) : null}
                <span>
                  <Link
                    to="/"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {blogName}
                  </Link>
                </span>
              </>
            )}
          </Navbar.Brand>
          <div style={{ display: "flex", flexDirection: "row", transform: "scale(1.2)" }}>
            <Link
              to="/login"
              className="d-flex align-items-center text-decoration-none"
            >
              <span style={{ color: "black", marginRight: "1rem", marginTop: "0.1rem", fontWeight: "450"}}>
                  {user.admin
                    ? `Admin: ${user.name}`
                    : user.id
                    ? user.name
                    : "Login"}
              </span>
              <i className="bi bi-person-circle icon-size" />
            </Link>
            {user.id ? (
              <Button className="logoutButton">
                <i className="bi bi-box-arrow-right"></i>
              </Button>
            ) : null}
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export { DefaultLayout, MainLayout };
