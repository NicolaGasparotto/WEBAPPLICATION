import dayjs from "dayjs";

import { useState } from "react";
import { Form, Button, Container, FormLabel } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import { UserContext } from "./UserContext";
import { useContext } from "react";

import { Modal, Row, Col, Image } from "react-bootstrap";

function WebPageForm(props) {
  /*
   * Creating a state for each parameter of the webpage.
   * There are two possible cases:
   * - if we are creating a new webpage, the form is initialized with the default values.
   * - if we are editing a webpage, the form is pre-filled with the previous values.
   */
  const navigate = useNavigate();
  const location = useLocation();

  const user = useContext(UserContext);

  const webPage = props.webPage;

  const [title, setTitle] = useState(webPage ? webPage.title : " ");
  const [author, setAuthor] = useState(webPage ? webPage.author : " paolo");
  const [publicationDate, setPublicationDate] = useState(
    webPage && webPage.publicationDate
      ? webPage.publicationDate.format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD")
  );

  const [newHeader, setNewHeader] = useState("");
  const [newParagraph, setNewParagraph] = useState("");
  const [newImage, setNewImage] = useState("");

  const [imageList, setImageList] = useState([
    { id: 1, filename: "giraffe_01.png", name: "Image 1" },
    { id: 2, filename: "giraffe_02.png", name: "Image 2" },
    { id: 3, filename: "giraffe_03.png", name: "Image 3" },
    { id: 4, filename: "giraffe_04.png", name: "Image 4" },
  ]);

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

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

  const handleSubmit = (event) => {};

  const handleDelete = (id) => {
    const updatedLContent = lContent.filter((item) => item.id !== id);
    setLContent(updatedLContent);
  };

  const handleAddHeader = () => {
    const newId = Math.max(...lContent.map((item) => item.id)) + 1;
    const newHeaderItem = {
      id: newId,
      type: "header",
      content: newHeader,
    };
    setLContent((prevContent) => [...prevContent, newHeaderItem]);
    setNewHeader("");
  };

  const handleAddParagraph = () => {
    const newId = Math.max(...lContent.map((item) => item.id)) + 1;
    const newParagraphItem = {
      id: newId,
      type: "paragraph",
      content: newParagraph,
    };
    setLContent((prevContent) => [...prevContent, newParagraphItem]);
    setNewParagraph("");
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

  const handleAddImage = () => {
    const newId = Math.max(...lContent.map((item) => item.id)) + 1;
    const selectedImage = imageList.find((image) =>
      selectedImages.includes(image.id)
    );

    if (selectedImage) {
      const newImageItem = {
        id: newId,
        type: "image",
        content: selectedImage.url,
      };
      setLContent((prevContent) => [...prevContent, newImageItem]);
      setNewImage("");
      setShowImageModal(false);
      setSelectedImages([]);
      console.log("selectedImages", selectedImages);
      console.log(lContent);
    }
  };

  let t = " ";

  return (
    <>
      <Container
        className="justify-content-center col-7 col-xs-11 col-lg-6 col-xxl-5 "
        style={{ display: "grid" }}
      >
        <Form onSubmit={handleSubmit} style={{ gridRow: "1" }}>
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
            <Form.Label>Published by </Form.Label>{" "}
            {user.admin ? (
              <Form.Control
                className="subtitle"
                type="text"
                required={true}
                value={author}
                placeholder={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            ) : (
              <FormLabel>
                <b>{author}</b>
              </FormLabel>
            )}
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

            return (
              <>
                <Form.Group key={item.id} className="mb-4">
                  <Form.Label>
                    <b>{item.type}:</b>
                  </Form.Label>

                  <div className="d-flex align-items-center">
                    <ContentForm item={item} />
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
              </>
            );
          })}
        </Form>
      </Container>
      <div className="addElementsDiv">
        <Button
          className="addElementsButton"
          onClick={() => {
            handleAddHeader();
          }}
        >
          <i className="bi bi-plus-lg"></i> Header
        </Button>
        <Button
          className="addElementsButton"
          onClick={() => {
            handleAddParagraph();
          }}
        >
          <i className="bi bi-plus-lg"></i> Paragraph
        </Button>
        <Button
          className="addElementsButton"
          onClick={() => setShowImageModal(true)}
        >
          <i className="bi bi-plus-lg"></i> Image
        </Button>
      </div>

      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {/* Loop per visualizzare le immagini */}
            {imageList.map((image) => (
              <Col key={image.id} xs={6} md={4} lg={3}>
                <div className="image-wrapper">
                  <img
                    src={
                      /*`${process.env.PUBLIC_URL}/images/${image.filename}`*/ image.url
                    }
                    alt={image.name}
                  />
                  <div className="image-overlay">
                    <Form.Check
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={(event) => {
                        const isChecked = event.target.checked;
                        if (isChecked) {
                          setSelectedImages((prevImages) => [
                            ...prevImages,
                            image.id,
                          ]);
                        } else {
                          setSelectedImages((prevImages) =>
                            prevImages.filter((id) => id !== image.id)
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddImage}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <footer className="footerWebPage" style={{ gridRow: "3" }}>
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
    </>
  );
}

function ContentForm(props) {
  const item = props.item;
  console.log(item);
  let t = "";

  if (item.type === "header") {
    t = "heading2 flex-grow-1 me-3";
  } else if (item.type === "image") {
    return (
      <div key={item.id} className="d-flex align-contents-center col-9 me-4">
        <Image src={'http://localhost:3000/static/images/' + item.content} alt="Image" />
        {/* Aggiungi pulsanti per eliminare, spostare, ecc. */}
      </div>
    );
  } else {
    t = "flex-grow-1 me-3";
  }

  return (
    <Form.Control
      as="textarea"
      rows={4}
      className={t}
      value={item.content}
      onChange={(event) => {
        const updatedLContent = lContent.map((el) =>
          el.id === item.id ? { ...el, content: event.target.value } : el
        );
        setLContent(updatedLContent);
      }}
    />
  );
}

export default WebPageForm;
