import React, { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import {
  Container,
  Col,
  Navbar,
  Row,
  Button,
  Spinner,
  Image,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import timeDifference from "../utils/utils";
import { NavContext } from "./NavHandler";
import { deleteCommentById } from "../utils/api";

export default function Comment({
  comment,
  thumbsCounter,
  handleVotesUp,
  handleVotesDown,
}) {
  const { navigation, setNavigation } = useContext(NavContext);
  const [buttonState, setButtonState] = useState({
    hover: false,
    clicked: false,
  });
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [commentCardType, setCommentCardType] = useState("");


  function handleClickTrashCan() {
    setButtonState({ ...buttonState, clicked: true });
    deleteCommentById(comment.comment_id).then(() => {
      
      setShow(true);
      setCommentCardType("danger")
    })
    .catch(({response})=>{
        console.log(response)
        setButtonState({ ...buttonState, clicked: false });
        setErrorMessage(`${response.data.message}`)
        setShowError(true)
    });
  }
  function handleClose(){
    if (show){
      setShow(false)
     /*  setNavigation((current) => {
        return { ...current, header: "article" };
      });
      navigate(`/article/${navigation.article_id}`) */
    }
    else if (showError){
      setShowError(false)
    }
  }

  return (<>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comment deleted</Modal.Title>
        </Modal.Header>
        <Modal.Body>You successfully deleted your comment!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showError} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Oops, some error occurred. {errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    <Card bg={commentCardType} className="m-1 comments">
      <Card.Title>{comment.author}</Card.Title>
      <Card.Text>{comment.body}</Card.Text>
      <Card.Footer className="fs-6 d-flex justify-content-between align-items-center">
        <span>
          <Button
            variant=""
            className="thumbs"
            onClick={handleVotesUp}
            disabled={thumbsCounter === 1}
          >
            <Image
              src="../../src/assets/hand-thumbs-up.svg"
              alt="thumbs up icon"
              fluid
            />
          </Button>
          <span
            className={
              thumbsCounter === 1
                ? "thumbs-up"
                : thumbsCounter === -1
                ? "thumbs-down"
                : null
            }
          >
            {comment.votes}
          </span>
          <Button
            variant=""
            onClick={handleVotesDown}
            className="thumbs"
            disabled={thumbsCounter === -1}
          >
            <Image
              src="../../src/assets/hand-thumbs-down.svg"
              alt="thumbs down icon"
              fluid
            />
          </Button>
        </span>
        <span>{timeDifference(comment.created_at)}</span>
        <span>
          <Button
            aria-label="remove comment button"
            variant=""
            hidden={
              buttonState.clicked || !(navigation.username === comment.author)
            }
          ><FontAwesomeIcon
              hidden={
                buttonState.clicked || !(navigation.username === comment.author)
              }
              onMouseEnter={() => {
                setButtonState({ ...buttonState, hover: true });
              }}
              onMouseLeave={() => {
                setButtonState({ ...buttonState, hover: false });
              }}
              onMouseDownCapture={(event) => {
                if (event.button === 0) {
                  handleClickTrashCan();
                }
              }}
              beat={buttonState.hover}
              icon={faTrashCan}
              size="2x"
              color="red"
            />
          </Button>
        </span>
      </Card.Footer>
    </Card>
    </> );
}
