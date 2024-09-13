import React from 'react';
import { useParams } from 'react-router-dom';
import '../assets/ProductPage.css'; // Optional: for styling

const ProductPage = () => {
    const { id } = useParams();

    // Dummy data for product
    const product = {
        id: id,
        name: 'Sample Product',
        price: 25,
        description: 'This is a detailed description of the sample product.',
        imageUrl: 'https://via.placeholder.com/300'
    };

    const handleAddToCart = () => {
        // Implement add to cart logic here
        alert('Product added to cart!');
    };

    return (
        <div className="product-page">
            <header className="product-header">
                <h1>{product.name}</h1>
            </header>
            <main>
                <section className="product-details">
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                    <div className="product-info">
                        <p className="product-price">${product.price.toFixed(2)}</p>
                        <p className="product-description">{product.description}</p>
                        <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ProductPage;