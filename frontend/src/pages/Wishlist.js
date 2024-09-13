import React from 'react';

const Wishlist = () => {
    // Dummy data for the wishlist
    const wishlistItems = [
        { id: 1, name: 'Stylish Sunglasses', price: '$15.99', imageUrl: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Leather Wallet', price: '$29.99', imageUrl: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Bluetooth Headphones', price: '$59.99', imageUrl: 'https://via.placeholder.com/150' }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Your Wishlist</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {wishlistItems.map(item => (
                    <li key={item.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                        <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '15px' }} />
                        <span style={{ fontWeight: 'bold' }}>{item.name}</span> - {item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;
