from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Category, Product, Order, OrderItem
from .serializers import CategorySerializer, ProductSerializer, OrderSerializer
import uuid

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    
    @action(detail=False, methods=['get'], url_path='featured')
    def featured(self, request):
        """Get featured products"""
        featured_products = self.queryset.filter(is_featured=True)[:8]
        serializer = self.get_serializer(featured_products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='by-category')
    def by_category(self, request):
        """Get products by category slug"""
        category_slug = request.query_params.get('category')
        if category_slug:
            try:
                category = Category.objects.get(slug=category_slug)
                products = self.queryset.filter(category=category)
                serializer = self.get_serializer(products, many=True)
                return Response(serializer.data)
            except Category.DoesNotExist:
                return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error': 'Category parameter required'}, status=status.HTTP_400_BAD_REQUEST)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
    def create(self, request):
        # Generate unique order ID
        import uuid
        order_id = str(uuid.uuid4())[:8].upper()
        
        order_data = {
            'order_id': order_id,
            'customer_name': request.data.get('customer_name'),
            'customer_email': request.data.get('customer_email'),
            'customer_phone': request.data.get('customer_phone'),
            'shipping_address': request.data.get('shipping_address'),
            'total_amount': request.data.get('total_amount'),
            'status': 'pending'
        }
        
        order_serializer = OrderSerializer(data=order_data)
        
        if order_serializer.is_valid():
            order = order_serializer.save()
            
            # Create order items
            cart_items = request.data.get('cart_items', [])
            for item in cart_items:
                product = get_object_or_404(Product, id=item['product_id'])
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=item['quantity'],
                    price=float(product.price)  # Ensure it's a float
                )
            
            return Response({
                'order_id': order_id,
                'total_amount': order.total_amount,
                'status': order.status,
                'message': 'Order created successfully'
            }, status=status.HTTP_201_CREATED)
        
        return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)