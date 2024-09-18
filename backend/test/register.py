import os
import requests

REGISTER_URL = os.getenv('REGISTER_URL')
ADMIN_USERNAME= os.getenv('ADMIN_USERNAME')
ADMIN_EMAIL = os.getenv('ADMIN_EMAIL')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD')
FLAG = os.getenv('FLAG')

# Register the user (only once)
def register_user():
    headers = {'Content-Type': 'application/json'}
    response = requests.post(REGISTER_URL, json={
        'username': ADMIN_USERNAME,
        'email': ADMIN_EMAIL,
        'password': ADMIN_PASSWORD,
        'flag': 'FLAG'
    }, headers=headers)
    print(f"Register Response: {response.status_code} - {response.text}")
    return response.status_code == 201

def main():
    # Register the user
    if not register_user():
        print("Registration failed.")
        return

if __name__ == '__main__':
    main()