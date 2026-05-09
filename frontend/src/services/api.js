import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async (category = null) => {
  let url = '/products/';
  if (category) {
    url = `/products/by_category/?category=${category}`;
  }
  const response = await api.get(url);
  return response.data;
};

export const fetchProductBySlug = async (slug) => {
  const response = await api.get(`/products/`);
  const product = response.data.find(p => p.slug === slug);
  return product;
};

export const createOrder = async (orderData) => {
  const response = await api.post('/orders/', orderData);
  return response.data;
};

export default api;