import { Dispatch, SetStateAction } from "react"
import { PaginationInt } from "./interface"

export const Pagination = ({pagination,setPagination}:{pagination:PaginationInt,setPagination:Dispatch<SetStateAction<PaginationInt>>}) => {
    const onPageChange = (page:number|null) => {
        if(!page){
            return false
        }
        setPagination(
            {
                ...pagination,
                currentPage:page
            }
        )
    }

  const paginationButtons = () => {
        const {currentPage,totalPages} = pagination
        let startPage = currentPage === totalPages ? currentPage - 2 : currentPage-1;
        let endPage = (currentPage + 1) < totalPages ? currentPage + 1 : totalPages ;
        if (startPage < 1) {
          startPage = 1;
          endPage = totalPages;
        }
        const paginationButtons = [];
        for (let page = startPage; page <= endPage; page++) {
          paginationButtons.push(page);
        }
        return paginationButtons;
      }

  const pageNumbers = paginationButtons()
  return (
    <div className="clearfix">
            <select onChange={(e)=>setPagination({...pagination, pageSize:parseInt(e.target.value), currentPage:1})}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
          <div className="hint-text">
            Showing <b>page {pagination.currentPage}</b> out of <b>{pagination.totalElements}</b> entries
          </div>
          <ul className="pagination">
            <li className="page-item disabled">
              <button onClick={()=> onPageChange(pagination.prev)} className="btn">Previous</button>
            </li>
            {
                pageNumbers.map((item:number) => {
                    return <li className="page-item" key={item}>
                    <button onClick={() => onPageChange(item)} className="btn page-link">
                        {item}
                    </button>
                  </li>
                })
            }
            <li className="page-item">
              <button onClick={()=> onPageChange(pagination.next)} className="btn age-link">
                Next
              </button>
            </li>
          </ul>
        </div>
  )
}
