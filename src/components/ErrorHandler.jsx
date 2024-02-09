import { Button, Modal } from "react-bootstrap";

export default function ErrorHandler({ errorNotFound,pathname,topicParam,...rest}){
   
        return (
          <Modal
            {...rest}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            className="text-align-center"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Error Not Found
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{topicParam ? "Topic" : null} {pathname ? `Path ${pathname} Not Found!` : null}
              {errorNotFound ? `${errorNotFound}` : null}</h4>
              {topicParam ? <p>You tried to access topic {topicParam} but it doesn't exist.</p> : null}
                
             
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger"onClick={rest.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
