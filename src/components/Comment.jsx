import React, { useState } from 'react';
import Card from "react-bootstrap/Card";
import {
    Container,
    Col,
    Navbar,
    Row,
    Button,
    Spinner,
    Image,
  } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import timeDifference from '../utils/utils';

export default function Comment({ comment, thumbsCounter, handleVotesUp, handleVotesDown }) {
    const [buttonState, setButtonState] = useState({
        hover: false,
        clicked: false
      });

  return (
    <Card className="m-1 comments">
      <Card.Title>{comment.author}</Card.Title>
      <Card.Text>{comment.body}</Card.Text>
      <Card.Footer className="fs-6 d-flex justify-content-between align-items-center">
      <span>
                      <Button
                        variant="light"
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
                        variant="light"
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
          <Button variant="" >
          <FontAwesomeIcon
                        hidden={buttonState.clicked}
                        onMouseEnter={() => {
                          setButtonState({ ...buttonState, hover: true });
                        }}
                        onMouseLeave={() => {
                          setButtonState({ ...buttonState, hover: false });
                        }}
                        onMouseDownCapture={() => {
                          setButtonState({ ...buttonState, clicked: true });
                        }}
                        beat={buttonState.hover}
                          aria-label="remove comment button"
                          icon={faTrashCan}
                          size="lg"
                          color="red"
                        />
          </Button>
        </span>
      </Card.Footer>
    </Card>
  );
}