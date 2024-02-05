import { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { fetchCommentsByArticleId } from "../utils/api";
import { Container, Col, Navbar, Row, Button } from "react-bootstrap";
import timeDifference from "../utils/utils";
import { NavContext } from "./NavHandler";

export default function Article({ article,setArticleClicked }) {
  const [comments, setComments] = useState([]);
  const {navigation, setNavigation} = useContext(NavContext);
  useEffect(() => {
    setNavigation((current) => {
        return { ...current, header: "article" };
      });
    fetchCommentsByArticleId(article.article_id).then((comments) => {
      setComments(comments);
    });
  }, []);
  return (<>
    <Navbar className="bg-body-tertiary justify-content-between fixed-top">
        <Container>
         <Row>
          <Col onClick={() => {
            return 
          }}>Insert Comment</Col>
          <Col><Button onClick={() => {
            setArticleClicked(false)
            setNavigation((current) => {
                return { ...current, header: "home" };
              })
          } } variant="danger">X</Button></Col>
         </Row>
        </Container>
      </Navbar>
      <Container>
    <Card className="g-3 pt-2 mt-5 article">
      <Card.Img variant="top" src={article.article_img_url} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.body}</Card.Text>
        <Card.Footer>{article.votes} | Comments | {article.author} | {timeDifference(article.created_at)}</Card.Footer>
      </Card.Body>
      </Card>
      <Col>
        {comments.map((comment, index) => {
          return (
            <Card className="comments" key={`${index}+${comment.created_at}`}>
              <Card.Title
                
                key={`${index}+${comment.created_at}`}
              >
                {comment.author}
              </Card.Title>
              <Card.Text>{comment.body}</Card.Text>
              <Card.Footer>{comment.votes} | {timeDifference(comment.created_at)}</Card.Footer>
              </Card>
          );
        })
        }</Col>
     </Container>
     </>
  );
}
