'use client';


import Image from 'next/image';
import Link from 'next/link';
import { ProductImage } from '../../product/product-image/ProductImage';
import { Product } from '@/interfaces';
import { useState } from 'react';

interface Props {
  product: Product;
}


export const ProductGridItem = ( { product }: Props ) => {

  const [ displayImage, setDisplayImage ] = useState( product.images[ 0 ] );


  return (
    <div className="rounded-md overflow-hidden fade-in">
 
      <Link href={ `/product/${ product.slug }` }>
         <Image
          src={ displayImage }
          alt={ product.title }
          className="w-full object-cover rounded"
          width={ 500 }
          height={ 500 }
          onMouseEnter={ () => setDisplayImage( product.images[1] )  }
          onMouseLeave={ () => setDisplayImage( product.images[0] ) }
          />
         {/* <ProductImage
            src={product.images[ 0 ] }
            img2={product.images[ 1 ]}  
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
            
          /> */}
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-blue-600"
          href={ `/product/${ product.slug }` }>
          { product.title }
        </Link>
        { !product.inStock?
        (<div className='flex'>
      
        <span className="font-bold text-red-500">Sin Stock</span>
        </div>):
         <div className='flex'>
         <span className="font-bold mr-5">${ product.price }</span>
        
         </div>
        }
       
      </div>

    </div>
  );
};