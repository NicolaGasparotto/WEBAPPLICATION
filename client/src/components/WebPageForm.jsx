import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { Form, Button, Container, FormLabel } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import { UserContext } from "./UserContext";
import { useContext } from "react";

import { Modal, Row, Col, Image, Figure, Alert, FloatingLabel } from "react-bootstrap";

import { getContents} from "../API";

function WebPageForm(props) {

  const user = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  /* Retrieving the information */
  let webPage = undefined;
  if(location.state){
    webPage = {...location.state};
  }

  const [ lContent, setLContent ] = useState([]);
  useEffect(() => {
    if (webPage) {
      getContents(webPage.idPage).then((list) => {
        setLContent(list) ;
      });
    }
  }, []);

  /* Setting values for the form page*/
  const [title, setTitle] = useState(webPage ? webPage.title : " ");
  const [author, setAuthor] = useState(webPage ? webPage.author : " ");
  const [publicationDate, setPublicationDate] = useState(
    webPage && webPage.publicationDate
      ? dayjs(webPage.publicationDate).format("YYYY-MM-DD")
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

  function goBackNavigation() {
    const page = location.state;
    if (page && page.nextpage) {
      navigate(page.nextpage, {
        state: {
          idPage: page.idPage,
          title: page.title,
          author: page.author,
          publicationDate: page.publicationDate,
          creationDate: page.creationDate,
        },
      });
    } else navigate("/");
  }

  /* The action is different if is an AddNewPage or EditPage*/
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const hasHeader = lContent.some((item) => item.type === "header");
    const hasImageOrParagraph = lContent.some(
      (item) => item.type === "image" || item.type === "paragraph"
    );
  
    if (hasHeader && hasImageOrParagraph) {
      
      // Update the values in the server
      // is different if is an AddNewPage or EditPage
      props.submitUpdates({"idPage": webPage.idPage,"title": title, "author": author, "publicationDate": publicationDate, "creationDate": webPage.creationDate, "lContents": lContent});

      // Navigate back to the previous page
      goBackNavigation();
    }
  };  

  const handleDelete = (id) => {
    const updatedLContent = lContent.filter((item) => item.idContent !== id);
    setLContent(updatedLContent);
  };

  const handleAddHeader = () => {
    const newId = lContent.length ? (Math.max(...lContent.map((item) => item.idContent)) + 1) : 1;

    const newHeaderItem = {
      idContent: newId,
      type: "header",
      content: newHeader,
    };
    setLContent((prevContent) => [...prevContent, newHeaderItem]);
    setNewHeader("");
  };

  const handleAddParagraph = () => {
    const newId = lContent.length ? (Math.max(...lContent.map((item) => item.idContent)) + 1) : 1;
    
    const newParagraphItem = {
      idContent: newId,
      type: "paragraph",
      content: newParagraph,
    };
    setLContent((prevContent) => [...prevContent, newParagraphItem]);
    setNewParagraph("");
  };

  const handleAddImage = () => {
    if (selectedImages.length === 0) {
      setShowImageError(true);
      return;
    }

    let newId = lContent.length ? (Math.max(...lContent.map((item) => item.idContent))) : 0;
    for (const selectedImage of selectedImages) {
      newId += 1;
      const newImageItem = {
        idContent: newId,
        idPage: webPage.idPage,
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

  const handleMove = (itemId, direction) => {
    const itemIndex = lContent.findIndex((el) => el.idContent === itemId);

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
                      (event.target.value)
                    )
                  : setPublicationDate("");
              }}
            />
          </Form.Group>

          {lContent.map((item) => {
            return (
                <Form.Group key={item.idContent} className="mb-4">
                  <div className="d-flex align-items-center" >
                    {/* <!-- It could be a TextArea or An Image -->*/}
                    <ContentForm
                      item={item}
                      lContent={lContent}
                      setLContent={setLContent}
                    />

                    <Button
                      className="footerDelete me-2"
                      onClick={() => handleDelete(item.idContent)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                    <div style={{display: "flex", flexDirection: 'column'}}>
                      <Button
                        className="upDownButtons"
                        onClick={() => handleMove(item.idContent, "up")}
                      >
                        <i className="bi bi-caret-up-fill" />
                      </Button>
                      <Button
                        className="upDownButtons"
                        onClick={() => handleMove(item.idContent, "down")}
                      >
                        <i className="bi bi-caret-down-fill" />
                      </Button>
                    </div>
                  </div>
                </Form.Group>
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
          onClick={() => {goBackNavigation()}}
        >
          Cancel
        </Button>
      </footer>
    </>
  );
}

function ContentForm(props) {
  const item = props.item;

  let t = "flex-grow-1 me-3";

  if (item.type === "header") {
    t = "heading2" + t;
  } else if (item.type === "image") {
    return (
      <>
        <div>
          <Form.Label>
            <b>{item.type}:</b>
          </Form.Label>
          <div key={item.idContent} className={t}>
            <Image
              src={"http://localhost:3000/static/images/" + item.content}
              alt="Image"
              fluid
            />
          </div>
        </div>
      </>
    );
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
            el.idContent === item.idContent ? { ...el, content: event.target.value } : el
          );
          props.setLContent(updatedLContent);
        }}
      />
      </FloatingLabel>
    </>
  );
}

export default WebPageForm;
