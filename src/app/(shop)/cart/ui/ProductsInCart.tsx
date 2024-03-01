'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useCartStore } from '@/store';
import { ProductImage, QuantitySelector } from '@/components';
import Link from 'next/link';
import {
  IoTrashOutline,
  
} from "react-icons/io5";


export const ProductsInCart = () => {

  const updateProductQuantity = useCartStore( state => state.updateProductQuantity );
  const removeProduct = useCartStore( state => state.removeProduct );

  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore( state => state.cart );


  useEffect(() => {
    setLoaded(true) ;
  }, []);




  if( !loaded ) {
    return <p>Loading...</p>
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={ `${ product.slug }-${ product.size }`  } className="flex mb-5">
          <Image
            src={product.image }
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <Link 
              className="hover:underline cursor-pointer"
              href={ `/product/${ product.slug } ` }>
              { product.size } - {product.title}
            </Link>
            
            <p>${product.price}</p>
            <QuantitySelector 
              quantity={ product.quantity } 
              onQuantityChanged={ quantity => updateProductQuantity(product, quantity) }
            />

<div className="flex flex-col mt-5 ">
  <button
    onClick={() => removeProduct(product)}
    className="flex  p-2  hover:bg-gray-100 rounded transition-all"
  >
    <IoTrashOutline size={30} className= "text-red-500"  />
    <span className="text-xl text-red-500">Remover</span>
  </button>
</div>
            
          
          </div>
        </div>
      ))}
    </>
  );
};
