import { useContext, useEffect, useState } from "react";
import { NavContext } from "./NavHandler";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Card, Modal, Button,Col,Spinner,Row } from "react-bootstrap";
import { fetchArticleById, insertCommentByArticleId } from "../utils/api";

export default function PostComment({
  article,
  postButtonClicked,
  setPostButtonClicked,
  setSuccessComment,
  setShowComment,
}) {
  const { navigation, setNavigation } = useContext(NavContext);
  const { article_id } = useParams();
  const [newArticle, setNewArticle] = useState({});
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleClose(){
    if (show){
      setShow(false)
      setNavigation((current) => {
        return { ...current, header: "article" };
      });
      navigate(`/article/${navigation.article_id}`)
      setShowComment(true)
      
    }
    else if (showError){
      setShowError(false)
    }
  }


  if (article) {
    const newUrl = `/article/${article_id}/comment`;
    window.history.replaceState({}, "", newUrl);
  }
  useEffect(() => {
    if (postButtonClicked) {
      if (!comment) {
        setErrorMessage("Comment is empty.")
        setShowError(true)

        setPostButtonClicked(false)
      }
      else if (!navigation.username){
        setErrorMessage("Username not found. You need be logged in to post a comment.")
        setShowError(true)

        setPostButtonClicked(false)
      }
      else{
      setIsLoading(true)
      insertCommentByArticleId(article_id, navigation.username, comment)
        .then(() => {
          setPostButtonClicked(false);
          setIsLoading(false)
          setShow(true);
          setSuccessComment(true)
         })
        .catch(({response}) => {
          
          setErrorMessage(response.data.message);

          setShowError(true);
          setPostButtonClicked(false);
        });
    }}
    if (!article) {
      fetchArticleById(article_id).then((data) => {
        setNavigation((current) => ({
          ...current,
          header: "postcomment",
          article_id: article_id,
        }));
        setNewArticle(data);
      });
    }
  }, [postButtonClicked]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comment posted</Modal.Title>
        </Modal.Header>
        <Modal.Body>You successfully posted your comment!</Modal.Body>
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
      <Card className="article-comment pt-0 mt-0 article " style={{backgroundColor:"lightblue"}}>
        <Card.Body><Card.Title className="fs-3">{article ? article.title : newArticle.title}</Card.Title>
          <Card.Text className="fs-5 ">
            {article ? article.body : newArticle.body}
          </Card.Text>
        </Card.Body>
      </Card>
      {isLoading ? (
          <Col>
            <Row>
              <h1>Posting Comment...</h1>
              <Row className="justify-content-center">
                <Spinner animation="border" variant="primary" role="status">
                  <span className="visually-hidden">Posting comment state</span>
                </Spinner>
              </Row>
            </Row>
          </Col>
        ) : (
      <Form id="postComment">
        <Form.Label className="fs-1" htmlFor="comment">
          Write Comment
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Your comment or reaction"
          id="comment"
          aria-describedby="comment body"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <Form.Text id="commentHelp" muted>
          Be civil.
        </Form.Text>
      </Form>)}
    </>
  );
}
