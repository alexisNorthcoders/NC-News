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
import UserAvatar from "./userAvatar";
import NavBarButtons from "./NavBarButtons";

export default function Header({
  selectedTopic,
  setSelectedTopic,
  onSubmitForm,
}) {
  const { navigation, setNavigation } = useContext(NavContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    onSubmitForm();
  };

  return (
    <Navbar className={`navbar bg-tertiary justify-content-between fixed-top`}>
      <Container className="navbar-container">
        <Row className="navbar-row justify-content-md-center">
         
          <NavBarButtons
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            header={navigation.header}
            setNavigation={setNavigation}
            navigate={navigate}
            article_id={navigation.article_id}
            handleButtonClick={handleButtonClick}
          />
          <UserAvatar username={navigation.username} />
        </Row>
      </Container>
    </Navbar>
  );
}
