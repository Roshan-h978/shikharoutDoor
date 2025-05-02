document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Regular Fit Long Sleeve Top',
            price: 38.99,
            image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
            category: 'hot',
            rating: 5,
            colors: ['#224F34', '#6a977c', '#335340']
        },
        {
            id: 2,
            name: 'Tailored Jacket',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
            category: 'new',
            rating: 4.8,
            colors: ['#000000', '#454545', '#6a977c']
        },
        {
            id: 3,
            name: 'Printed Loose T-shirt',
            price: 29.99,
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
            category: 'sale',
            salePrice: 24.99,
            rating: 4.9,
            colors: ['#E53E3E', '#224F34', '#FFFFFF']
        },
        {
            id: 4,
            name: 'Summer Wind Crop Shirt',
            price: 45.99,
            image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            category: 'hot',
            rating: 5,
            colors: ['#224F34', '#6a977c', '#335340']
        },
        {
            id: 5,
            name: 'Solid Round Neck T-shirt',
            price: 22.99,
            image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
            category: 'new',
            rating: 4.5,
            colors: ['#000000', '#454545', '#E53E3E']
        },
        {
            id: 6,
            name: 'Designer Watch',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            category: 'accessories',
            rating: 4.7,
            colors: ['#000000', '#454545', '#E53E3E']
        },
        {
            id: 7,
            name: 'Casual Denim Jacket',
            price: 65.99,
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80',
            category: 'new',
            rating: 4.6,
            colors: ['#224F34', '#6a977c', '#335340']
        },
        {
            id: 8,
            name: 'Leather Crossbody Bag',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=738&q=80',
            category: 'accessories',
            rating: 4.8,
            colors: ['#000000', '#454545', '#E53E3E']
        }
    ];

    // Shopping cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Initialize countdown timer
    initializeCountdown();

    // Initialize newsletter form
    initializeNewsletter();

    // Display best selling products
    const bestSellingContainer = document.querySelector('.best-selling .row');
    const bestSellingProducts = products.filter(product => product.rating >= 4.8);
    
    bestSellingProducts.forEach(product => {
        bestSellingContainer.appendChild(createProductCard(product));
    });

    // Display products by category
    const displayProductsByCategory = (category) => {
        const container = document.querySelector(`#${category} .row`);
        container.innerHTML = '';
        
        const filteredProducts = products.filter(product => 
            category === 'sale' ? product.salePrice : 
            category === 'hot' ? product.rating >= 4.8 :
            category === 'new' ? product.category === 'new' :
            product.category === 'accessories'
        );
        
        filteredProducts.forEach(product => {
            container.appendChild(createProductCard(product));
        });
    };

    // Initialize all product tabs
    ['sale', 'hot', 'new', 'accessories'].forEach(category => {
        displayProductsByCategory(category);
    });

    // Create product card HTML
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
        
        card.innerHTML = `
            <div class="product-card">
                ${product.salePrice ? `<span class="sale-badge">SALE</span>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h5 class="product-title">${product.name}</h5>
                    <div class="product-price">
                        ${product.salePrice ? 
                            `<span class="text-danger">$${product.salePrice}</span> 
                            <span class="text-decoration-line-through text-muted ms-2">$${product.price}</span>` : 
                            `$${product.price}`}
                    </div>
                    <div class="product-rating">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                        ${product.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                        ${'<i class="far fa-star"></i>'.repeat(5 - Math.ceil(product.rating))}
                        <span class="ms-1">(${product.rating})</span>
                    </div>
                    <div class="color-options mb-3">
                        ${product.colors.map(color => 
                            `<span class="color-dot" style="background-color: ${color}"></span>`
                        ).join('')}
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        return card;
    }

    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            updateCart();
            showAddedToCartToast(product.name);
        }
        
        // Cart icon click
        if (e.target.closest('.fa-shopping-cart') || e.target.classList.contains('cart-count')) {
            const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
            updateCartModal();
            cartModal.show();
        }
        
        // Remove item from cart
        if (e.target.classList.contains('remove-item')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== productId);
            updateCart();
            updateCartModal();
        }
        
        // Update quantity in cart
        if (e.target.classList.contains('quantity-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const action = e.target.getAttribute('data-action');
            const item = cart.find(item => item.id === productId);
            
            if (action === 'increase') {
                item.quantity += 1;
            } else if (action === 'decrease' && item.quantity > 1) {
                item.quantity -= 1;
            }
            
            updateCart();
            updateCartModal();
        }
        
        // Proceed to checkout
        if (e.target.classList.contains('proceed-checkout') && cart.length > 0) {
            window.location.href = 'checkout.html';
        }
    });

    // Update cart count in navbar
    function updateCart() {
        const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = cartCount;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Update cart modal content
    function updateCartModal() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartSubtotal = document.querySelector('.cart-subtotal');
        const cartTotal = document.querySelector('.cart-total');
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center py-4">
                    <p>Your cart is empty</p>
                    <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
                </div>
            `;
            cartSubtotal.textContent = '$0.00';
            cartTotal.textContent = '$0.00';
            return;
        }
        
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;
        
        cart.forEach(item => {
            const price = item.salePrice || item.price;
            const itemTotal = price * item.quantity;
            subtotal += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item d-flex mb-4';
            cartItem.innerHTML = `
                <div class="flex-shrink-0">
                    <img src="${item.image}" alt="${item.name}" width="80" height="80" class="rounded">
                </div>
                <div class="flex-grow-1 ms-3">
                    <h6 class="mb-1">${item.name}</h6>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="quantity-controls d-flex align-items-center">
                            <button class="btn btn-sm btn-outline-secondary quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                            <span class="mx-2">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                        </div>
                        <div>
                            <span class="fw-bold">$${(price * item.quantity).toFixed(2)}</span>
                            <button class="btn btn-sm btn-link text-danger remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        cartTotal.textContent = `$${subtotal.toFixed(2)}`; // Assuming free shipping
    }

    // Show "added to cart" toast notification
    function showAddedToCartToast(productName) {
        // Create toast element if it doesn't exist
        if (!document.getElementById('toastNotification')) {
            const toast = document.createElement('div');
            toast.id = 'toastNotification';
            toast.className = 'toast align-items-center text-white bg-success position-fixed bottom-0 end-0 m-3';
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'assertive');
            toast.setAttribute('aria-atomic', 'true');
            toast.innerHTML = `
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="fas fa-check-circle me-2"></i>
                        <span class="toast-message">${productName} added to cart</span>
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            `;
            document.body.appendChild(toast);
        } else {
            // Update existing toast message
            document.querySelector('.toast-message').textContent = `${productName} added to cart`;
        }
        
        // Show toast
        const toast = new bootstrap.Toast(document.getElementById('toastNotification'));
        toast.show();
    }

    // Initialize countdown timer
    function initializeCountdown() {
        // Set countdown to 3 days from now
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 3);
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            // Display results
            document.querySelector('.days').textContent = days.toString().padStart(2, '0');
            document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
            document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
            
            // If countdown is finished
            if (distance < 0) {
                clearInterval(countdownTimer);
                document.querySelector('.countdown-timer').innerHTML = '<p class="text-danger">Offer expired!</p>';
            }
        }
        
        // Update immediately and then every second
        updateCountdown();
        const countdownTimer = setInterval(updateCountdown, 1000);
    }

    // Initialize newsletter form
    function initializeNewsletter() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                
                if (email && validateEmail(email)) {
                    // In a real app, you would send this to your server
                    console.log('Subscribed email:', email);
                    
                    // Show success message
                    const toast = document.createElement('div');
                    toast.className = 'toast align-items-center text-white bg-success position-fixed bottom-0 end-0 m-3';
                    toast.setAttribute('role', 'alert');
                    toast.innerHTML = `
                        <div class="d-flex">
                            <div class="toast-body">
                                <i class="fas fa-check-circle me-2"></i>
                                Thanks for subscribing!
                            </div>
                            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    `;
                    document.body.appendChild(toast);
                    
                    const bsToast = new bootstrap.Toast(toast);
                    bsToast.show();
                    
                    // Remove toast after it hides
                    toast.addEventListener('hidden.bs.toast', function() {
                        toast.remove();
                    });
                    
                    // Reset form
                    this.reset();
                } else {
                    // Show error message
                    const toast = document.createElement('div');
                    toast.className = 'toast align-items-center text-white bg-danger position-fixed bottom-0 end-0 m-3';
                    toast.setAttribute('role', 'alert');
                    toast.innerHTML = `
                        <div class="d-flex">
                            <div class="toast-body">
                                <i class="fas fa-exclamation-circle me-2"></i>
                                Please enter a valid email address
                            </div>
                            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    `;
                    document.body.appendChild(toast);
                    
                    const bsToast = new bootstrap.Toast(toast);
                    bsToast.show();
                    
                    // Remove toast after it hides
                    toast.addEventListener('hidden.bs.toast', function() {
                        toast.remove();
                    });
                }
            });
        }
    }

    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Initialize cart count on page load
    updateCart();
});
 // Shop page specific JavaScript
 document.addEventListener('DOMContentLoaded', function() {
    // Load products for shop page
    const productsGrid = document.getElementById('productsGrid');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Update price range display
    const priceRange = document.getElementById('priceRange');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    priceRange.addEventListener('input', function() {
        const value = this.value;
        maxPrice.textContent = `$${value}`;
    });
});

// Reuse the createProductCard function from script.js
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col-lg-4 col-md-6 mb-4';
    
    card.innerHTML = `
        <div class="product-card">
            ${product.salePrice ? `<span class="sale-badge">SALE</span>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h5 class="product-title">${product.name}</h5>
                <div class="product-price">
                    ${product.salePrice ? 
                        `<span class="text-danger">$${product.salePrice}</span> 
                        <span class="text-decoration-line-through text-muted ms-2">$${product.price}</span>` : 
                        `$${product.price}`}
                </div>
                <div class="product-rating">
                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                    ${product.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    ${'<i class="far fa-star"></i>'.repeat(5 - Math.ceil(product.rating))}
                    <span class="ms-1">(${product.rating})</span>
                </div>
                <div class="color-options mb-3">
                    ${product.colors.map(color => 
                        `<span class="color-dot" style="background-color: ${color}"></span>`
                    ).join('')}
                </div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
    
    return card;
}
// Enhanced script.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    const cartSubtotal = document.querySelector('.cart-subtotal');
    const cartTotal = document.querySelector('.cart-total');
    
    // Product Database
    const products = [
      { 
        id: 1, 
        name: 'Designer Dress', 
        price: 89.99, 
        category: 'dresses', 
        image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680e956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        tags: ['sale', 'hot']
      },
      // Add more products...
    ];
  
    // Initialize all components
    function init() {
      updateCartCount();
      initProductTabs();
      initCountdownTimer();
      initMobileMenu();
      initContactForm();
      loadProducts();
      initImageZoom();
    }
  
    // Cart functionality
    function updateCartCount() {
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = count;
      cartCount.classList.add('cart-bump');
      setTimeout(() => cartCount.classList.remove('cart-bump'), 300);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    // Product loading
    function loadProducts() {
      const containers = {
        '.best-selling .row': products.filter(p => p.tags.includes('hot')).slice(0, 3),
        '#sale .row': products.filter(p => p.tags.includes('sale')),
        // Add other containers
      };
  
      Object.entries(containers).forEach(([selector, products]) => {
        renderProducts(products, selector);
      });
    }
  
    // Product rendering
    function renderProducts(products, containerSelector) {
      const container = document.querySelector(containerSelector);
      if (!container) return;
  
      container.innerHTML = products.map(product => `
        <div class="col-md-4 mb-4">
          <div class="card product-card">
            <div class="card-overlay"></div>
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">$${product.price.toFixed(2)}</p>
              ${product.tags.includes('sale') ? 
                `<span class="badge bg-danger position-absolute top-0 start-0 m-2">Sale</span>` : ''}
              <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }
  
    // Event Delegation
    document.body.addEventListener('click', async (e) => {
      if (e.target.closest('.add-to-cart')) {
        const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
        addToCart(productId);
      }
      
      if (e.target.closest('.cart-item-remove')) {
        const productId = parseInt(e.target.closest('.cart-item-remove').dataset.id);
        removeFromCart(productId);
      }
    });
  
    // Cart Management
    function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      const existingItem = cart.find(item => item.id === productId);
  
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          ...product,
          quantity: 1,
          addedAt: Date.now()
        });
      }
  
      updateCartCount();
      showAlert('Product added to cart!');
      updateCartModal();
    }
  
    // Cart Modal
    function updateCartModal() {
      const cartItems = document.querySelector('.cart-items');
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      cartItems.innerHTML = cart.length ? cart.map(item => `
        <div class="cart-item d-flex align-items-center mb-3">
          <img src="${item.image}" width="80" class="me-3">
          <div class="flex-grow-1">
            <h6>${item.name}</h6>
            <div class="d-flex align-items-center">
              <button class="btn btn-sm btn-outline-secondary cart-item-qty" data-id="${item.id}" data-action="decrement">-</button>
              <span class="mx-2">${item.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary cart-item-qty" data-id="${item.id}" data-action="increment">+</button>
            </div>
          </div>
          <div class="text-end">
            <div>$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="btn btn-link text-danger cart-item-remove" data-id="${item.id}">
              Remove
            </button>
          </div>
        </div>
      `).join('') : `
        <div class="text-center py-4">
          <p>Your cart is empty</p>
          <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
        </div>
      `;
  
      cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
      cartTotal.textContent = `$${subtotal.toFixed(2)}`;
    }
  
    // Initialize all components
    init();
  
    // Countdown Timer
    function initCountdownTimer() {
      const countDownDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days from now
      
      function updateTimer() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
  
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  
        document.querySelector('.days').textContent = days.toString().padStart(2, '0');
        document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
      }
  
      setInterval(updateTimer, 1000);
      updateTimer();
    }
  
    // Mobile Menu
    function initMobileMenu() {
      const mobileMenu = document.createElement('div');
      mobileMenu.className = 'mobile-menu p-4';
      mobileMenu.innerHTML = `
        <button class="btn btn-close mb-4"></button>
        <ul class="list-unstyled">
          <li><a href="index.html" class="d-block py-2">Home</a></li>
          <li><a href="shop.html" class="d-block py-2">Shop</a></li>
          <li><a href="features.html" class="d-block py-2">Features</a></li>
          <li><a href="contact.html" class="d-block py-2">Contact</a></li>
        </ul>
      `;
      
      document.body.appendChild(mobileMenu);
      
      document.querySelector('.navbar-toggler').addEventListener('click', () => {
        mobileMenu.classList.add('active');
      });
  
      mobileMenu.querySelector('.btn-close').addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    }
  
    // Contact Form
    function initContactForm() {
      const form = document.getElementById('contactForm');
      if (!form) return;
  
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        };
  
        // Simulate API call
        showAlert('Message sent successfully!');
        form.reset();
      });
    }
  
    // Utility Functions
    function showAlert(message, type = 'success') {
      const alert = document.createElement('div');
      alert.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
      alert.textContent = message;
      document.body.appendChild(alert);
      
      setTimeout(() => {
        alert.remove();
      }, 3000);
    }
  });
  function initImageZoom() {
    const images = document.querySelectorAll('.product-card img');
    
    images.forEach(img => {
      img.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'image-zoom-modal';
        modal.innerHTML = `
          <div class="modal-content">
            <span class="close">&times;</span>
            <img src="${img.src}" alt="Zoomed Image">
          </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close').addEventListener('click', () => {
          modal.remove();
        });
      });
    });
  }
  // Search Functionality
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.querySelector('.search-suggestions');

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value;
  if (query.length > 2) {
    const results = await fetch(`/api/products?search=${query}`)
      .then(res => res.json());
    showSuggestions(results);
  }
});

function showSuggestions(products) {
  suggestionsContainer.style.display = 'block';
  suggestionsContainer.innerHTML = products.map(product => `
    <a href="/product.html?id=${product.id}" class="list-group-item list-group-item-action">
      <div class="d-flex align-items-center">
        <img src="${product.image}" width="50" class="me-3">
        <div>
          <h6 class="mb-0">${product.name}</h6>
          <small>$${product.price}</small>
        </div>
      </div>
    </a>
  `).join('');
}


// Toggle search focus
searchTrigger.addEventListener('shown.bs.dropdown', () => {
  searchInput.focus();
  document.body.classList.add('search-active');
});

searchTrigger.addEventListener('hidden.bs.dropdown', () => {
  document.body.classList.remove('search-active');
});

// Dynamic search suggestions
searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  if (query.length > 2) {
    const results = await fetchResults(query);
    showSuggestions(results);
  } else {
    searchSuggestions.style.display = 'none';
  }
});

// Form submission
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
    searchInput.value = '';
  } else {
    searchInput.classList.add('error-shake');
    setTimeout(() => searchInput.classList.remove('error-shake'), 500);
  }
});

// Click outside handler
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) {
    const dropdown = bootstrap.Dropdown.getInstance(searchTrigger);
    if (dropdown && dropdown._isShown()) dropdown.hide();
  }
});

// Helper functions
async function fetchResults(query) {
  try {
    const response = await fetch(`/api/search?q=${query}`);
    return await response.json();
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

function showSuggestions(results) {
  searchSuggestions.innerHTML = results.map(result => `
    <a href="${result.url}" class="search-item">
      <div class="search-item-image">
        <img src="${result.image}" alt="${result.title}">
      </div>
      <div class="search-item-info">
        <h6>${result.title}</h6>
        <div class="search-item-price">$${result.price}</div>
      </div>
    </a>
  `).join('');
  searchSuggestions.style.display = results.length ? 'block' : 'none';
}
