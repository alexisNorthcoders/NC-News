import { useContext, useEffect, useState } from "react";
import { NavContext } from "./NavHandler";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Card,
  Modal,
  Button,
  Col,
  Spinner,
  Row,
  Container,
} from "react-bootstrap";
import {
  fetchArticleById,
  insertArticle,
  insertCommentByArticleId,
} from "../utils/api";

export default function PostArticle() {
  const { navigation, setNavigation } = useContext(NavContext);

  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitArticle, setSubmitArticle] = useState({});
  const navigate = useNavigate();

  function handleClose() {
    if (show) {
      setShow(false);
      setNavigation((current) => {
        return { ...current, header: "article" };
      });
      navigate(`/article/${navigation.article_id}`);
      setShowComment(true);
    } else if (showError) {
      setShowError(false);
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(submitArticle)
    if (!navigation.username){
        setErrorMessage("You need to be logged in.")
        setShowError(true)
    }
    else{
   
    setSubmitArticle((current) => ({ ...current, author: navigation.username }))
    insertArticle(submitArticle).then((article) => console.log(article));
}

   
  }
  useEffect(() => {
    setNavigation((current) => ({ ...current, header: "" }));
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Article posted</Modal.Title>
        </Modal.Header>
        <Modal.Body>You successfully posted your article!</Modal.Body>
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

      {isLoading ? (
        <Col>
          <Row>
            <h1>Posting Article...</h1>
            <Row className="justify-content-center">
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Posting article state</span>
              </Spinner>
            </Row>
          </Row>
        </Col>
      ) : (
        <Container style={{ width: "100vw" }}>
          <Col style={{ width: "90%" }} className="justify-content-center">
            {" "}
            <Row className="justify-content-center">
              <Form onSubmit={handleSubmit} className="fs-4" id="postArticle">
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Title"
                  id="title"
                  aria-describedby="article title"
                  onChange={(event) => {
                    setSubmitArticle((current) => ({ ...current, title: event.target.value }))}}
                />
                <Form.Label htmlFor="topic">Topic</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Topic"
                  id="topic"
                  aria-describedby="article topic"
                  onChange={(event) => {
                    setSubmitArticle((current) => ({ ...current, topic: event.target.value }))}}
                  
                />
                <Form.Label htmlFor="body">Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Your Article Content"
                  id="body"
                  aria-describedby="article body"
                  onChange={(event) => {
                    setSubmitArticle((current) => ({ ...current, body: event.target.value }))}}
                />
                <Form.Label htmlFor="article_img_url">Image URL</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Image URL"
                  id="article_img_url"
                  aria-describedby="article url"
                  onChange={(event) => {
                    setSubmitArticle((current) => ({ ...current, article_img_url: event.target.value }))}}
                />
                <Button variant="success" type="submit">Send</Button>
              </Form>
            </Row>
          </Col>
        </Container>
      )}
    </>
  );
}
