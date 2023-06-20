import { Dispatch, SetStateAction } from "react";
import { ListResponseInt, PaginationInt } from "../interface";
import { toast } from "react-toastify";

export const list = async (
  setData: Dispatch<SetStateAction<ListResponseInt[]>>,
  setPagination: Dispatch<SetStateAction<PaginationInt>>,
  pagination:PaginationInt
) => {
  return await fetch(`${import.meta.env.VITE_BASE_API}?page=${pagination.currentPage||1}&pageSize=${pagination.pageSize||5}`)
    .then((res) => res.json())
    .then(({ response,pagination:{totalElements,pageSize,totalPages,currentPage,next,prev} }) => {
      const paginationData = {
        totalElements,
        totalPages,
        currentPage,
        next,
        prev,
        pageSize
      }
      const data = response.map(
        ({
          title,
          url,
          content,
          id,
        }: {
          title: string;
          url: string;
          content: string;
          id: number;
        }) => {
          return { title, url, content, id };
        }
      );
      setData(data);
      setPagination(paginationData)
    })
    .catch((error) => console.log(error));
};

export const destroy = async (id: number|[]) => {
  return await fetch(import.meta.env.VITE_BASE_API + "/delete/" + JSON.stringify(id))
    .then((res) => res.json())
    .then(() => {
      toast("successfully deleted")
    })
    .catch((error) => console.log(error));
};

export const add = async (data: {
  title: string;
  url: string;
  content: string;
}) => {
  return await fetch(import.meta.env.VITE_BASE_API + "/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      toast("successfully added");
    })
    .catch((error) => console.log(error));
};

export const getData = async (id:number,setData:Dispatch<SetStateAction<ListResponseInt>>) => {
  return await fetch(import.meta.env.VITE_BASE_API + "/edit/"+id)
    .then((res) => res.json())
    .then(({response:{title,url,content}}) => {
      setData({title,url,content})
    })
    .catch((error) => console.log(error));
};

export const update = async (id:number, data:ListResponseInt[]) => {
  return await fetch(import.meta.env.VITE_BASE_API + "/update/"+id,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
  )
    .then((res) => res.json())
    .then(() => {
      toast("successfully updated")
    })
    .catch((error) => console.log(error));
};
