import { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { fetchArticleById, fetchCommentsByArticleId } from "../utils/api";
import { Container, Col, Navbar, Row, Button } from "react-bootstrap";
import timeDifference from "../utils/utils";
import { NavContext } from "./NavHandler";
import { useParams, useNavigate } from "react-router-dom";

export default function Article() {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [showComment, setShowComment] = useState(false);

  const { navigation, setNavigation } = useContext(NavContext);
  const navigate = useNavigate();
  function handleShowCommentsClick() {
    setShowComment((currentShow) => !currentShow);
  }
  useEffect(() => {
    setNavigation((current) => {
      return { ...current, header: "article" };
    });
    fetchArticleById(article_id).then((article) => {
      setArticle(article);
      fetchCommentsByArticleId(article.article_id).then((comments) => {
        setComments(comments);
      });
    });
  }, []);
  return (
    <>
      <Navbar className="bg-body-tertiary justify-content-between fixed-top">
        <Container>
          <Row>
            <Col
              onClick={() => {
                return;
              }}
            >
              Insert Comment
            </Col>
            <Col>
              <Button
                onClick={() => {
                  navigate("/");
                  setNavigation((current) => {
                    return { ...current, header: "home" };
                  });
                }}
                variant="danger"
              >
                X
              </Button>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <Container>
        <Card className="g-3 pt-2 mt-5 article">
          <Card.Title>{article.title}</Card.Title>
          <Card.Img variant="top" src={article.article_img_url} />
          <Card.Body>
          <Card.Header className="fs-5 ">{article.author}</Card.Header>
            <Card.Text className="fs-4">{article.body}</Card.Text>
            <Card.Footer className="fs-4 d-flex justify-content-between">
             <span> Votes: {article.votes}</span>
              <Button className="fs-4"variant="light" onClick={handleShowCommentsClick}>
                {comments.length} Comments
              </Button>
            <span>{timeDifference(article.created_at)}</span>
            </Card.Footer>
          </Card.Body>
        </Card>
        {showComment ? (
          <Col>
            {comments.map((comment, index) => {
              return (
                <Card
                  className="comments" key={`${index}+${comment.created_at}`}
                >
                  <Card.Title key={`${index}+${comment.created_at}`}>
                    {comment.author}
                  </Card.Title>
                  <Card.Text>{comment.body}</Card.Text>
                  <Card.Footer > 
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
