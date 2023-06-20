import { useEffect, useState } from "react";
import { Form } from "./form";
import { Delete } from "./delete";
import { list } from "./services";
import { ListResponseInt, PaginationInt } from "./interface";
import { Pagination } from "./pagination";


export const Table = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<number|[]>(0)
  const [data, setData] = useState<ListResponseInt[]>([]);
  const [pagination, setPagination] = useState<PaginationInt>({
        totalElements:0,
        totalPages:0,
        currentPage:0,
        next:0,
        prev:0,
        pageSize:0
  })
  useEffect(() => {
    list(setData, setPagination, pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDelete,showForm,pagination.currentPage,pagination.pageSize])
  
  const handleCheckboxChange = (event:{target:{checked:boolean, value:string}}) => {
    const checkbox = event.target;
    const isChecked = checkbox.checked;
    
    const value = parseInt(checkbox.value);

    if (isChecked) {
      if(checkbox.value === "selectAll"){
        const ids = data.map((x:ListResponseInt)=> x.id)
        setSelectedId(ids as [])
        return ;
      }
      let ids = [value]
        if(typeof selectedId === 'object'){
          ids = [...selectedId as [],value]
        }
      setSelectedId(ids as []);
    } else {
      if(checkbox.value === "selectAll"){
        setSelectedId([])
        return ;
      }
      if(typeof selectedId === 'object'){
        const ids = selectedId.filter((item) => item !== value)
        setSelectedId(ids as []);
      }
    }
  };

  return (
    <div className="container">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-6">
              <h2>
                Manage <b>Blogs</b>
              </h2>
            </div>
            <div className="col-sm-6">
              <button
                className="btn btn-success"
                onClick={() => {
                  setShowForm(true);
                }}
              >
                <i className="material-icons">&#xE147;</i>{" "}
                <span>Add New Employee</span>
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowDelete(true);
                }}
                disabled={!selectedId || (selectedId as []).length === 0}
              >
                <i className="material-icons">&#xE15C;</i> <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>
                <span className="custom-checkbox">
                  <input type="checkbox" value={'selectAll'} onChange={(e) => handleCheckboxChange(e)} />
                  <label></label>
                </span>
              </th>
              <th>Name</th>
              <th>Url</th>
              <th>Content</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item,i:number) => {
              return (
                <tr key={i}>
                  <td>
                    <span className="custom-checkbox">
                      <input
                        type="checkbox"
                        value={item.id}
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                      <label></label>
                    </span>
                  </td>
                  <td>{item.title} </td>
                  <td>{item.url}</td>
                  <td>{item.content}</td>
                  <td>
                    <button
                      className="edit btn"
                      onClick={() => {
                        setShowForm(true);
                        setSelectedId(item.id as number);
                      }}
                    >
                      <i
                        className="material-icons"
                        data-toggle="tooltip"
                        title="Edit"
                      >
                        &#xE254;
                      </i>
                    </button>
                    <button
                      className="delete btn"
                      onClick={() => {
                        setShowDelete(true);
                        setSelectedId(item.id as number);
                      }}
                    >
                      <i
                        className="material-icons"
                        data-toggle="tooltip"
                        title="Delete"
                      >
                        &#xE872;
                      </i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination  {...{pagination,setPagination}}/>
      </div>
      {showForm && <Form {...{ showForm, setShowForm , selectedId}} id={selectedId} />}
      {showDelete && <Delete {...{ showDelete, setShowDelete,setSelectedId }} id={selectedId} />}
    </div>
  );
};
