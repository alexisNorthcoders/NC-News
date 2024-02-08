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

export default function Header({ selectedTopic,setSelectedTopic,onSubmitForm }) {
 
  
  const {navigation, setNavigation} = useContext(NavContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    
    onSubmitForm();
  };

  if (navigation.header === "home"){
    return (
      <Navbar className="navbar bg-tertiary justify-content-between fixed-top">
        <Container className="navbar-container">
        <Row className="navbar-row justify-content-md-center">
          <Col></Col>
          <Col className="d-flex flex-row align-items-end align-left" >
            <Topics setSelectedTopic={setSelectedTopic} selectedTopic={selectedTopic}/></Col>
           
            <Col className="d-flex flex-column align-items-end"> 
                <img
                  id="avatar"
                  src="../../src/assets/avatar.png"
                  width="50px"
                  alt="avatar image"
                />
                
                <a href="#profile">{navigation.username}</a>
                </Col>
            </Row>
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
