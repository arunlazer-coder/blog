import { Dispatch, SetStateAction } from "react";
import { Modal } from "react-bootstrap";
import { destroy } from "./services";

export const Delete = ({
  showDelete,
  setShowDelete,
  id,
  setSelectedId,
}: {
  showDelete: boolean;
  setShowDelete: Dispatch<SetStateAction<boolean>>;
  id: number | [];
  setSelectedId:Dispatch<SetStateAction<number|[]>>
}) => {
  const destroyData = () => {
    destroy(id);
    setShowDelete(false);
    setSelectedId(0)
  };
  return (
    <Modal show={showDelete} animation={true}>
      <Modal.Header>
        <h4 className="modal-title">Delete Blog</h4>
        <button className="close btn" onClick={() => setShowDelete(false)}>
          &times;
        </button>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete these Records?</p>
        <p className="text-warning">
          <small>This action cannot be undone.</small>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-default"
          onClick={() => setShowDelete(false)}
        >
          Cancel
        </button>
        <button className="btn btn-danger" onClick={destroyData}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};
