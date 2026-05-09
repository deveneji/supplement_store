import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [categoryFilter]);
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:8000/api/products/';
      if (categoryFilter) {
        url = `http://localhost:8000/api/products/by_category/?category=${categoryFilter}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4 text-primary">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/products" 
                  className={`block px-3 py-2 rounded-lg transition ${!categoryFilter ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                >
                  All Products
                </a>
              </li>
              {categories.map(category => (
                <li key={category.id}>
                  <a 
                    href={`/products?category=${category.slug}`}
                    className={`block px-3 py-2 rounded-lg transition ${categoryFilter === category.slug ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">
            {categoryFilter ? categories.find(c => c.slug === categoryFilter)?.name || 'Products' : 'All Products'}
          </h1>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;