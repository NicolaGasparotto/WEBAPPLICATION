import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { Form, Button, Container, FormLabel } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import { UserContext } from "./UserContext";
import { useContext } from "react";

import {
  Modal,
  Row,
  Col,
  Image,
  Figure,
  Alert,
  FloatingLabel,
} from "react-bootstrap";

import { getContents, getAvailableImages } from "../API";

function WebPageForm(props) {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  /* Retrieving the information */
  let webPage = undefined;
  if (location.state) {
    webPage = { ...location.state };
  }

  const [lContent, setLContent] = useState([]);
  useEffect(() => {
    if (webPage) {
      getContents(webPage.idPage).then((list) => {
        setLContent(list);
      });
    }
  }, []);

  const [showImageError, setShowImageError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  /* Setting values for the form page*/
  const [title, setTitle] = useState(webPage ? webPage.title : " ");
  const [author, setAuthor] = useState(webPage ? webPage.author : user.name);
  const [publicationDate, setPublicationDate] = useState(
    webPage && webPage.publicationDate
      ? dayjs(webPage.publicationDate).format("YYYY-MM-DD")
      : undefined
  );

  const creationDate = webPage
    ? webPage.creationDate
    : dayjs().format("YYYY-MM-DD");

  const [newHeader, setNewHeader] = useState("");
  const [newParagraph, setNewParagraph] = useState("");

  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    getAvailableImages().then((list) => {
      setImageList(list);
    });
  }, []);

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
      if (
        title.trim() !== "" &&
        author.trim() !== "" &&
        lContent.filter((item) => item.content.trim() === "").length === 0
      ) {
        // Update the values in the server
        props.submitUpdates({
          idPage: webPage ? webPage.idPage : undefined,
          title: title,
          author: author,
          publicationDate: publicationDate,
          creationDate: creationDate,
          lContents: lContent,
        });
        setErrMsg("");
        // Navigate back to the previous page
        goBackNavigation();
      } else {
        setErrMsg(
          "Please, fill all the fields of the form.\nThe only empty field allowed is the publication date"
        );
      }
    } else {
      setErrMsg("Please, add at least one header and one image or paragraph");
    }
  };

  const handleDelete = (id) => {
    const updatedLContent = lContent.filter((item) => item.idContent !== id);
    setLContent(updatedLContent);
  };

  const handleAddHeader = () => {
    const newId = lContent.length
      ? Math.max(...lContent.map((item) => item.idContent)) + 1
      : 1;

    const newHeaderItem = {
      idContent: newId,
      idPage: webPage ? webPage.idPage : undefined,
      type: "header",
      content: newHeader,
    };
    setLContent((prevContent) => [...prevContent, newHeaderItem]);
    setNewHeader("");
  };

  const handleAddParagraph = () => {
    const newId = lContent.length
      ? Math.max(...lContent.map((item) => item.idContent)) + 1
      : 1;

    const newParagraphItem = {
      idContent: newId,
      idPage: webPage ? webPage.idPage : undefined,
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

    let newId = lContent.length
      ? Math.max(...lContent.map((item) => item.idContent))
      : 0;
    for (const selectedImage of selectedImages) {
      newId += 1;
      const newImageItem = {
        idContent: newId,
        idPage: webPage ? webPage.idPage : undefined,
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
      <Container className="justify-content-center col-sm-11 col-md-8 col-lg-7 col-xl-5 col-xxl-6">
        <Modal
          show={errMsg ? true : false}
          onHide={() => {
            setErrMsg("");
          }}
          id="myModal"
        >
          <Modal.Header closeButton>ERROR!</Modal.Header>
          <Modal.Body>{errMsg}</Modal.Body>
        </Modal>

        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            label="Page Title"
            htmlFor="title"
            style={{ fontWeight: "500", color: "grey", paddingTop: "10px" }}
          >
            <Form.Group className="mb-3">
              <Form.Control
                className="title"
                style={{ paddingTop: "10px" }}
                id="title"
                as="textarea"
                required={true}
                value={title}
                placeholder={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
          </FloatingLabel>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="author">Published by </Form.Label>{" "}
            {user.admin ? (
              <Form.Control
                className="subtitle"
                type="text"
                id="author"
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
            <Form.Label>Publication date</Form.Label>
            {/* publicationDate is an optional parameter. It have to be properly rendered only if available. */}
            <Form.Control
              type="date"
              value={publicationDate ?? ""}
              onChange={(event) => {
                const selectedDate = event.target.value;
                if (selectedDate && (dayjs(selectedDate).isSame(creationDate) || dayjs(selectedDate).isAfter(creationDate)))
                  setPublicationDate(selectedDate);
                else setPublicationDate("");
              }}
              min={dayjs(creationDate).format("YYYY-MM-DD")}
            />
          </Form.Group>

          {lContent.map((item) => {
            return (
              <Form.Group key={item.idContent} className="mb-4">
                <div className="d-flex align-items-center">
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
                  { lContent.length > 1 &&
                  <div style={{ display: "flex", flexDirection: "column" }}>
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
                  }
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
                    <Figure className="figureBlock" >
                      <Figure.Image
                        width={171}
                        height={180}
                        src={
                          "http://localhost:3000/static/images/" +
                          image.filename
                        }
                        alt={image.name}
                        onClick={() => {
                          if(selectedImages.includes(image)){
                            setSelectedImages((prevImages) => prevImages.filter((img) => img.id !== image.id));
                          }else{
                            setSelectedImages((prevImages) => [
                              ...prevImages,
                              image,
                            ]);
                          }
                        }}
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

      <footer className="footerWebPage">
        <Button
          className="newPageButton"
          style={{ width: "150px" }}
          onClick={(event) => handleSubmit(event)}
          type="submit"
        >
          Save
        </Button>
        <Button
          className="deleteButton"
          style={{ border: "2px solid red" }}
          onClick={() => {
            goBackNavigation();
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

  if (item.type === "image") {
    return (
      <>
        <div>
          <b>{item.type}:</b>
          <div className="flex-grow-1 me-3 mt-2">
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
        label={item.type + ":"}
        style={{ fontWeight: "500" }}
        className="flex-grow-1 me-3"
      >
        <Form.Control  
          as="textarea"
          style={{ height: "250px", paddingTop: "35px" }}
          className={item.type === "header" ? "heading2" : ""}
          value={item.content}
          onChange={(event) => {
            const updatedLContent = props.lContent.map((el) =>
              el.idContent === item.idContent
                ? { ...el, content: event.target.value }
                : el
            );
            props.setLContent(updatedLContent);
          }}
        />
      </FloatingLabel>
    </>
  );
}

export default WebPageForm;
