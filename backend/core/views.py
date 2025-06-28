from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .serializers import CustomUserSerializer


# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def user_view(request):
    user = request.user
    serializer = CustomUserSerializer(user)
    if serializer.is_valid:
        # If you want to return user details
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
