"use client";

import { useState } from "react";

import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from '@/store';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore( state => state.addProductTocart );

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;
   if( Number(quantity) > Number(product.inStock)) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
      inStock: product.inStock,
      
    }

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);

  };




  return (
    <>{product.inStock?
    <div>
      <div>
      {posted && !size && (
        <p className="mt-2 mr-5 text-red-500 fade-in">
          Debe de seleccionar una talla*
        </p>
      )}
      </div>
      <div>

      {posted && Number(quantity) > Number(product.inStock)&& (
        <p className="mt-2 text-red-500 fade-in">
          Supera el Stock({product.inStock})
        </p>
      )}
     </div>
      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* Selector de Cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      </div>:
      <h3></h3>
      }
      {/* Button */}
      {product.inStock? <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>:
       
       <h1 className="mt-5 mb-5 text-red-500 font-bold">Sin Stock</h1>
     }
     
    </>
  );
};
