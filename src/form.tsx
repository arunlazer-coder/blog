import { SetStateAction, Dispatch, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { add, getData, update } from "./services";
export const Form = ({
  showForm,
  setShowForm,
  id,
}: {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  id: number | [];
}) => {
  const [data, setData] = useState({
    title: "",
    url: "",
    content: "",
  });

  useEffect(() => {
    if(id){
      getData(id as number,setData)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const onSubmit = () => {
    if(id){
      update(id as number,data)
    }else{
      add(data); 
    }
    setShowForm(false)
  }
  return (
    <Modal show={showForm}>
      <Modal.Header>
        <h4 className="modal-title">Add Blog</h4>
        <button
          className="close btn"
          onClick={() => {
            setShowForm(false);
          }}
        >
          &times;
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={data.title}
            onChange={({target:{value}}) => setData({...data,title:value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Url</label>
          <input
            type="text"
            className="form-control"
            value={data.url}
            onChange={({target:{value}}) => setData({...data,url:value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea className="form-control" 
          onChange={({target:{value}}) => setData({...data,content:value})}
          value={data.content}
          required
          >
          </textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-default"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
        <button className="btn btn-success" onClick={onSubmit}>Add</button>
      </Modal.Footer>
    </Modal>
  );
};
