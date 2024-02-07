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
import PostComment from "./PostComment";
import Comment from "./Comment";


export default function Article({ setPostButtonClicked, postButtonClicked }) {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbsCounter, setThumbsCounter] = useState(0);
  const [successComment, setSuccessComment] = useState(false);


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
    if (successComment) {
      fetchCommentsByArticleId(article_id).then((comments) => {
        console.log("fetching comments after posting...");

        setComments(comments);
      });
    }
  }, [successComment]);
  useEffect(() => {
    setNavigation((current) => {
      return { ...current, header: "article", article_id: article_id };
    });
    setIsLoading(true);
    fetchArticleById(article_id).then((article) => {
      setArticle(article);
      fetchCommentsByArticleId(article.article_id).then((comments) => {
        console.log("fetching comments after fetching article...");
        setComments(comments);
        setIsLoading(false);
      });
    });
  }, []);
  if (navigation.header === "postcomment") {
    return (
      <PostComment
        setSuccessComment={setSuccessComment}
        article={article}
        setArticle={setArticle}
        setPostButtonClicked={setPostButtonClicked}
        postButtonClicked={postButtonClicked}
      />
    );
  }
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
                  {showComment? "Hide":"Show"} Comments ({article.comment_count}) </Button>
                <span>{timeDifference(article.created_at)}</span>
              </Card.Footer>
            </Card.Body>
          </Card>
        )}
        {showComment ? (
          <Col>
            {comments.map((comment, index) => {
              return (<Comment key={`${comment.comment_id}`}comment={comment}/>);
            })}
          </Col>
        ) : null}
      </Container>
    </>
  );
}
