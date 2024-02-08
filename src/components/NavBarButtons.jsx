import { Button } from "react-bootstrap";
import Topics from "./Topics";
import { Col } from "react-bootstrap";

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
      <Button onClick={onClick} variant={variant}>
        {label}
      </Button>
    );
  }
  function handleNavigation(navigationHeader, navigate = null) {
    setNavigation((current) => ({ ...current, header: navigationHeader }));
    if (navigate) {
      navigate(navigate);
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
        {createButton(
          () => handleNavigation("home", "/"),
          "primary",
          "Home"
        )}
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
    <Col className="d-flex flex-row align-items-end align-left">
      {navBarButtons}
    </Col>
  );
}
