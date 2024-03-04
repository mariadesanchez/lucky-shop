'use client'
import { deleteCategoryById } from '@/actions/category/delete-category-by-id'
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5';

interface Props {
  id: string;
}

export const DeleteCategory = ({ id }: Props) => {
  return (
    // <div>
    //   <button
    //     type="button"
    //     onClick={() => deleteCategoryById(id)}
    //     className="btn-danger w-full rounded-b-xl"
    //   >
    //     Eliminar
    //   </button>
    // </div>
    <div className="flex flex-col mt-2">
    <button
       onClick={() => deleteCategoryById(id)}
      className="flex p-2 hover:bg-gray-100 rounded transition-all"
    >
      <IoTrashOutline size={30} className="text-red-500" />
      <span className="text-l text-red-500">Remover</span>
    </button>
  </div>
  )
}

export default DeleteCategory