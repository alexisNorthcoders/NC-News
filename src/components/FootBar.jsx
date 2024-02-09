import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useContext, useState } from "react";
import { NavContext } from "./NavHandler";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./userAvatar";

export default function FootBar() {
  const { navigation, setNavigation } = useContext(NavContext);
  const navigate = useNavigate();
  function handleNavigation(navigationHeader, navigateTo = null) {
    setNavigation((current) => ({ ...current, header: navigationHeader }));
    if (navigateTo) {
      navigate(navigateTo);
    }
  }

  return (
    <Navbar className="footbar fixed-top">
      <Container >
      <Row className="justify-content-center " style={{justifyContent:"center",width:"100%"}}>
      <Col >
      <Button onClick={() => handleNavigation("home", "/")} variant="primary">Home</Button>
      </Col>
      <Col><Button variant="success" onClick={() => handleNavigation("", "/article/create")}>Post Article</Button> </Col>
      <Col >
        {navigation.username ? <Button variant="warning"onClick={() => handleNavigation("users", "/users")}>Change User</Button> : <Button onClick={() => handleNavigation("users", "/users")} variant="warning">Login</Button>}
      </Col>
      <UserAvatar username={navigation.username} avatar={navigation.avatar} />
    </Row>
      </Container>
    </Navbar>
  );
}
