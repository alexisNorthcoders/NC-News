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

function NavBarButtons ({ header, setNavigation, navigate, article_id, handleButtonClick, setSelectedTopic, selectedTopic }) {
   
  const createButton = (onClick, variant, text) => (
    <Button onClick={onClick} variant={variant}>
      {text}
    </Button>
  );

  let buttons;
  if (header === "home") {
    buttons = (
      <Topics setSelectedTopic={setSelectedTopic} selectedTopic={selectedTopic} />
    );
  } else if (header === "article") {
    buttons = (
      <>
        {createButton(() => setNavigation((current) => ({ ...current, header: "postcomment" })), "success", "Add Comment")}
        {createButton(() => { navigate("/"); setNavigation((current) => ({ ...current, header: "home" })); }, "primary", "Home")}
      </>
    );
  } else if (header === "postcomment") {
    buttons = (
      <>
        {createButton(handleButtonClick, "success", "Post")}
        {createButton(() => { setNavigation((current) => ({ ...current, header: "article" })); navigate(`/article/${article_id}`); }, "danger", "Cancel")}
      </>
    );
  }

  return (
    <Col className="d-flex flex-row align-items-end align-left">
      {buttons}
    </Col>
  );
};

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
            <Col></Col>
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
