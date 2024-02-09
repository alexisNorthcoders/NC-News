import { useEffect, useState, useContext } from "react";
import { fetchUsers } from "../utils/api";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardGroup from "react-bootstrap/CardGroup"
import Spinner from "react-bootstrap/Spinner";

import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { NavContext } from "./NavHandler";

export default function Users() {
  const [userList,setUserList] = useState([])
  const { navigation, setNavigation } = useContext(NavContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers().then((users) => {
        setIsLoading(false);
      setUserList(users);
    });
  }, []);
function handleUserClick(user){
  setNavigation((current) => ({ ...current, header:"home",username:user.username,avatar:user.avatar_url }))
   
      navigate("/")
}
  return (
    <>
    
      {isLoading ? (
        <Col>
          <Row>
            <h1>Loading users...</h1>
            <Row className="justify-content-center">
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Row>
          </Row>
        </Col>
      ) : (
        <Col className="mt-5 pt-5 "> 
            <Row className="justify-content-center ">
          {userList.map((user, index) => (
            
              <Card key={`${index}${user.username}`} style={{ width: '15rem',marginBottom:"5px" }}>
                <Card.Title onClick={() => {
                    handleUserClick(user) 
                } }>{user.username}</Card.Title>
                <Card.Body>
                
                  <Card.Img onClick={() => {
                    handleUserClick(user) 
                } } src={user.avatar_url}/>
                  <Card.Text>Name: {user.name}</Card.Text>
                </Card.Body>
              </Card>
            
          ))}
     </Row>
       </Col>
      )}
    </>
  );
}
