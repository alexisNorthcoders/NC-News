import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useContext } from "react";
import { NavContext } from "./NavHandler";

export default function Header() {
  const {navigation, setNavigation} = useContext(NavContext);

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
                  src="avatar.png"
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

}
