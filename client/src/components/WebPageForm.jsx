import dayjs from "dayjs";

import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function WebPageForm(props) {
  /*
   * Creating a state for each parameter of the webpage.
   * There are two possible cases:
   * - if we are creating a new webpage, the form is initialized with the default values.
   * - if we are editing a webpage, the form is pre-filled with the previous values.
   */
  const navigate = useNavigate();
  const location = useLocation();

  const webPage = props.webPage;

  const [title, setTitle] = useState(webPage ? webPage.title : " ");
  const [author, setAuthor] = useState(webPage ? webPage.author : false);
  const [publicationDate, setPublicationDate] = useState(
    webPage && webPage.publicationDate
      ? webPage.publicationDate.format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD")
  );

  const [lContent, setLContent] = useState([
    { id: 1, type: "header", content: "Title1" },
    {
      id: 2,
      type: "paragraph",
      content:
        "This is some text in paragraph1. not tooo short because is not possible to see the centrature",
    },
    {
      id: 3,
      type: "paragraph",
      content:
        "This is some text in paragraph1. not tooo short because is not possible to see the centrature \naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ",
    },
    {
      id: 4,
      type: "paragraph",
      content:
        "This is some text in paragraph1. not tooo short because is not possible to see the centrature",
    },
    { id: 8, type: "header", content: "Title1" },
    {
      id: 5,
      type: "paragraph",
      content:
        "This is some text in paragraph1. not tooo short because is not possible to see the centrature",
    },
    {
      id: 6,
      type: "paragraph",
      content:
        "This is some text in paragraph1. not tooo short because is not possible to see the centrature",
    },
    { id: 9, type: "header", content: "Title1" },

    {
      id: 7,
      type: "paragraph",
      content:
        "This is some text in paragraph1. not tooo short because is not possible to see the centrature",
    },
  ]);

  const handleSubmit = (event) => {
    /*
    event.preventDefault();

    const webpage = {"title": title.trim(), "author": author, "contentsList": contentsList}
    if(publicationDate)  // adding publicationDate only if it is defined
      webpage.publicationDate = (dayjs(publicationDate).format('YYYY-MM-DD')).toString();
    
    if(webPage) {
      webpage.id = webPage.id;
      props.editFilm(webpage);
    }
    else
      props.addFilm(webpage);
    */
  };

  const handleDelete = (id) => {
    const updatedLContent = lContent.filter((item) => item.id !== id);
    setLContent(updatedLContent);
  };

  const handleMove = (itemId, direction) => {
    const itemIndex = lContent.findIndex((el) => el.id === itemId);

    if (direction === "up" && itemIndex > 0) {
      // element up
      const updatedLContent = [...lContent];
      const temp = updatedLContent[itemIndex - 1];
      updatedLContent[itemIndex - 1] = updatedLContent[itemIndex];
      updatedLContent[itemIndex] = temp;
      setLContent(updatedLContent);
    } else if (direction === "down" && itemIndex < lContent.length - 1) {
      // element down
      const updatedLContent = [...lContent];
      const temp = updatedLContent[itemIndex + 1];
      updatedLContent[itemIndex + 1] = updatedLContent[itemIndex];
      updatedLContent[itemIndex] = temp;
      setLContent(updatedLContent);
    }
  };

  let t = ' ';

  return (
    <>
      <Container className="justify-content-center col-7 col-xs-11 col-lg-6 col-xxl-5 vh-100">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              className="title"
              type="text"
              required={true}
              value={title}
              placeholder={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Published by</Form.Label>
            <Form.Control
              className="subtitle"
              type="text"
              required={true}
              value={author}
              placeholder={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>publicationDate</Form.Label>
            {/* publicationDate is an optional parameter. It have to be properly rendered only if available. */}
            <Form.Control
              type="date"
              value={publicationDate}
              onChange={(event) => {
                event.target.value
                  ? setPublicationDate(
                      dayjs(event.target.value).format("YYYY-MM-DD")
                    )
                  : setPublicationDate("");
              }}
            />
          </Form.Group>

          {lContent.map((item) => {
            item.type === "header" ?  t = 'heading2 flex-grow-1 me-3' : t = 'flex-grow-1 me-3' ;
            return <>
            <Form.Group key={item.id} className="mb-4">
              <Form.Label>
                <b>{item.type}:</b>
              </Form.Label>
              
              <div className="d-flex align-items-center">
                <Form.Control
                  as="textarea"
                  rows={4}
                  className={t}
                  value={item.content}
                  onChange={(event) => {
                    const updatedLContent = lContent.map((el) =>
                      el.id === item.id
                        ? { ...el, content: event.target.value }
                        : el
                    );
                    setLContent(updatedLContent);
                  }}
                />

                <Button
                  className="footerDelete me-2"
                  onClick={() => handleDelete(item.id)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
                <div>
                  <Button
                    className="upDownButtons"
                    onClick={() => handleMove(item.id, "up")}
                  >
                    <i className="bi bi-caret-up-fill" />
                  </Button>
                  <Button
                    className="upDownButtons"
                    onClick={() => handleMove(item.id, "down")}
                  >
                    <i className="bi bi-caret-down-fill" />
                  </Button>
                </div>
              </div>
            </Form.Group>
            </>;
          })}
        </Form>
        <footer className="footerWebPage">
          <Button className="deleteButton" variant="primary" type="submit">
            Save
          </Button>
          <Button
            className="deleteButton"
            variant="danger"
            onClick={() => {
              const page = location.state;
              if (page) {
                navigate(location.state.nextpage, {
                  state: {
                    id: page.id,
                    title: page.title,
                    author: page.author,
                    pubDate: page.publicationDate,
                    creationDate: page.creationDate,
                  },
                });
              } else navigate("/");
            }}
          >
            Cancel
          </Button>
        </footer>
      </Container>
    </>
  );
}

export default WebPageForm;
