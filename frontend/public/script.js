// Add click event listener to all heart icons
document.querySelectorAll('.heart-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      // Toggle the 'liked' class to change color
      this.classList.toggle('liked');
  
      const productId = this.getAttribute('data-product-id');
      
      // Check if the item is liked or unliked
      if (this.classList.contains('liked')) {
        addToWishlist(productId); // Add to wishlist if liked
      } else {
        removeFromWishlist(productId); // Remove from wishlist if unliked
      }
    });
  });
  
  function toggleLike(element) {
        element.classList.toggle('liked');
        if (element.classList.contains('liked')) {
            element.style.color = 'red'; // Change heart color to red when liked
            // Add item to wishlist or shopping cart logic here
        } else {
            element.style.color = 'black'; // Change heart color back when unliked
            // Remove item from wishlist or shopping cart logic here
        }
    }
    
  // Function to add product to wishlist (can be extended to add to the shopping cart)
  function addToWishlist(productId) {
    console.log(`Product ${productId} added to wishlist.`);
    // You can also store it in localStorage or send it to a backend
    // Example: Save to localStorage (as an array)
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }
  
  // Function to remove product from wishlist
  function removeFromWishlist(productId) {
    console.log(`Product ${productId} removed from wishlist.`);
    // Remove from localStorage or backend
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

  function addToWishlist(productId) {
  // Example of sending a request to a server to add the product to the wishlist
  fetch(`/add-to-wishlist/${productId}`, {
    method: 'POST',
  }).then(response => {
    if (response.ok) {
      console.log(`Product ${productId} added to wishlist on server.`);
    }
  });
}