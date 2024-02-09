import { Col } from "react-bootstrap"

export default function UserAvatar ({ username, avatar}) {
   return (<Col className="d-flex flex-column align-items-end" style={{ maxWidth:"150px",marginRight:"5%" }}>
      <img
        id="avatar"
        src={avatar || "/avatar.png"}
        width="50px"
        alt="avatar picture"
      />
      <a href="#profile">{username}</a>
    </Col>)
  
}