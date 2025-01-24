from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response
from .models import Book
from django.shortcuts import get_object_or_404

class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

@api_view(['GET'])
def book_list(request):
    books = Book.objects.all()
    return Response(BookSerializer(books, many=True).data)

@api_view(['POST'])
def create_book(request):
    name, pages = request.data['name'], request.data['pages']
    new_book = Book.objects.create(name=name, pages=pages)
    serializer = BookSerializer(new_book)
    return Response(serializer.data)
@api_view(['PUT'])
def update_book(request, pk):
    book = get_object_or_404(Book, pk=pk)
    serializer = BookSerializer(book, request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_book(request, pk):
    book = get_object_or_404(Book, pk=pk)
    book.delete()
    return Response({
        'message' : 'Success'
    }, 200)