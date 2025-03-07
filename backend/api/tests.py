from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken


class CheckApiTestCase(TestCase):
    def test_check_api(self):
        url = reverse("check_api")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), {"status": "ok"})


class RegisterAPIViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('register')

    def test_register_success(self):
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'strongpassword123',
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('access_token', response.data)
        self.assertIn('refresh_token', response.data)
        self.assertEqual(response.data['user']['username'], 'testuser')
        self.assertEqual(response.data['user']['email'], 'testuser@example.com')

    def test_register_failure_missing_field(self):
        data = {
            'username': 'testuser',
            'password': 'strongpassword123',
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data) 
        
    def test_register_failure_invalid_email(self):
        data = {
            'username': 'testuser',
            'email': 'invalidemail',
            'password': 'strongpassword123',
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)


class CustomTokenObtainPairViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('token')
        self.user_data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'strongpassword123',
        }
        self.user = get_user_model().objects.create_user(**self.user_data)

    def test_obtain_token_success(self):
        data = {
            'username': self.user_data['username'],
            'password': self.user_data['password']
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
    
    def test_obtain_token_invalid_credentials(self):
        data = {
            'username': self.user_data['username'],
            'password': 'wrongpassword'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CustomTokenRefreshViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.refresh_url = reverse('token_refresh')
        self.user_data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'strongpassword123',
        }
        self.user = get_user_model().objects.create_user(**self.user_data)
        self.refresh_token = RefreshToken.for_user(self.user)
        
    def test_refresh_token_success(self):
        data = {
            'refresh': str(self.refresh_token)
        }
        
        response = self.client.post(self.refresh_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
    
    def test_refresh_token_invalid(self):
        data = {
            'refresh': 'invalid_refresh_token'
        }
        response = self.client.post(self.refresh_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


        