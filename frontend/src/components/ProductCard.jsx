import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      <Link to={`/product/${product.slug}`}>
        <div className="relative h-48 bg-gray-100">
          {product.image ? (
            <img 
              src={`http://localhost:8000${product.image}`} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <span className="text-4xl">💪</span>
            </div>
          )}
          {product.discount_percentage > 0 && (
            <div className="absolute top-2 right-2 bg-secondary text-white px-2 py-1 rounded-lg text-sm font-bold">
              -{product.discount_percentage}%
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-primary">${product.price}</span>
            {product.original_price && (
              <span className="text-gray-400 line-through ml-2">${product.original_price}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product, 1)}
            className="bg-primary text-white p-2 rounded-lg hover:bg-opacity-90 transition"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;