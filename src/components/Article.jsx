import { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import {
  fetchArticleById,
  fetchCommentsByArticleId,
  updateVotesByArticleId,
} from "../utils/api";
import {
  Container,
  Col,
  Navbar,
  Row,
  Button,
  Spinner,
  Image,
} from "react-bootstrap";
import timeDifference from "../utils/utils";
import { NavContext } from "./NavHandler";
import { useParams, useNavigate } from "react-router-dom";

export default function Article() {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbsCounter, setThumbsCounter] = useState(0);

  const { navigation, setNavigation } = useContext(NavContext);
  const navigate = useNavigate();

  function handleShowCommentsClick() {
    setShowComment((currentShow) => !currentShow);
  }
  function handleVotesUp() {
    setThumbsCounter((counter) => counter + 1);
    updateVotesByArticleId(article_id, 1).catch((err) => {
      setThumbsCounter((counter) => counter - 1);
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: prevArticle.votes - 1,
      }));
    });
    setArticle((prevArticle) => ({
      ...prevArticle,
      votes: prevArticle.votes + 1,
    }));
  }
  function handleVotesDown() {
    setThumbsCounter((counter) => counter - 1);
    updateVotesByArticleId(article_id, -1).catch((err) => {
      setThumbsCounter((counter) => counter + 1);
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: prevArticle.votes + 1,
      }));
    });
    setArticle((prevArticle) => ({
      ...prevArticle,
      votes: prevArticle.votes - 1,
    }));
  }

  useEffect(() => {
    setNavigation((current) => {
      return { ...current, header: "article", article_id: article_id };
    });
    setIsLoading(true);
    fetchArticleById(article_id).then((article) => {
      setArticle(article);
      fetchCommentsByArticleId(article.article_id).then((comments) => {
        setComments(comments);
        setIsLoading(false);
      });
    });
  }, []);

  
  return (
    <>
      <Container>
        {isLoading ? (
          <Col>
            <Row>
              <h1>Loading article...</h1>
              <Row className="justify-content-center">
                <Spinner animation="border" variant="primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </Row>
            </Row>
          </Col>
        ) : (
          <Card className="g-1 pt-0 mt-5 article ">
            <Card.Title className="fs-1 mt-4 ">{article.title}</Card.Title>
            <Card.Img variant="top" src={article.article_img_url} />
            <Card.Body>
              <Card.Header className="fs-5 ">{article.author}</Card.Header>
              <Card.Text className="fs-4">{article.body}</Card.Text>
              <Card.Footer className="fs-4 d-flex justify-content-between align-items-center">
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
                    {article.votes}
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
                <Button
                  className="fs-4"
                  variant="light"
                  onClick={handleShowCommentsClick}
                >
                  {comments.length} Comments
                </Button>
                <span>{timeDifference(article.created_at)}</span>
              </Card.Footer>
            </Card.Body>
          </Card>
        )}
        {showComment ? (
          <Col>
            {comments.map((comment, index) => {
              return (
                <Card
                  className="m-1 comments"
                  key={`${index}+${comment.created_at}`}
                >
                  <Card.Title key={`${index}+${comment.created_at}`}>
                    {comment.author}
                  </Card.Title>
                  <Card.Text>{comment.body}</Card.Text>
                  <Card.Footer>
                    {comment.votes} | {timeDifference(comment.created_at)}
                  </Card.Footer>
                </Card>
              );
            })}
          </Col>
        ) : null}
      </Container>
    </>
  );
}
