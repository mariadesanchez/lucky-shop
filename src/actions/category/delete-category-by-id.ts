'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';


export async function deleteCategoryById(id: string) {
  try {
    // Actualizar la categoría de los productos asociados
    await prisma.product.updateMany({
      where: {
        categoryId: id,
      },
      data: {
        categoryId: '75759362-c861-45a7-b7e1-3a2408971963', // O el valor que prefieras para la categoría "sin categoría".
      },
    });

    // Luego eliminar la categoría
    const category = await prisma.category.delete({
      where: {
        id: id,
      },
    });

    if (!category) {
      throw new Error('La categoría no existe.');
    }

    redirect('/admin/categories')
  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
    throw error;
  }
}