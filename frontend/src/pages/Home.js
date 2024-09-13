import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Home.css'; // Optional: for styling

const Home = () => {
    // Sample featured products, replace with actual data
    const featuredProducts = [
        { id: 1, name: 'Product 1', price: 29.99, imageUrl: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', price: 49.99, imageUrl: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product 3', price: 15.49, imageUrl: 'https://via.placeholder.com/150' },
    ];

    return (
        <div className="home">
            <header className="home-header">
                <h1>Welcome to ShopEase</h1>
                <p>Your one-stop shop for all things awesome!</p>
            </header>
            <main>
                <section className="featured-products">
                    <h2>Featured Products</h2>
                    <div className="product-grid">
                        {featuredProducts.map(product => (
                            <div key={product.id} className="product-card">
                                <img src={product.imageUrl} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>${product.price.toFixed(2)}</p>
                                <Link to={`/product/${product.id}`} className="view-details">View Details</Link>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;