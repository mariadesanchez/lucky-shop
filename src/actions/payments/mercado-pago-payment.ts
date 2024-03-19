'use server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from 'next/navigation';

interface Order {
  id: string;
  total: number;
}
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const mercadoPagoCheckPayment = async (order: Order) => {
  try {
    const accessToken = process.env.NEXT_MERCADO_PAGO_ACCESS_TOKEN!;
    
    const client = new MercadoPagoConfig({ accessToken });
  
    const preference = new Preference(client);
  
    const res = await preference.create({
      body: {
        external_reference: order?.id,
        items: [
          {
            id: order?.id,
            title: `Order #${order?.id.split("-").at(-1)}`,
            quantity: 1,
            unit_price: order.total,
          },
        ],
        redirect_urls: {
          failure: `https://lucky-shop-next14.vercel.app/orders/${ order.id }`,
          success: `https://lucky-shop-next14.vercel.app/orders/${ order.id }`,
        },
        back_urls: {
          failure: `https://lucky-shop-next14.vercel.app/orders/${ order.id }`,
          success: `https://lucky-shop-next14.vercel.app/orders/${ order.id }`,
        },
        auto_return: 'approved',
      },
    });

    // Actualizar la base de datos
    await prisma.order.update({
      where: { id: order.id },
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    });

    // Redirigir al usuario
    redirect(res.init_point!);
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso
    console.error('Error en el proceso de pago:', error);
    // Podrías lanzar un error o manejarlo de alguna otra forma, dependiendo de tu lógica de aplicación
  }
};
