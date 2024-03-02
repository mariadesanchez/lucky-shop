export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table

import { getPaginatedCategories } from "@/actions/category/get-paginated-categories";
import { Pagination, Title } from "@/components";

// import Image from "next/image";

import Link from "next/link";


interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function CategoriesPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { categories,totalPages } =
    await getPaginatedCategories({ page });

  return (
    <>
      <Title title="Agregar o Editar Categoría" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/category/new" className="btn-primary">
          Nueva Categoría
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
               Nombre
              </th>
             
            </tr>
          </thead>
          <tbody>
            {categories.map((category:any) => (
              <tr
                key={category.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {/* <Link href={`/product/${product.slug}`}>
                  <Image
            src={product.images[0] }
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />
                  </Link> */}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/category/${category.id}`}
                    className="hover:underline"
                  >
                    {category.name}
                  </Link>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
