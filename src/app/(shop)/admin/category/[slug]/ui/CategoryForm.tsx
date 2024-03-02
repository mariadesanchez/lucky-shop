"use client";

import { useForm } from "react-hook-form";
import { Category} from "@/interfaces";


import { createUpdateCategory } from "@/actions";
import { useRouter } from 'next/navigation';


interface Props {
  category: Category;
}



interface FormInputs {
  name: string;
  
 
}

export const CategoryForm = ({ category }: Props) => {

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
  
  } = useForm<FormInputs>({
    defaultValues: {
      ...category,
     

    },
  });



 

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    const { ...categoryToSave } = data;


    if ( category.id ){
      formData.append("id", category.id ?? "");
    }
    
    formData.append("name", categoryToSave.name);
 
   



    const { ok, category:updatedCategory } = await createUpdateCategory(formData);

    if ( !ok ) {
      alert('Producto no se pudo actualizar');
      return;
    }

    router.replace(`/admin/product/${ updatedCategory?.id }`)


  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Nombre</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("name", { required: true })}
          />
        </div>


        <button className="btn-primary w-full">Guardar</button>
      </div>

     
    </form>
  );
};
