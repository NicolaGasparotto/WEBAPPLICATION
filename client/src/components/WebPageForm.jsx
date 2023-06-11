import dayjs from "dayjs";

import { useState } from "react";
import { Form, Button, Container, FormLabel } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import { UserContext } from "./UserContext";
import { useContext } from "react";

import { Modal, Row, Col, Image, Figure, Alert, FloatingLabel } from "react-bootstrap";

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

  const [showImageError, setShowImageError] = useState(false);

  const [newHeader, setNewHeader] = useState("");
  const [newParagraph, setNewParagraph] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const hasHeader = lContent.some((item) => item.type === "header");
    const hasImageOrParagraph = lContent.some(
      (item) => item.type === "image" || item.type === "paragraph"
    );
  
    if (hasHeader && hasImageOrParagraph) {
      // Update the values in lContent  
      setLContent(lContent);
  
      // Navigate back to the previous page
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
      } else {
        navigate("/");
      }
    }
  };  

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
    if (selectedImages.length === 0) {
      setShowImageError(true);
      return;
    }

    let newId = Math.max(...lContent.map((item) => item.id));
    for (const selectedImage of selectedImages) {
      newId += 1;
      const newImageItem = {
        id: newId,
        type: "image",
        content: selectedImage.filename,
      };
      setLContent((prevContent) => [...prevContent, newImageItem]);

      setShowImageError(false);
      setShowImageModal(false);
      setSelectedImages([]);
    }
  };

  const handleModalClose = () => {
    setShowImageModal(false);
    setShowImageError(false);
    setSelectedImages([]);
  };

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
                  <div className="d-flex align-items-center">
                    {/* <!-- It could be a TextArea or An Image -->*/}
                    <ContentForm
                      item={item}
                      lContent={lContent}
                      setLContent={setLContent}
                    />

                    <Button
                      className="footerDelete me-2"
                      onClick={() => handleDelete(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                    <div style={{display: "flex", flexDirection: 'column'}}>
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

      <Modal size="lg" show={showImageModal} onHide={() => handleModalClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Select Image:</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ paddingLeft: "40px", paddingRight: "20px" }}>
          <Row className="gx-5">
            {/* Loop per visualizzare le immagini */}
            {imageList.map((image) => {
              return (
                <Col key={image.id} xs={6} xl={3} lg={3} className="mt-4">
                  <div className="image-wrapper">
                    <Figure className="figureBlock">
                      <Figure.Image
                        width={171}
                        height={180}
                        src={
                          "http://localhost:3000/static/images/" +
                          image.filename
                        }
                        alt={image.name}
                      />
                    </Figure>
                    <div className="checkBoxWrapper">
                      <Form.Check
                        type="checkbox"
                        checked={selectedImages.includes(image)}
                        label={image.name}
                        onChange={(event) => {
                          const isChecked = event.target.checked;
                          if (isChecked) {
                            setSelectedImages((prevImages) => [
                              ...prevImages,
                              image,
                            ]);
                          } else {
                            // is already checked --> remove it
                            setSelectedImages((prevImages) =>
                              prevImages.filter((img) => img.id !== image.id)
                            );
                          }
                        }}
                      />{" "}
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {showImageError && (
            <Alert variant="danger" style={{ marginRight: "5%" }}>
              Please select an image.
            </Alert>
          )}
          <Button variant="secondary" onClick={() => handleModalClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleAddImage()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <footer className="footerWebPage" style={{ gridRow: "3" }}>
        <Button className="newPageButton" style={{width: '150px'}}  onClick={(event) => handleSubmit(event)} type="submit">
          Save
        </Button>
        <Button
          className="deleteButton"
          style={{ border: "2px solid red" }}
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

  let t = "";

  if (item.type === "header") {
    t = "heading2 flex-grow-1 me-3 ";
  } else if (item.type === "image") {
    return (
      <>
        <div>
          <Form.Label>
            <b>{item.type}:</b>
          </Form.Label>
          <div key={item.id} className="flex-grow-1 me-3">
            <Image
              src={"http://localhost:3000/static/images/" + item.content}
              alt="Image"
              fluid
            />
          </div>
        </div>
      </>
    );
  } else {
    t = "flex-grow-1 me-3";
  }

  return (
    <>
      <FloatingLabel
        controlId="textarea"
        label={item.type + ":"}
        style={{ fontWeight: "500"}}
        className="flex-grow-1 me-3"
      >
      <Form.Control
        as="textarea"
        className={t}
        style={{ height: "250px", paddingTop: '35px' }}
        value={item.content}
        onChange={(event) => {
          const updatedLContent = props.lContent.map((el) =>
            el.id === item.id ? { ...el, content: event.target.value } : el
          );
          props.setLContent(updatedLContent);
        }}
      />
      </FloatingLabel>
    </>
  );
}

export default WebPageForm;
