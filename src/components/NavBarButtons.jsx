import { Button } from "react-bootstrap";
import Topics from "./Topics";
import { Col, Row } from "react-bootstrap";

export default function NavBarButtons({
  header,
  setNavigation,
  navigate,
  article_id,
  handleButtonClick,
  setSelectedTopic,
  selectedTopic,
}) {
  function createButton(onClick, variant, label) {
    return (
      <span>
        <Button onClick={onClick} variant={variant}>
          {label}
        </Button>
      </span>
    );
  }
  function handleNavigation(navigationHeader, navigateTo = null) {
    setNavigation((current) => ({ ...current, header: navigationHeader }));
    if (navigateTo) {
      navigate(navigateTo);
    }
  }
  let navBarButtons;
  if (header === "home") {
    navBarButtons = (
      <Topics
        setSelectedTopic={setSelectedTopic}
        selectedTopic={selectedTopic}
      />
    );
  } else if (header === "article") {
    navBarButtons = (
      <>
        {createButton(
          () => handleNavigation("postcomment"),
          "success",
          "Add Comment"
        )}
        {createButton(() => handleNavigation("home", "/"), "primary", "Home")}
      </>
    );
  } else if (header === "postcomment") {
    navBarButtons = (
      <>
        {createButton(handleButtonClick, "success", "Post")}
        {createButton(
          () => handleNavigation("article", `/article/${article_id}`),
          "danger",
          "Cancel"
        )}
      </>
    );
  }
  return (
    <Col
      className="d-flex flex-column align-items-left"
      style={{ marginLeft: "5%" }}
    >
      <Row className="navbar-buttons-row d-flex flex-row">
        <Button className="m-1" variant="info">Sort by</Button>
        <Button className="m-1">Date</Button>
        <Button className="m-1">Comments</Button>
        <Button className="m-1">Votes</Button>
        <Button className="m-1">Order</Button>
      </Row>
      <Row className="navbar-buttons-row d-flex flex-row">{navBarButtons}</Row>
    </Col>
  );
}
