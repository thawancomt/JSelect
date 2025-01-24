from django.urls import path

from . import views
urlpatterns = [
    path('books', views.book_list),
    path('book/create', views.create_book),
    path('book/<int:pk>', views.update_book),
    path('book/delete/<int:pk>', views.delete_book),

]
