import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Heart } from 'lucide-react';

const Navbar = () => {
  const { getCartCount } = useCart();
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            Vitality<span className="text-secondary">Plus</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-dark hover:text-primary transition">Home</Link>
            <Link to="/products" className="text-dark hover:text-primary transition">All Products</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-dark hover:text-primary transition" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;