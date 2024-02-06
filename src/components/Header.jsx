import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useContext } from "react";
import { NavContext } from "./NavHandler";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const {navigation, setNavigation} = useContext(NavContext);
  const navigate = useNavigate();

  if (navigation.header === "home"){
    return (
      <Navbar className="bg-body-tertiary justify-content-between fixed-top">
        <Container>
          <Form>
            <Row>
              <Col>
                <Form.Control type="text" placeholder="Search" />
              </Col>
              <Col xs={1}>
                <Button type="submit">S</Button>
              </Col>
              <Col>
                <img
                  id="avatar"
                  href="#profile"
                  src="../../src/assets/avatar.png"
                  width="50px"
                  alt="avatar image"
                />
                <br />
                <a href="#profile">username</a>
              </Col>
            </Row>
          </Form>
        </Container>
      </Navbar>
    );
  }
  else if (navigation.header === "article"){
    return (
      <Navbar className="bg-body-tertiary justify-content-between fixed-top">
        <Container>
          <Row>
            <Col><Button onClick={() => {
                  navigate(`/article/${navigation.article_id}/comment`);
                  setNavigation((current) => {
                    return { ...current, header: "postcomment" };
                  });
                }} variant="success">Add Comment</Button>
              
            </Col>
            <Col>
              <Button
                onClick={() => {
                  navigate("/");
                  setNavigation((current) => {
                    return { ...current, header: "home" };
                  });
                }}
                variant="primary"
              >
                Home
              </Button>
            </Col>
            <Col>
                <img
                  id="avatar"
                  src="../../src/assets/avatar.png"
                  width="50px"
                  alt="avatar image"
                />
                <br />
                <a href="#profile">username</a>
              </Col>
          </Row>
        </Container>
      </Navbar>
    );
  }
  else if (navigation.header === "postcomment"){
    return (
      <Navbar className="bg-body-tertiary justify-content-between fixed-top">
        <Container>
          <Row>
            <Col><Button onClick={() => {
              setNavigation((current) => {
                return { ...current, header: "postcomment" };
              });
              navigate(`/article/${navigation.article_id}/comment`); 
            } }variant="success">Post</Button>
              
            </Col>
            <Col>
              <Button
                onClick={() => {
                  setNavigation((current) => {
                    return { ...current, header: "article" };
                  });
                  navigate(`/article/${navigation.article_id}`);
                
                }}
                variant="danger"
              >
                Cancel
              </Button>
            </Col>
            <Col>
                <img
                  id="avatar"
                  src="../../src/assets/avatar.png"
                  width="50px"
                  alt="avatar image"
                />
                <br />
                <a href="#profile">username</a>
              </Col>
          </Row>
        </Container>
      </Navbar>
    );
  }

}
