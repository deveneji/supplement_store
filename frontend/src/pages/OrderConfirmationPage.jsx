import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-4">
          Your order has been successfully placed.
        </p>
        <p className="text-lg mb-8">
          Order Number: <span className="font-bold text-primary">{orderId}</span>
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="font-semibold mb-3">What's Next?</h2>
          <p className="text-gray-600">
            You will receive an email confirmation shortly. We'll notify you once your order ships.
          </p>
        </div>
        
        <Link to="/products" className="btn-primary inline-block">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;