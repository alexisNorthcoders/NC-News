import { useEffect, useState ,useContext} from "react";
import { fetchArticles } from "../utils/api";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import timeDifference from "../utils/utils";
import Article from "./Article";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { NavContext } from "./NavHandler";

export default function Articles({selectedTopic}) {
  const [articleList, setArticleList] = useState([]);
  const [articleClicked, setArticleClicked] = useState(false);
  const { navigation, setNavigation } = useContext(NavContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  function handleArticleClick(article_id) {
    navigate(`/article/${article_id}`);
    setArticleClicked(true);
  }
  useEffect(() => {
    setIsLoading(true)
    fetchArticles(selectedTopic).then(({ data: { articles } }) => {
      setIsLoading(false)
      setArticleList(articles);
    });
  }, [selectedTopic]);
  if (articleClicked || navigation.header === "article") {
    return (
      <Routes>
        <Route path={`/article/:article_id/`} element={<Article />} />
      </Routes>
    );
  } else if (!articleClicked || navigation.header === "home") {
    return (<> {isLoading ? (
      <Col>
        <Row>
          <h1>Loading articles...</h1>
          <Row className="justify-content-center">
            <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Row>
        </Row>
      </Col>
    ):
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
      </Row>}</>
    );
  }
}
