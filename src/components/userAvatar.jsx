import { Col } from "react-bootstrap"

export default function UserAvatar ({ username }) {
   return (<Col className="d-flex flex-column align-items-end" style={{ maxWidth:"150px",marginRight:"5%" }}>
      <img
        id="avatar"
        src="../../src/assets/avatar.png"
        width="50px"
        alt="avatar image"
      />
      <a href="#profile">{username}</a>
    </Col>)
  
}