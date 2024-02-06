import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import timeDifference from "../utils/utils";
import Article from "./Article";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

export default function Articles() {
  const params = useParams();
  const [articleList, setArticleList] = useState([]);
  const [articleClicked, setArticleClicked] = useState(false);
  const navigate = useNavigate();
  console.log(params);
  function handleArticleClick(article_id) {
    navigate(`/article/${article_id}`);
    setArticleClicked(true);
  }
  useEffect(() => {
    fetchArticles().then(({ data: { articles } }) => {
      setArticleList(articles);
    });
  }, []);
  if (articleClicked) {
    return (
      <Routes>
        <Route path={`/article/:article_id`} element={<Article />} />
      </Routes>
    );
  } else if (!articleClicked) {
    return (
      <Row xs={1} className="g-3 pt-2 mt-5">
        {articleList.map((article, index) => (
          <Col
            onClick={() => {
              handleArticleClick(article.article_id);
            }}
            key={`${index}${article.title}`}
          >
            <Card>
              <Card.Text className="mb-0 mt-1 topic">
                Topic: {article.topic}
              </Card.Text>
              <Card.Title>{article.title}</Card.Title>
              <Card.Body>
                <Card.Img variant="top" src={article.article_img_url} />
                <Card.Footer>
                  <Card.Text>
                    {article.votes} | Comments {article.comment_count} |{" "}
                    {timeDifference(article.created_at)}
                  </Card.Text>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}
