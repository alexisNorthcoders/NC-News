import { Button } from "react-bootstrap";
import Topics from "./Topics";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";

export default function NavBarButtons({
  header,
  setNavigation,
  navigate,
  article_id,
  handleButtonClick,
  setSelectedTopic,
  selectedTopic,
}) {
 
  const [order, setOrder] = useState('desc');
  const [showSortOptions, setShowSortOptions] = useState(false);

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
  function handleSort (sort_by){
    
    setSelectedTopic({ ...selectedTopic,  sort_by: sort_by, });
  };
  function handleOrder (order){
    setOrder(order === 'desc' ? 'asc' : 'desc')
    setSelectedTopic({ ...selectedTopic,  order: order, });
  };

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
        <Button className="m-1" onClick={() => setShowSortOptions((current) => !current)} variant="info">Sort by</Button>{showSortOptions? <><Button className="m-1" onClick={() => handleSort('created_at')}>Date</Button>
        <Button className="m-1" onClick={() => handleSort('comment_count')}>Comments</Button>
        <Button className="m-1" onClick={() => handleSort('votes')}>Votes</Button>
        <Button className="m-1" onClick={() => handleOrder(order)}>Order: {order}</Button></> : null}
        
      </Row> 
      <Row className="navbar-buttons-row d-flex flex-row">{navBarButtons}</Row>
    </Col>
  );
}