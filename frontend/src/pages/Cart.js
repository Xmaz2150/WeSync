import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Cart.css'; // Optional: for styling

const Cart = () => {
    // Sample cart items
    const cartItems = [
        { id: 1, name: 'Product 1', price: 29.99, quantity: 2 },
        { id: 2, name: 'Product 2', price: 49.99, quantity: 1 },
        { id: 3, name: 'Product 3', price: 15.49, quantity: 3 },
    ];

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty. <Link to="/">Continue Shopping</Link></p>
            ) : (
                <>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                <span>{item.name}</span> - 
                                <span>${item.price.toFixed(2)}</span> x 
                                <span>{item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    <hr />
                    <h2>Total: ${total.toFixed(2)}</h2>
                    <Link to="/checkout">Proceed to Checkout</Link>
                </>
            )}
        </div>
    );
};

export default Cart;