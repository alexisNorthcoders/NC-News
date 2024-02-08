import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useContext, useState } from "react";
import { NavContext } from "./NavHandler";
import { useNavigate } from "react-router-dom";
import Topics from "./Topics";

export default function Header({ onSubmitForm }) {
 
  const [topic,setTopic] = useState("")
  const {navigation, setNavigation} = useContext(NavContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log("clicked button on header")
    onSubmitForm();
  };

  if (navigation.header === "home"){
    return (
      <Navbar className="bg-body-tertiary justify-content-between fixed-top">
        <Container>
          
          <Form>
            <Row> <Col>
            <Topics/></Col>
              <Col>
                <Form.Control type="text" placeholder="Search" />
              </Col>
              <Col xs={1}>
                <Button onClick={handleButtonClick} type="submit">Search</Button>
              </Col>
              <Col>
                <img
                  id="avatar"
                  src="../../src/assets/avatar.png"
                  width="50px"
                  alt="avatar image"
                />
                <br />
                <a href="#profile">{navigation.username}</a>
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
                <a href="#profile">{navigation.username}</a>
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
            <Col><Button onClick={handleButtonClick} variant="success">Post</Button>
              
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
                <a href="#profile">{navigation.username}</a>
              </Col>
          </Row>
        </Container>
      </Navbar>
    );
  }

}
