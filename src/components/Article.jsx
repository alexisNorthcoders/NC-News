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
  const { navigation, setNavigation } = useContext(NavContext);
  const navigate = useNavigate();
  useEffect(() => {
    setNavigation((current) => {
      return { ...current, header: "article" };
    });
    fetchArticleById(article_id).then((article) => {
      setArticle(article);
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
          <Card.Img variant="top" src={article.article_img_url} />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>{article.body}</Card.Text>
            <Card.Footer>
              {article.votes} | Comments | {article.author} |{" "}
              {timeDifference(article.created_at)}
            </Card.Footer>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
