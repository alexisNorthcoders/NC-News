import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import timeDifference from "../utils/utils";
export default function Articles() {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    fetchArticles().then(({ data: { articles } }) => {
      setArticleList(articles);
    });
  }, []);

  return (
    <Row xs={1} className="g-3 pt-2 mt-5">
      {articleList.map((article, index) => (
        <Col key={`${index}${article.title}`}>
          <Card >
          <Card.Text className="mb-0 mt-1 topic">Topic: {article.topic}</Card.Text>
          
            <Card.Title>{article.title}</Card.Title>

            <Card.Body>
              <Card.Img
                variant="top"
                src={article.article_img_url}
          
              />

              <Card.Footer>
                <Card.Text>{article.votes} | Comments {article.comment_count} |  {timeDifference(article.created_at)}</Card.Text>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
