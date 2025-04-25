//Ví dụ 1 .product-item

{/* <div class="product-item">
    <a href="/products/laptop-asus">
        <img src="../img/products.jpg" alt="Product Title">
        Product Title
        <!-- Thanh action hiển thị khi hover -->
        <div class="product-action-bar">
            <button class="action-icon">
                icon
            </button>
            <button class="action-icon">
                icon
            </button>
        </div>
    </a>
    <div class="product-price">
        <span class="price">15.990.000₫</span>
        <span class="compare-price">19.990.000₫</span>
    </div>
    <span class="discount">- 20%</span>
</div> */}

// Biến lưu trữ modal chung
let quickViewModal = null;

//Hàm tạo .product-item như trên bằng js
function createProductItem(element, listItem) {
    const {
        title = 'Sản phẩm',
        imageSrc = '',
        linkHref = '#',
        price = '',
        comparePrice = ''
    } = listItem;

    //Tạo thẻ div với class product-item
    const productItem = document.createElement('div');
    productItem.className = 'product-item';

    //Tạo thẻ a dẫn đến link sản phẩm và img của sản phẩm
    const link = document.createElement('a');
    link.href = `../html/productDetails.html?product=${encodeURIComponent(title)}`;

    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Lưu vào localStorage
        localStorage.setItem('selectedProduct', JSON.stringify(listItem));
    
        // Điều hướng
        window.location.href = `../html/productDetails.html?product=${encodeURIComponent(title)}`;
    });
        

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = title;
    link.appendChild(img);

    // Tạo div chứa action khi hover (ẩn mặc định, hiện khi hover)
    const actionBar = document.createElement('div');
    actionBar.className = 'product-action-bar';

    // Nút giỏ hàng
    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'action-icon';
    addToCartBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 17" fill="none">
    <circle cx="9" cy="15.7368" r="1.26316" fill="#14181F"></circle>
    <circle cx="14.0526" cy="15.7368" r="1.26316" fill="#14181F"></circle>
    <path d="M2.68421 6.05273L1.8421 6.05273" stroke="#14181F" stroke-width="1.5" stroke-linecap="round"></path>
    <path d="M3.52631 11.1055L2.6842 11.1055" stroke="#14181F" stroke-width="1.5" stroke-linecap="round"></path>
    <path d="M3.52632 8.5791L1 8.5791" stroke="#14181F" stroke-width="1.5" stroke-linecap="round"></path>
    <path d="M5.01003 3.94737L6.72226 11.6163C6.87534 12.3019 7.48373 12.7895 8.18622 12.7895H14.6659C15.3684 12.7895 15.9768 12.3019 16.1299 11.6163L17.4342 5.77422C17.6435 4.83706 16.9305 3.94737 15.9703 3.94737H14.6341H12.7895M5.01003 3.94737L4.50902 2.10616C4.33133 1.45315 3.73839 1 3.06164 1H1M5.01003 3.94737H8.21804H9.42105" stroke="#14181F" stroke-width="1.5" stroke-linecap="round"></path>
    </svg>`;
    addToCartBtn.addEventListener('click', () => {
        const productData = {
            name: title,
            image: imageSrc,
            price: price,
            comparePrice: comparePrice
        };
        addToCart(productData);
    });

    // Nút xem nhanh
    const quickViewBtn = document.createElement('button');
    quickViewBtn.className = 'action-icon';
    quickViewBtn.innerHTML = `
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.7 7.99995C12.7 9.49112 11.4912 10.7 10 10.7C8.50883 10.7 7.3 9.49112 7.3 7.99995C7.3 6.50878 8.50883 5.29995 10 5.29995C11.4912 5.29995 12.7 6.50878 12.7 7.99995Z" stroke="#14181F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M1 7.99995C2.44012 4.31233 5.80243 1.69995 10 1.69995C14.1976 1.69995 17.5599 4.31233 19 7.99995C17.5599 11.6876 14.1976 14.3 10 14.3C5.80243 14.3 2.44012 11.6876 1 7.99995Z" stroke="#14181F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>`;

    // Add event listener for quick view button to create modal
    // Add event listener for quick view button to show/update modal
    quickViewBtn.addEventListener('click', () => {
        // If modal doesn't exist, create it
        if (!quickViewModal) {
            // Create modal overlay
            quickViewModal = document.createElement('div');
            quickViewModal.className = 'modal-overlay';

            // Create modal content container
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            quickViewModal.appendChild(modalContent);

            // Close modal when clicking outside the content
            quickViewModal.addEventListener('click', (e) => {
                if (e.target === quickViewModal) {
                    quickViewModal.style.display = 'none';
                }
            });

            // Append modal to body
            document.body.appendChild(quickViewModal);
        }

        // Get modal content container
        const modalContent = quickViewModal.querySelector('.modal-content');

        // Update modal content using innerHTML
        modalContent.innerHTML = `
            <div class="modal-content-left">
                <img src="${imageSrc}" alt="${title}" class="modal-image">
            </div>
            <div class="modal-content-right">
                <h2 class="modal-title">${title}</h2>
                <p class="modal-brand-info">Thương hiệu: Insta360 | Mã sản phẩm: Đang cập nhật</p>
                <div class="modal-price-box">
                    <p class="modal-price">${price}</p>
                    ${comparePrice ? `<p class="modal-compare-price">${comparePrice}</p>` : ''}
                </div>
                <div class="modal-content-color-box">
                    Màu sắc:
                    <div class="modal-content-color">
                        <button class="btn btn-outline-dark">Đen</button>
                        <button class="btn btn-outline-dark">Xanh</button>
                    </div>
                </div>
                <div class="modal-add-cart">
                    <input type="number" class="form-control w-25" value="1" min="1">
                    <button class="btn btn-dark">Thêm vào giỏ hàng</button>
                </div>
                <button class="modal-close-btn">Đóng</button>
            </div>
        `;

        const addToCartBtn = modalContent.querySelector('.modal-add-cart button');
        addToCartBtn.addEventListener('click', () => {
            const productData = {
                name: title,
                image: imageSrc,
                price: price,
                comparePrice: comparePrice
            };
            addToCart(productData);
        });

        // Add event listener for the close button
        const closeButton = modalContent.querySelector('.modal-close-btn');
        closeButton.addEventListener('click', () => {
            quickViewModal.style.display = 'none';
        });

        // Show the modal
        quickViewModal.style.display = 'flex';
    });

    // Thêm nút vào action bar
    actionBar.appendChild(addToCartBtn);
    actionBar.appendChild(quickViewBtn);

    // Thêm action bar 
    productItem.appendChild(actionBar);


    // Thêm title cho sản phẩm ở thẻ a
    link.appendChild(document.createTextNode(title));
    productItem.appendChild(link);

    // Tạo thẻ div với class product-price
    const priceContainer = document.createElement('div');
    priceContainer.className = 'product-price';

    const numericPrice = parsePrice(price);
    const numericComparePrice = parsePrice(comparePrice);

    // Thêm giá trị price và comparePrice cho sản phẩm ở thẻ div product-price
    if (!isNaN(numericPrice)) {
        const priceSpan = document.createElement('span');
        priceSpan.className = 'price';
        priceSpan.textContent = price;
        priceContainer.appendChild(priceSpan);
    }

    if (!isNaN(numericComparePrice)) {
        const comparePriceSpan = document.createElement('span');
        comparePriceSpan.className = 'compare-price';
        comparePriceSpan.textContent = comparePrice;
        priceContainer.appendChild(comparePriceSpan);
    }

    productItem.appendChild(priceContainer);

    // Hàm tính giá trị discount dựa trên price và comparePrice
    if (!isNaN(numericPrice) && !isNaN(numericComparePrice) && numericComparePrice > numericPrice) {
        const discountPercent = Math.round((1 - numericPrice / numericComparePrice) * 100);
        const discountSpan = document.createElement('span');
        discountSpan.className = 'discount';
        discountSpan.textContent = `- ${discountPercent}%`;
        productItem.appendChild(discountSpan);
    }

    //Thêm thẻ div với class product-item vào element
    element.appendChild(productItem);
}

// Hàm để parse giá trị từ string "50.990.000₫" → 50990000
function parsePrice(priceStr) {
    return Number(priceStr.replace(/[^\d]/g, ''));
}

function addToCart(product) {
    try {
        // Add product to cart (existing logic)
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(item => item.name === product.name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="#00C4B4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="#00C4B4" stroke-width="2"/>
                </svg>
                <p>Sản phẩm đã được thêm vào Giỏ hàng</p>
            </div>
        `;

        // Append notification to the body
        document.body.appendChild(notification);

        // Remove notification after 2 seconds
        setTimeout(() => {
            notification.remove();
        }, 2000);
    } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
}
