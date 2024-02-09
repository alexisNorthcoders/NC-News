import { Button, Modal } from "react-bootstrap";

export default function ErrorHandler(props){
   
        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            className="text-align-center"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Error
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Topic Not Found</h4>
              <p>
                You tried to access topic {props.topicParam} but it doesn't exist.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger"onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
