import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css'; // Importing global styles

const Header = () => {
    return (
        <header>
            <h1>Welcome to ShopEase</h1>
            <div className="icon-container">
                <Link to="/signin">
                    <i className="fas fa-user"></i>
                </Link>
                <Link to="/wishlist">
                    <i className="fas fa-heart"></i>
                </Link>
                <Link to="/cart">
                    <i className="fas fa-shopping-bag"></i>
                </Link>
            </div>
        </header>
    );
};

export default Header;