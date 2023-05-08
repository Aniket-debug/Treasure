# urls.py
from django.urls import path
from .views import SignUpView, LoginView
from .views import PuzzleList, PuzzleDetail
urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
     path('puzzles/', PuzzleList.as_view()),
    path('puzzles/<int:pk>/', PuzzleDetail.as_view()),
]
