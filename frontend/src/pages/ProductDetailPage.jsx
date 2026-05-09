import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Shield, Truck, RotateCcw, Star, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  useEffect(() => {
    fetchProduct();
  }, [slug]);
  
  const fetchProduct = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products/');
      const foundProduct = response.data.find(p => p.slug === slug);
      setProduct(foundProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} x ${product.name} to cart`);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-600">Product not found</h2>
      </div>
    );
  }
  
  const benefits = product.benefits ? product.benefits.split(',') : [];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl flex items-center justify-center p-8">
            {product.image ? (
              <img 
                src={`http://localhost:8000${product.image}`} 
                alt={product.name}
                className="max-w-full h-auto rounded-lg"
              />
            ) : (
              <div className="text-8xl">💪</div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-4">
              {product.category_name && (
                <span className="text-sm text-primary font-semibold">{product.category_name}</span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-accent">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5" />
                </div>
                <span className="text-gray-500">(128 reviews)</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">${product.price}</span>
                {product.original_price && (
                  <>
                    <span className="text-gray-400 line-through">${product.original_price}</span>
                    <span className="bg-secondary text-white px-2 py-1 rounded-lg text-sm font-bold">
                      Save ${(product.original_price - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              {product.discount_percentage > 0 && (
                <p className="text-green-600 text-sm mt-1">🔥 {product.discount_percentage}% OFF</p>
              )}
            </div>
            
            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <p className="text-green-600 flex items-center gap-2">
                  <Check className="w-5 h-5" /> In Stock ({product.stock} available)
                </p>
              ) : (
                <p className="text-red-600">Out of Stock</p>
              )}
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity:</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border rounded-lg hover:bg-gray-100 transition"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 border rounded-lg hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn-primary w-full mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            
            {/* Benefits */}
            {benefits.length > 0 && benefits[0] && (
              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-3">Key Benefits</h3>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      {benefit.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Additional Info Tabs */}
        <div className="border-t p-6 md:p-8 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.ingredients && (
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Ingredients</h3>
                <p className="text-gray-600">{product.ingredients}</p>
              </div>
            )}
            {product.dosage && (
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Dosage Instructions</h3>
                <p className="text-gray-600">{product.dosage}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Guarantees */}
        <div className="bg-primary/5 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h4 className="font-semibold">Quality Guaranteed</h4>
              <p className="text-sm text-gray-600">3rd party tested</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-primary" />
            <div>
              <h4 className="font-semibold">Free Shipping</h4>
              <p className="text-sm text-gray-600">On orders $50+</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="w-8 h-8 text-primary" />
            <div>
              <h4 className="font-semibold">30-Day Returns</h4>
              <p className="text-sm text-gray-600">Money back guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;