import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import { getBlogName, editBlogName, doLogout } from "../API";

import { Outlet, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Navbar, Button, Form } from "react-bootstrap";
import { Blog } from "./WebPages";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";

function DefaultLayout(props) {
  return (
    <>
      <header>
        <NavigationBar handleLogout={props.handleLogout}/>
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

  return (
    <>
      <Blog setUser={props.setUser}/>
    </>
  );
}

function NavigationBar(props) {

  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [blogName, setBlogName] = useState(" ");
  const [name, setName] = useState("");

  useEffect(() => {
    getBlogName().then((name) => {
      setBlogName(name);
      setName(name);
    });
  }, [blogName]);

  const handleEditBlogName = async (name) => {
    await editBlogName(name);
    setBlogName(name);
  };

  return (
    <>
      <Navbar bg="light" fixed="top" className="personalizedNavbar">
        <Container fluid className="d-flex justify-content-space-between">
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
                      handleEditBlogName(name);
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
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <Link
              to="/login"
              className="d-flex align-items-center text-decoration-none"
            >
              <span
                style={{
                  color: "black",            
                  fontWeight: "450",
                  fontSize: "1.2rem"
                }}
              >
                {user.admin
                  ? (<span> <b> Admin: </b>{(user.name).split(' ')[0]}</span>)
                  : user.id
                  ? user.name
                  : "Login"}
              </span>
              {!user.id && <i style={{marginLeft: "0.5rem"}} className="bi bi-person-circle icon-size" />}
            </Link>
            {user.id ? (
              <Button className="logoutButton" onClick={() => {props.handleLogout().then(navigate("/"))}}>
                <i className="bi bi-box-arrow-right"></i>
                {" "}LOGOUT 
              </Button>
            ) : null}
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export { DefaultLayout, MainLayout };
