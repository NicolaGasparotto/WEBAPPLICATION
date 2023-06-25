import { useState, useEffect } from "react";
import { Form, Modal, Row, Col, Figure, Alert, Button } from "react-bootstrap";

import { getAvailableImages } from "../API";

function ImagesModal(props) {
  const lContent = props.lContent;
  const setLContent = props.setLContent;
  const showImageModal = props.showImageModal;
  const setShowImageModal = props.setShowImageModal;

  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    getAvailableImages().then((list) => {
      setImageList(list);
    });
  }, []);

  const [selectedImages, setSelectedImages] = useState([]);
  const [showImageError, setShowImageError] = useState(false);

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
        idPage: props.idPage,
        type: "image",
        content: selectedImage.filename,
      };
      setLContent((prevContent) => [...prevContent, newImageItem]);
      
    }

    setShowImageError(false);
    setShowImageModal(false);
    setSelectedImages([]);
  };

  const handleModalClose = () => {
    setSelectedImages([]);
    setShowImageError(false);
    setShowImageModal(false);
  };

  return (
    <>
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
                        onClick={() => {
                          if (selectedImages.includes(image)) {
                            setSelectedImages((prevImages) =>
                              prevImages.filter((img) => img.id !== image.id)
                            );
                          } else {
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
    </>
  );
}

export { ImagesModal };
