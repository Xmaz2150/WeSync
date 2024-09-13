import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Checkout.css'; // Optional: for styling

const Checkout = () => {
    const history = useHistory();

    // Dummy data for cart items
    const cartItems = [
        { id: 1, name: 'Product 1', price: 20, quantity: 2 },
        { id: 2, name: 'Product 2', price: 15, quantity: 1 },
    ];

    const handleCheckout = (e) => {
        e.preventDefault();
        // Implement checkout logic here
        history.push('/thank-you'); // Redirect to thank you page or confirmation page
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="checkout">
            <header className="checkout-header">
                <h1>Checkout</h1>
            </header>
            <main>
                <section className="cart-summary">
                    <h2>Cart Summary</h2>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                {item.name} - ${item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${calculateTotal().toFixed(2)}</p>
                </section>
                <section className="checkout-form">
                    <h2>Shipping Information</h2>
                    <form onSubmit={handleCheckout}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="payment">Payment Method:</label>
                            <select id="payment" required>
                                <option value="credit-card">Credit Card</option>
                                <option value="paypal">PayPal</option>
                            </select>
                        </div>
                        <button type="submit" className="checkout-button">Complete Purchase</button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Checkout;