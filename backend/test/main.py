import os
import requests
from random import choice, randint
import json

# Define constants
LOGIN_URL = 'http://localhost:5000/login'
NEW_PRODUCT_URL = 'http://localhost:5000/shop/product'

ADMIN_EMAIL = os.getenv('ADMIN_EMAIL')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD')

print(ADMIN_EMAIL, ADMIN_PASSWORD)

CATEGORIES = ['Clothing', 'Shoes', 'Electronics', 'Books', 'Games', 'Beauty_Health', 'Food_And_Beverage', 'Hand_Bags', 'Jewellery_And_Accessories', 'Home_And_Gifts']
IMAGES = [
    'Capacity Tote Shoulder Bag.jpeg',
    'Choc Gift Hamper.jpeg',
    'Creative Bridemaid Proposal Gifts.jpeg',
    'Elegant Flats Black.jpeg',
    'Full Length Mirror.jpeg',
    'GIFT SET_ Kitchen Refresh - Cashmere.jpeg',
    'Gold Neckpiece.jpeg',
    'House warming gift hamper.jpeg',
    'Iconic Bangle Watch - Silver-Tone.jpeg',
    'Kydra Botanique.jpeg',
    'Leather Crossbody Bag.jpeg',
    'N24 REVIVING HAND CREAM.jpeg',
    'Narciso - AMBREE.jpeg',
    'NikeLab Apparel.jpeg',
    'Point Toe Heeled Pumps.jpeg',
    'Rectangle Flat Gold Earrings.jpeg',
    'Red Etruria Ring.jpeg',
    'Red Tote Bag.jpeg',
    'Sandalias.jpeg',
    'Sweater ,knit.jpeg',
    'The Row.jpeg',
    'Vestido De Mujer.jpeg',
    'Water Wearable Gold Hoops.jpeg',
    'White sandals.jpeg',
    'Woven Tote Bag.jpeg',
    'Xabono Aesthetic Candles - Vibrant Bubble Candle, White Candle Perfect for Women and Girls Who Appreciate Cute Decor - Pack of Bubble Candles, Vanilla Candle (2Pcs - White).jpeg'
]
GENERIC_IMAGE = 'images/default.png'

def generate_product_data(image_file):
    product_name = os.path.splitext(image_file)[0].replace('_', ' ')
    description = f"{product_name} is a high-quality product."
    price = round(randint(10, 100) + randint(0, 99)/100, 2)  # Random price between 10.00 and 100.99
    brand = f"Brand-{product_name.split()[0]}"
    stock_quantity = randint(1, 100)
    category = choice(CATEGORIES)  # Random category

    return {
        "name": product_name,
        "description": description,
        "price": price,
        "brand": brand,
        "stock_quantity": stock_quantity,
        "category": category
    }

# Login to get the JWT token
def login_user():
    if not ADMIN_EMAIL or not ADMIN_PASSWORD:
        return None

    headers = {'Content-Type': 'application/json'}
    response = requests.post(LOGIN_URL, json={
        'email': ADMIN_EMAIL,
        'password': ADMIN_PASSWORD
    }, headers=headers)
    print(response.json())
    if response.status_code == 200:
        token = response.json().get('access_token')
        return token
    print(f"Login Failed: {response.status_code} - {response.text}")
    return None

def upload_product(token, product_data, image_file_path):
    with open(image_file_path, 'rb') as file:
        files = {'file': file}
        headers = {'Authorization': f'Bearer {token}'}
        response = requests.post(NEW_PRODUCT_URL, headers=headers, files=files, data=product_data)
        upload = list(list(json.loads(response.text).items())[0])[1]
        # clean_upload = 
        #rint(f"Upload {product_data['name']}: {upload['image_url']}")


def main():
    token = login_user()
    if not token:
        print("Login failed.")
        return

    for image_file in IMAGES:
        image_path = os.path.join('images', image_file)
        if not os.path.exists(image_path):
            print(f"Image file {image_path} not found, skipping.")
            continue

        product_data = generate_product_data(image_file)
        upload_product(token, product_data, image_path)


if __name__ == "__main__":
    main()
