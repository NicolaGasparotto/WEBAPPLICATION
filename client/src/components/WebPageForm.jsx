import dayjs from "dayjs";

import { useEffect, useState, useContext } from "react";
import { Form, Button, Container, FormLabel } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import { UserContext } from "./UserContext";

import { Modal, Image, FloatingLabel } from "react-bootstrap";

import { getContents, checkAuthor } from "../API";
import { ImagesModal } from "./ImagesModal";

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
  
  /* Setting values for the form page*/
  const [title, setTitle] = useState(webPage ? webPage.title : " ");
  const [author, setAuthor] = useState(webPage ? webPage.author : user.name);
  const [publicationDate, setPublicationDate] = useState(
    webPage && webPage.publicationDate !== null
      ? dayjs(webPage.publicationDate).format("YYYY-MM-DD")
      : null
  );
  const creationDate = webPage
    ? webPage.creationDate
    : dayjs().format("YYYY-MM-DD");

  const [errMsg, setErrMsg] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [ waiting, setWaiting ] = useState(false);

  function goBackNavigation(newPage) {
    const page = location.state;
    setWaiting(false);
    if (page && page.nextpage) {
      if (newPage) {
        navigate(page.nextpage, {
          state: { ...newPage },
        });
      } else {
        navigate(page.nextpage, {
          state: {
            idPage: page.idPage,
            title: title,
            author: author,
            publicationDate: page.publicationDate,
            creationDate: page.creationDate,
          },
        });
      }
    } else navigate("/");
  }

  /* The action is different if is an AddNewPage or EditPage*/
  const handleSubmit = (event) => {
    event.preventDefault();
    setWaiting(true);

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
        const newPage = {
          idPage: webPage ? webPage.idPage : undefined,
          title: title,
          author: author,
          publicationDate: publicationDate,
          creationDate: creationDate,
          lContents: lContent,
        };

        // Update the values inside the server
        // before committing the changes is mandatory to check the correctness of the author name
        if (author === user.name || (webPage && author === webPage.author)) {
          submit(newPage);
        } else {
          checkAuthor(author)
            .then(() => {
              submit(newPage);
            })
            .catch(() => {
              setErrMsg(
                "Please, insert a valid author name. The correct format is: Name Surname with only one blankspace between them."
              );
              setWaiting(false);
            });
        }
      } else {
        setErrMsg(
          "Please, fill all the fields of the form.\nThe only empty field allowed is the publication date"
        );
        setWaiting(false);
      }
    } else {
      setErrMsg("Please, add at least one header and one image or paragraph");
      setWaiting(false);
    }
  };

  const submit = (pageInfo) => {
    props
      .submitUpdates(pageInfo)
      .then(() => {
        setErrMsg("");
        // Navigate back to the previous page
        goBackNavigation(pageInfo);
      })
      .catch((err) => {
        setErrMsg(err.message);
      });
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
      content: "",
    };
    setLContent((prevContent) => [...prevContent, newHeaderItem]);
  };

  const handleAddParagraph = () => {
    const newId = lContent.length
      ? Math.max(...lContent.map((item) => item.idContent)) + 1
      : 1;

    const newParagraphItem = {
      idContent: newId,
      idPage: webPage ? webPage.idPage : undefined,
      type: "paragraph",
      content: "",
    };
    setLContent((prevContent) => [...prevContent, newParagraphItem]);
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
            <Form.Label>Published by </Form.Label>{" "}
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
          
          <Form.Group controlId="webpageDate" className="mb-5">
            <Form.Label className='fw-light'>Publication date</Form.Label>
            <Form.Control value={publicationDate || ""} type="date" name="date"  placeholder="Enter date" 
              
              min={dayjs().format("YYYY-MM-DD")}
              onKeyDown={(event) => {event.preventDefault()}}
              onChange={(event)=>{
                const selectedDate = dayjs(event.target.value);
                if (
                  selectedDate &&
                  (selectedDate.isSame(creationDate) ||
                    selectedDate.isAfter(creationDate))
                )
                  setPublicationDate(selectedDate.format("YYYY-MM-DD"));
                else setPublicationDate(null);
                }} />
          </Form.Group>

          {/** CONTENTS FORMS */}
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
                  {lContent.length > 1 && (
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
                  )}
                </div>
              </Form.Group>
            );
          })}

        </Form>
      </Container>
      
      {/** NEW ELEMENTS BUTTONS */}
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
      
      {/** POPUP WINDOWS TO CHOOSE IMAGES */}
      <ImagesModal lContent={lContent} setLContent={setLContent} 
                   showImageModal={showImageModal} setShowImageModal={setShowImageModal} idPage={webPage ? webPage.idPage : undefined}/>

      {/** SAVE AND CANCEL BUTTONS */}
      <footer className="footerWebPage">
        <Button
          disabled={waiting}
          className="newPageButton"
          style={{ width: "150px" }}
          onClick={(event) => handleSubmit(event)}
          type="submit"
        >
          Save
        </Button>
        <Button
          disabled={waiting}
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

/** Function to visualize the image or the text form for the corresponding content type*/
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
