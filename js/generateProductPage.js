const fs = require("fs");

function normalizeTitle(title) {
    const vietnameseMap = {
        'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
        'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a', 'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
        'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e', 'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
        'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o', 'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
        'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u', 'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
        'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A', 'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
        'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A', 'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
        'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E', 'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
        'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O', 'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
        'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O', 'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
        'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U', 'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y'
    };
    return title
        .split('')
        .map(char => vietnameseMap[char] || char)
        .join('')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

function generateProductDetailHTML({ title, imageSrc, price, comparePrice, descriptionHTML, category }) {
    // const sanitizedTitle = title.toLowerCase().replace(/[^\w]+/g, '-');
    const normalizedTitle = normalizeTitle(title);
    const fileName = `chi-tiet-${normalizedTitle}.html`;

    // Xác định danh sách sản phẩm cùng loại
    let listName = category.toLowerCase();
    let listId = `${listName}-products`;

    return {
        fileName,
        content: `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="../css/customCSS/productDetails.css">
    <link rel="stylesheet" href="../css/customCSS/all.css">
    <link rel="stylesheet" href="../css/customCSS/productItem.css">
    <link rel="stylesheet" href="../css/fontawesome/fontawesomepro6.4.2.css">
    <link rel="stylesheet" href="../css/bootstrap/bootstrap.css">
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
    <script src="../js/fontawesome6.7.2.js"></script>
</head>
<body>
<div class="container-fluid p-0">
    <header>
        <a href="../html/home.html"><img class="logo" src="../img/logo.webp" alt="Logo"></a>
        <form action="#">
            <input type="text" name="search" id="search" placeholder="Tìm kiếm sản phẩm ...">
            <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
        <div class="header-right">
            <div class="call">
                <i class="fa-solid fa-phone-volume" style="color: #ffffff;"></i>
                <a href="#">
                    <small>Gọi mua hàng</small><br>
                    <small>1900 1234</small>
                </a>
            </div>
            <div class="login">
                <i class="fa-regular fa-user"></i>
                <span>
                    <a href="#"><small>Tài khoản</small></a><br>
                    <a href="../html/login.html"><small>Đăng nhập</small></a>
                </span>
            </div>
            <a href="../html/cart.html" class="cart-wrapper">
                <div class="cart" id="cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <small>Giỏ hàng</small>
                </div>
            </a>
        </div>
    </header>
    <nav>
        <ul>
            <li>
                <i class="fa-solid fa-list"></i> DANH MỤC SẢN PHẨM
                <ul class="submenu">
                    <li><a href="../html/CategoryCamera.html">Máy ảnh</a></li>
                    <li><a href="../html/CategoryLens.html">Ống kính</a></li>
                    <li><a href="../html/CategoryCamcorder.html">Máy quay phim</a></li>
                    <li><a href="../html/CategoryAccessories.html">Phụ kiện máy ảnh</a></li>
                    <li><a href="../html/CategoryDrone.html">Drone</a></li>
                </ul>
            </li>
            <li class="active"><a href="../html/home.html">Trang chủ</a></li>
            <li><a href="../html/introduction.html">Giới thiệu</a></li>
            <li>
                <a href="../html/allProducts.html">Sản phẩm</a>
                <ul class="submenu-products">
                    <li><a href="../html/newProducts.html">Sản phẩm mới</a></li>
                    <li><a href="../html/featuredProducts.html">Sản phẩm nổi bật</a></li>
                </ul>
            </li>
            <li><a href="../html/contact.html">Liên hệ</a></li>
        </ul>
    </nav>
    <section class="product-detail-wrapper">
        <div class="product-detail-img">
            <img src="${imageSrc}" alt="${title}">
        </div>
        <div class="product-detail-info">
            <h1>${title}</h1>
            <small class="brand">Thương hiệu: <b>Đang cập nhật</b></small>
            <div class="product-detail-price">
                <span class="product-detail-price">${price}</span>
                ${comparePrice ? `<span class="product-detail-compare-price">${comparePrice}</span>` : ""}
            </div>
            <small class="vat">Giá đã bao gồm VAT</small>
            <div class="quantity">Số lượng: <input type="number" class="form-control" value="1"></div>
            <button class="btn btn-danger w-100">MUA NGAY</button>
            <div class="button-group">
                <button class="btn btn-primary w-50" id="cartBtn">THÊM VÀO GIỎ HÀNG</button>
                <button class="btn btn-primary w-50">TRẢ GÓP</button>
            </div>
            <div class="promotion">
                    <div class="promotion-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                            <path
                                d="M1.3125 11.026V19.3155C1.3125 20.0782 1.90181 20.6971 2.625 20.6971H9.1875V11.026H1.3125Z"
                                fill="#D23535"></path>
                            <path
                                d="M19.6875 5.49972H15.5348C15.8327 5.28557 16.0886 5.07281 16.2671 4.88215C17.3263 3.76169 17.3263 1.93801 16.2671 0.81755C15.2381 -0.273898 13.4453 -0.271134 12.4176 0.81755C11.8479 1.41854 10.3386 3.86531 10.5473 5.49972H10.4528C10.6601 3.86531 9.15075 1.41854 8.58244 0.81755C7.55344 -0.271134 5.76056 -0.271134 4.73287 0.81755C3.675 1.93801 3.675 3.76169 4.73156 4.88215C4.91138 5.07281 5.16731 5.28557 5.46525 5.49972H1.3125C0.589312 5.49972 0 6.12005 0 6.8813V8.95367C0 9.33498 0.294 9.64446 0.65625 9.64446H9.1875V6.8813H11.8125V9.64446H20.3438C20.706 9.64446 21 9.33498 21 8.95367V6.8813C21 6.12005 20.412 5.49972 19.6875 5.49972ZM9.11006 5.45413C9.11006 5.45413 9.05494 5.49972 8.86725 5.49972C7.96031 5.49972 6.22913 4.50775 5.66344 3.90814C5.1135 3.32511 5.1135 2.37459 5.66344 1.79156C5.92987 1.50972 6.28294 1.35498 6.65831 1.35498C7.03237 1.35498 7.38544 1.50972 7.65188 1.79156C8.5365 2.72827 9.41588 5.12117 9.11006 5.45413ZM12.1314 5.49972C11.9451 5.49972 11.8899 5.45551 11.8899 5.45413C11.5841 5.12117 12.4635 2.72827 13.3481 1.79156C13.8771 1.22926 14.8024 1.2265 15.3366 1.79156C15.8878 2.37459 15.8878 3.32511 15.3366 3.90814C14.7709 4.50775 13.0397 5.49972 12.1314 5.49972Z"
                                fill="#D23535"></path>
                            <path
                                d="M11.8125 11.026V20.6971H18.375C19.0995 20.6971 19.6875 20.0782 19.6875 19.3155V11.026H11.8125Z"
                                fill="#D23535"></path>
                        </svg>
                        KHUYẾN MÃI
                    </div>
                    <div class="promotion-list">
                        <ul>
                            <li>Nhập mã LOFI thêm 5% đơn hàng</li>
                            <li>Giảm giá 10% khi mua từ sản phẩm thứ 2</li>
                            <li>Tặng phiếu mua hàng khi mua từ 1000k</li>
                            <li>Đổi trả hàng trong vòng 30 ngày</li>
                        </ul>
                    </div>
                </div>
        </div>
    </section>

    <div class="product-description" id="productDesc">
        <div class="desc-content collapsed">
            ${descriptionHTML || '<p>Đang cập nhật mô tả sản phẩm...</p>'}
        </div>
        <div class="desc-fade"></div>
        <div class="toggle-btn-wrapper">
            <button id="toggleDescBtn">Xem thêm</button>
        </div>
    </div>

    <section class="section-products">
        <a href="#">Sản phẩm cùng loại</a>
        <div class="product-wrapper" id="${listId}">
            <!-- render bằng js -->
        </div>
    </section>
    <footer>
        <div class="footer-wrapper">
            <div class="footer-info">
                <div class="footer-logo">
                    <img src="../img/logo-footer.webp" alt="Logo">
                </div>
                <div class="item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.58867 13.1879C2.56119 12.5189 2.44466 9.69477 4.41012 8.86094L17.7759 3.19061C19.691 2.37814 21.6219 4.30899 20.8094 6.22409L15.1391 19.5899C14.3052 21.5553 11.4811 21.4388 10.8121 19.4113L9.26792 14.7321L4.58867 13.1879Z"
                            stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <p>Địa chỉ</p>
                </div>
                <div class="item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.42459 3.23775C7.51203 2.76707 8.77662 3.00825 9.61449 3.84612L9.9591 4.19073C11.0636 5.29519 11.3313 6.98519 10.6223 8.37694L9.97022 9.65693C9.58386 10.4153 9.72975 11.3363 10.3316 11.9381L12.0619 13.6684C12.6637 14.2702 13.5847 14.4161 14.3431 14.0298L15.6231 13.3777C17.0148 12.6687 18.7048 12.9364 19.8093 14.0409L20.1539 14.3855C20.9918 15.2234 21.2329 16.488 20.7623 17.5754C19.4986 20.4948 16.2974 21.9789 13.6038 20.2867C11.9845 19.2694 10.0931 17.8454 8.12386 15.8761C6.15459 13.9069 4.73063 12.0155 3.71332 10.3962C2.02107 7.70255 3.50523 4.50135 6.42459 3.23775Z"
                            stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <p>1900 xxxx</p>
                </div>
                <div class="item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 6.35418C4.73294 5.52375 5.80531 5 7 5H17C18.0144 5 18.9407 5.37764 19.6458 6M4 6.35418C3.37764 7.05931 3 7.98555 3 9V15C3 17.2091 4.79086 19 7 19H17C19.2091 19 21 17.2091 21 15V9C21 7.80531 20.4762 6.73294 19.6458 6M4 6.35418L12 13L19.6458 6"
                            stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <p>support@example.com</p>
                </div>
            </div>
            <div class="footer-about">
                <div class="footer-about-title">
                    VỀ CHÚNG TÔI
                </div>
                <ul>
                    <li><a href="../html/home.html">Trang chủ</a></li>
                    <li><a href="../html/introduction.html">Giới thiệu</a></li>
                    <li><a href="../html/allProducts.html">Sản phẩm</a></li>
                    <li><a href="../html/contact.html">Liên hệ</a></li>
                </ul>
            </div>
            <div class="footer-policy">
                <div class="footer-about-title">
                    CHÍNH SÁCH
                </div>
                <ul>
                    <li><a href="#">Chính sách giao hàng</a></li>
                    <li><a href="#">Chính sách đổi trả</a></li>
                    <li><a href="#">Chính sách bán hàng</a></li>
                    <li><a href="#">Hướng dẫn trả góp</a></li>
                </ul>
            </div>
            <div class="footer-advise-payment-wrapper">
                <div class="footer-advise">
                    <div class="footer-advise-title">
                        TƯ VẤN KHÁCH HÀNG
                    </div>
                    <ul>
                        <li><a href="#">Mua hàng: 1900 6750</a></li>
                        <li><a href="#">Khiếu nại: 1900 6750</a></li>
                        <li><a href="#">Bảo hành: 1900 6750</a></li>
                    </ul>
                </div>
                <div class="footer-payment">
                    <div class="footer-payment-title">
                        PHƯƠNG THỨC THANH TOÁN
                    </div>
                    <div class="footer-payment-list">
                        <img src="../img/payment/icon_payment_1.webp" alt="Payment">
                        <img src="../img/payment/icon_payment_2.webp" alt="Payment">
                        <img src="../img/payment/icon_payment_3.webp" alt="Payment">
                        <img src="../img/payment/icon_payment_4.webp" alt="Payment">
                    </div>
                </div>
            </div>
        </div>
    </footer>
</div>
    <script>
        const toggleBtn = document.getElementById("toggleDescBtn");
        const descContent = document.querySelector(".desc-content");
        const fadeEffect = document.querySelector(".desc-fade");
        
        toggleBtn.addEventListener("click", function () {
            const isCollapsed = descContent.classList.contains("collapsed");

            if (isCollapsed) {
                // Mở rộng
                descContent.style.maxHeight = descContent.scrollHeight + "px";
                fadeEffect.style.display = "none";
                } else {
                // Thu gọn
                descContent.style.maxHeight = "400px";
                fadeEffect.style.display = "block";
            }

            descContent.classList.toggle("collapsed");
            toggleBtn.textContent = isCollapsed ? "Thu gọn" : "Xem thêm";
        });
    </script>
</body>
<script>
    function addToCart(product, quantity) {
        try {
            if (quantity <= 0) {
                alert("Vui lòng chọn số lượng hợp lệ!");
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existing = cart.find(item => item.name === product.name);
            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push({ ...product, quantity: quantity });
            }
            localStorage.setItem('cart', JSON.stringify(cart));

            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.innerHTML = "<div class='notification-content'>" +
                "<svg width='40' height='40' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>" +  
                "<path d='M5 13L9 17L19 7' stroke='#00C4B4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>" +  
                "<circle cx='12' cy='12' r='10' stroke='#00C4B4' stroke-width='2'/>" +   
                "</svg>" +
                "<p>Đã thêm " + quantity + " sản phẩm vào Giỏ hàng</p>" +
            "</div>";
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.remove();
            }, 2000);
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
        }
    }

    document.querySelector("#cartBtn").addEventListener("click", function () {
        const quantityInput = document.querySelector(".quantity input[type='number']");
        const quantity = parseInt(quantityInput.value, 10);

        const productData = {
			name: "${title}",
			image: "${imageSrc}",
			price: "${price}",
			comparePrice: "${comparePrice}"
        };

        addToCart(productData, quantity);
    });

    // Không cho phép nhập số âm
    const quantityInput = document.querySelector(".quantity input[type='number']");
    quantityInput.addEventListener("input", function () {
        if (this.value < 1) {
            this.value = 1;
        }
    });
</script>
<script src="../js/createElementProductItem.js"></script>
<script src="../js/defineListProducts.js"></script>
<script>
    for (const item of ${listName}.slice(0, 5)) {
        createProductItem(document.getElementById("${listId}"), item);
    }
</script>
</html>
    `
    }
}
const products = [
    {
        title: 'Máy ảnh Nikon D850 (Body Only)',
        imageSrc: '../img/products/Camera/nikon-d8502-500x500.jpg',
        price: '50.990.000₫',
        comparePrice: '57.990.000₫',
        descriptionHTML: `<h3><strong>Sức mạnh mới đến từ Nikon D850</strong></h3>
                            <p>Sau 3 năm kể từ ngày ra mắt D810, Nikon đã giới thiệu thế hệ tiếp theo tới người tiêu dùng trên thế giới chiếc Nikon D850 vào cuối tháng 08/2017. D850 của Nikon được kỳ vọng là chiếc máy ảnh FullFrame đầu tiên của hãng có khả năng tối ưu giữa độ phân giải hình ảnh cao, tốc độ xử lý và hiệu suất hoạt động của máy. Đây cũng là chiếc máy ảnh FullFrame đầu tiên trên thế giới có khả năng quay video Timelapse độ phân giải 8K.</p>
                            <p><img alt="nikon-d850-body-chính-hãng" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d850/nikon-d850-body-chinh-hang.jpg"></p>
                            <h3><strong>Cảm biến FullFrame BSI CMOS 45.7MP và Bộ xử lý EXPEED 5</strong></h3>
                            <p>Chiếc máy ảnh DSLR đầu bảng của Nikon được trang bị Cảm biến FullFrame BSI CMOS 45.7MP và Bộ xử lý hình ảnh EXPEED 5 mới nhất của hãng. Đây là lần đầu tiên Nikon trang bị một độ phân giải siêu cao cho chiếc máy ảnh FullFrame của mình, độ phân giải cao của máy đòi hỏi một bộ xử lý hình ảnh có tốc độ nhanh và đảm bảo hiệu suất hoạt động của máy, đó là lý do hãng đưa vi xử lý EXPEED 5 vào kết hợp để mang lại một chất lượng ảnh cao kèm theo màu sắc và độ tương phản sống động. Cảm biến của máy cũng được loại bỏ bộ lọc quang thông thấp ( Optical Lowpass Filter ) để mang lại hình ảnh nhiều chi tiết hơn.</p>
                            <p><img alt="Nikon-D850-sensor" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d850/nikon-d850-sensor.jpg"></p>
                            <p>Máy có ISO tiêu chuẩn từ 100-25.600 và có thể mở rộng lên 32-102.400, máy đạt được tốc độ chụp liên tiếp 7 khung hình/giây , nếu được gắn thêm Grip, máy có thể chụp liên tiếp lên đến 9 khung hình/giây ở độ phân giải đầy đủ. Ngoài ra máy sẽ đạt tốc độ chụp 30 khung hình/giây nếu đưa về chế độ Crop giống cảm biến DX.</p>
                            <h3><strong>Hệ thống Multi-CAM 20K 153 điểm lấy nét</strong></h3>
                            <p>Nikon trang bị cho D850 hệ thống lấy nét 153 điểm lấy nét theo pha, trong đó có 99 điểm Crosstype để tăng cường phát hiện chuyển động của vật thể và 15 điểm hỗ trợ khẩu f/8. Hệ thống lấy nét mới giúp D850 lấy nét nhanh chóng và chính xác ngay cả trong điều kiện ánh sáng yếu hay vật thể đang di chuyển nhanh đồng thời hỗ trợ lấy nét liên tục trong quá trình quay video. Máy có thể lấy nét trong điều kiện ánh sáng yếu tới −4EV và cả với những chủ thể có độ tương phản rất thấp.</p>
                            <p><img alt="nikon-d850-153-points-af-system" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d850/nikon-d850-153-points-af-system.jpg"></p>
                            <h3><strong>Quay video 4K UHD và Timelapse 8K</strong></h3>
                            <p>Với việc được trang bị phần cứng mạnh mẽ, Nikon D850 có khả năng quay video 4K UHD tốc độ 30 fps/s hoặc Full HD tốc độ 120 fps/s. Ngoài ra máy còn có khả năng quay video 8K ở định dạng Timelapse, mô phỏng thời gian , cảnh vật trôi nhanh với độ nét và độ mịn cực cao. Máy hỗ trợ micro stereo hoặc mic ngoài tùy chọn được thêm vào qua khe cắm stereo 3.5mm để có thể kiểm soát chất lượng tốt hơn và có thể theo dõi trực tiếp âm thanh trong quá trình quay.</p>
                            <p><img alt="nikon-d850-quay-video-4K" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d850/nikon-d850-quay-video-4k.jpg"></p>
                            <p>Máy cũng được trang bị màn hình cảm ứng xoay lật đa chiều , giúp người dùng dễ dàng bố cục trong nhiều góc quay khó để tạo ra những thước Film mượt mà và ấn tượng.</p>
                            <p><img alt="nikon-d850-màn-hình-cảm-ứng-touch-screen" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d850/nikon-d850-man-hinh-cam-ung-touch-screen.jpg"></p>
                            <h3><strong>Tích hợp SnapBridge Wifi, NFC và Bluetooth</strong></h3>
                            <p>D850 được trang bị những kết nối không dây thông dụng như Wifi, NFC , Bluetooth giúp chuyển hình ảnh và video nhanh chóng qua các thiết bị di động như Smartphone hay Tablet.</p>
                            <p><img alt="snapbridge-nikon-d850" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d850/snapbridge-nikon-d850.jpg"></p>
                            <h3><strong>Thiết kế bền bỉ, chuyên nghiệp của Nikon D850</strong></h3>
                            <p>D850 hướng đến những nhiếp ảnh gia chuyên nghiệp chụp ảnh thể thao, thiên nhiên, động vật hoang dã... vì vậy máy có thiết kế hầm hố với bộ khung làm bằng hợp kim chắc chắn, có khả năng chống chịu thời tiết, đi kèm đó là triết lý thiết kế với nhiều nút bấm ở mặt trước và sau của Nikon giúp người dùng tùy chỉnh sâu và nhanh chóng vào các chức năng của máy. Mặt sau của máy là màn hình cảm ứng LCD 3.2 inch độ phân giải 2.36 triệu điểm ảnh có khả năng xoay lật nhiều góc cho hình ảnh trung thực và sống động.</p>
                            <p><img alt="Nikon-D850-màn-hình-LCD" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d850/nikon-d850-man-hinh-lcd.jpg"></p>
                            <h3><strong>Các cổng kết nối</strong></h3>
                            <p>Máy cũng được trang bị 2 khe thẻ nhớ, 1 khe thẻ SD và 1 khe thẻ XQD với chuẩn UHS-II giúp lưu và đọc dữ liệu nhanh hơn. Pin mà máy sử dụng là Pin sạc lithium-ion EN-EL15a có thể chụp khoảng 1840 ảnh cho mỗi lần sạc. Nếu kết hợp với bộ sạc MB-D18 tùy chọn và pin EN-EL18a / b, người dùng có thể chụp được khoảng 5140 tấm ảnh cho mỗi lần sạc.</p>
                            <p><img alt="Nikon-D850--2-slots-sd-card" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d850/nikon-d850-2-slots-sd-card.jpg"></p>`,
        category: "cameras"
    },
    {
        title: 'Máy ảnh Nikon D780 + Lens 24-120mm F/4G ED Nano',
        imageSrc: '../img/products/Camera/nikon-d780-with-24-120-lens-7-500x500.jpg',
        price: '50.990.000₫',
        comparePrice: '57.990.000₫',
        descriptionHTML: `<h3><strong>Thiết kế của máy ảnh Nikon D780</strong></h3>
                            <p>Về tổng thể, có thể thấy Nikon D780 có thiết kế to và hầm hố với nhiều góc cạnh, nút bấm, trông rất chuyên nghiệp và hiện đại. D780 có trọng lượng chỉ 840 gram, kích thước 143.5 x 115.5 x 76 mm. Đặc biệt, trên phiên bản này Nikon đã loại bỏ đi đèn flash “cóc” thường xuất hiện trên các máy Nikon full-frame phiên bản trước đó, giúp cho máy có thiết kế liền mạch và kín hơn.</p>
                            <p><img alt="Thiết kế thân máy ảnh Nikon D780" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d780/nikon-d780-info-1.jpg"></p>
                            <h3><strong>Thân máy chắc chắn</strong></h3>
                            <p>Thân máy sử dụng vật liệu hợp kim magie mang lại cảm giác nhẹ nhàng nhưng vẫn chắc chắn. Nikon D780 cũng có khả năng chống bụi và hơi ẩm lọt vào nhờ trang bị lớp cao su tại các vị trí hở và nút bấm.</p>
                            <p><img alt="máy ảnh Nikon D780 - Thiết kế thân máy - ảnh 2" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d780/nikon-d780-info-2.jpg"></p>
                            <h3><strong>Màn hình cảm ứng của Nikon D780</strong></h3>
                            <p>Màn hình lật LCD cảm ứng 3.2 inch trang bị trên Nikon D780 cho phép người dùng chụp ảnh dễ dàng ở những góc cao hoặc thấp, và điều khiển trực quan các thông số cũng như thay đổi điểm lấy nét của máy ảnh.</p>
                            <p><img alt="màn hình cảm ứng của máy ảnh Nikon D780" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d780/nikon-d7804.jpg"></p>
                            <h3><strong>Các cổng kết nối trên Nikon D780</strong></h3>
                            <p>Các cổng kết nối cơ bản microphone, tai nghe, USB, dây điều khiển, mini HDMI vẫn được trang bị trên Nikon D780. Bên cạnh đó, hai khe thẻ nhớ SD chuẩn UHS-II đem đến tốc độ đọc và ghi dữ liệu nhanh chóng, linh hoạt trong quá trình lưu trữ file. Ngoài ra, Pin Lithium-Ion EN-EL15b đi kèm cho phép chụp khoảng 2260 bức ảnh cho mỗi lần sạc đầy.</p>
                            <p><img alt="Các cổng kết nối trên Nikon D780" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d780/nikon-d780-info-3.jpg"></p>
                            <h3><strong>Cảm biến BSI CMOS FX 24.5MP & Bộ xử lý EXPEED 6</strong></h3>
                            <p>Cảm biến BSI CMOS 24.5MP và bộ xử lý hình ảnh EXPEED 6 được Nikon lựa chọn cho chiếc máy ảnh DSLR D780 vì tính linh hoạt của nó. Trong đó, cảm biến full-frame CMOS 24.5MP cung cấp độ phân giải apt, tốc độ đọc nhanh và độ nhạy sáng tốt hơn khi hoạt động trong điều kiện ánh sáng yếu. Thiết kế BSI (chiếu sáng ngược) cùng bộ xử lý EXPEED 6 giúp cải thiện chất lượng hình ảnh, giảm nhiễu trong phạm vi ISO 100-51200.</p>
                            <p><img alt="Nikon D780 - Chip xử lý hình ảnh EXPEED 6" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d780/nikon-d780-info-4.jpg"></p>
                            <p>Hệ thống này cũng cho phép máy ảnh Nikon D780 chụp ảnh liên tiếp 7 khung hình/giây khi sử dụng kính ngắm quang học và 12 khung hình/giây khi chụp ảnh với chế độ liveview.</p>
                            <p><img alt="Nikon D780 - Ảnh chụp liên tiếp" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d780/nikon-d780-info-5.jpg"></p>
                            <h3><strong>Hệ thống lấy nét trên máy ảnh Nikon D780</strong></h3>
                            <p>Nikon D780 được trang bị cảm biến lấy nét Multi-CAM 3500 II, sử dụng 51 điểm lấy nét theo pha giúp phát hiện nhanh chóng và chính xác chủ thể. Hệ thống này cho phép hoạt động ở điều kiện ánh sáng yếu xuống tới -3EV. Bên cạnh đó, 15 điểm lấy nét cross-type cho độ chính xác cao trong các tình huống có độ tương phản thấp.</p>
                            <p><img alt="Nikon D780 - Hệ thống lấy nét" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d780/nikon-d780-info-6.jpg"></p>
                            <p>Ngoài ra, khi làm việc trong chế độ LiveView hoặc quay video, người dùng sẽ được trải nghiệm hệ thống lấy nét tự động Hybrid 273 điểm chiếm khoảng 90% khung hình, hỗ trợ khả năng lấy nét chính xác, nhanh chóng và mượt mà.</p>
                            <h3><strong>Quay video 4K</strong></h3>
                            <p>Bên cạnh việc chụp ảnh chất lượng cao, Nikon cũng trang bị cho máy ảnh D780 khả năng quay video 4K UHD ở các chế độ 30fps, 25fps, hoặc 24fps, và quay video Full HD 1080p tốc độ siêu cao với 120 fps giúp tạo ra những đoạn video slow motion độc đáo.</p>
                            <p><img alt="Nikon D780 - Quay phim 4K chuyên nghiệp - ảnh 1" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d780/nikon-d780-info-7.jpg"></p>
                            <p>Nikon D780 cũng tích hợp chế độ quay N-Log 10-bit, HDR (HLG) giúp tối ưu hóa phạm vi dải màu đem đến video chất lượng cao qua quá trình hậu kỳ. Bên cạnh đó, người dùng cũng có thể ghi âm bằng micro stereo có sẵn hoặc sử dụng micro ngoài để kiểm soát chất lượng tốt hơn.</p>
                            <p><img alt="Nikon D780 - Quay phim 4K chuyên nghiệp - ảnh 2" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d780/nikon-d780-info-8.jpg"></p>
                            <h3><strong>Hệ thống nhận diện cảnh và đo sáng</strong></h3>
                            <p>Hệ thống nhận dạng cảnh thông minh với đo sáng ma trận màu 3D trên Nikon D780 sử dụng cảm biến RGB 180.000 pixel để đánh giá và phân tích tất cả các khía cạnh trong một cảnh, bao gồm độ sáng, độ tương phản, khoảng cách chủ thể và màu sắc cảnh, giúp thiết lập nhanh chóng, chính xác độ phơi sáng và cân bằng trắng để hiển thị tốt nhất.</p>
                            <p><img alt="Nikon D780 - Hệ thống nhận diện cảnh" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d780/nikon-d780-info-9.jpg"></p>
                            <h3><strong>Kết nối không dây của Nikon D780</strong></h3>
                            <p>Ngoài các kết nối không dây, tính năng wifi và bluetooth cũng được tích hợp trên Nikon D780. Thông qua ứng dụng Nikon SnapBridge, người dùng có thể chia sẻ hình ảnh, video hay điều khiển máy ảnh từ xa một cách dễ dàng.</p>
                            <p><img alt="Nikon D780 - Kết nối không dây" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d780/nikon-d780-info-10.jpg"></p>`,
        category: "cameras"
    },
    {
        title: 'Máy ảnh Nikon D6 Body Only',
        imageSrc: '../img/products/Camera/nikon-d6-01-500x500.jpg',
        price: '69.990.000₫',
        comparePrice: '75.990.000₫',
        descriptionHTML: `<h3><strong>Máy ảnh Nikon D6</strong></h3>
                            <p>Thay thế cho chiếc Nikon D5 đã làm mưa làm gió trên thị trường trước đây, Nikon lại tiếp tục cho ra mắt mẫu máy ảnh DSLR mới với nhiều cải tiến vượt trội mang tên Nikon D6. Với kỳ vọng là chiếc camera có khả năng lấy nét tự động mạnh mẽ nhất từ trước đến nay, Nikon D6 hứa hẹn sẽ mang tới cho người dùng những trải nghiệm thú vị nhất.</p>
                            <p><img alt="Nikon D6 chính hãng" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d6/anh-mo-ta/may-anh-dslr-nikon-d6-body-only-9.jpg"></p>
                            <h3><strong>Thiết kế thông minh của Nikon D6</strong></h3>
                            <p>Thuộc dòng máy ảnh DSLR, Nikon D6 có thiết kế quen thuộc với tay cầm dọc vừa vặn, chắc chắn cho cảm giác cầm tay thoải mái, giúp người dùng chuyển đổi linh hoạt giữa hai chế độ chụp ngang và dọc, cho khả năng sáng tạo tối ưu.</p>
                            <p>Với chất liệu hợp kim magie có trọng lượng nhẹ nhưng vô cùng mạnh mẽ, Nikon D6 có thể hoạt động trong thời gian lâu hơn. Đồng thời có khả năng chống bụi, chịu được thời tiết khắc nghiệt nên người dùng có thể mang theo bất cứ đâu để quay chụp.</p>
                            <p>Thiết kế giao diện các nút chức năng của Nikon D6 được bố trí tương tự như trên Nikon D5 trực quan, dễ dùng và tiện dụng.</p>
                            <p><img alt="Nikon D6 - giao diện trực quan" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d6/anh-mo-ta/may-anh-dslr-nikon-d6-body-only-10.jpg"></p>
                            <h3><strong>Cảm biến CMOS và bộ xử lý hình ảnh Expeed 6</strong></h3>
                            <p>Máy ảnh được trang bị cảm biến CMOS độ phân giải 20.8MP định dạng FX kết hợp chip xử lý hình ảnh Expeed 6 giúp nâng cao chất lượng hình ảnh, hỗ trợ khử nhiễu, kiểm soát hiện tượng méo hình, gia tăng độ tương phản, cho hình ảnh rõ nét, sống động.</p>
                            <p><img alt="Nikon D6 - cảm biến CMOS" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d6/anh-mo-ta/may-anh-dslr-nikon-d6-body-only.jpg"></p>
                            <p>D6 cung cấp dải ISO tiêu chuẩn 100 – 102400, có thể mở rộng đến 50 – 3280000 cho hình ảnh thu được trên cảm biến sắc nét nhất dù chụp trong bất kỳ điều kiện ánh sáng nào.</p>
                            <p><img alt="Nikon D6 - bộ xử lý hình ảnh Expeed 6" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d6/anh-mo-ta/may-anh-dslr-nikon-d6-body-only-1.jpg"></p>
                            <h3><strong>Tích hợp màn hình cảm ứng LCD cỡ lớn</strong></h3>
                            <p>Với kích thước màn hình LCD 3.2 inch, độ phân giải 2.359.000 dot, Nikon D6 hiển thị hình ảnh với độ rõ nét và chính xác cao hơn. Màn hình cảm ứng giúp việc cài đặt, điều chỉnh các thông số trở nên trực quan hơn. Đồng thời, với màn hình này người dùng cũng có thể sử dụng như bàn phím để lưu các ghi chú hoặc các thông tin cần thiết.</p>
                            <p><img alt="Nikon D6 - màn hình LCD cỡ lớn" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d6/anh-mo-ta/may-anh-dslr-nikon-d6-body-only-11.jpg"></p>
                            <h3><strong>Máy ảnh Nikon D6 với hệ thống lấy nét mạnh mẽ</strong></h3>
                            <p>Đây là tính năng được kỳ vọng nhất trên chiếc Nikon D6 này, cũng là nâng cấp mạnh mẽ so với người tiền nhiệm Nikon D5 trước đó dù D5 đã từng được đánh giá cao về khả năng lấy nét AF.</p>
                            <p>Được Nikon trang bị hệ thống AF Multi-CAM 37K với 105 điểm lấy nét đều là lấy nét chữ thập cross-type có thể chọn lựa được, D6 cho phép người dùng lấy nét tại bất cứ điểm nào trong khung hình mà không cần bố cục lại khung hình.</p>
                            <p><img alt="Nikon D6 - 105 điểm lấy nét" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d6/anh-mo-ta/may-anh-dslr-nikon-d6-body-only-8.jpg"></p>
                            <p>Mô đun cảm biến này còn cho phép vùng phủ AF lớn hơn gấp 1.6 lần so với trên D5, điều này giúp Nikon D6 nhận diện và lấy nét đối tượng nhanh chóng, chính xác hơn khi đang di chuyển.</p>
                            <p><img alt="Nikon D6 - Multi-CAM 37K với 105 điểm lấy nét" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d6/anh-mo-ta/may-anh-dslr-nikon-d6-body-only-3.jpg"></p>
                            <p>Máy còn tích hợp 17 tùy chọn Group-Area AF mang tới khả năng duy trì lấy nét vào chủ thể khi xung quanh có nhiều vật cản, cho hình ảnh sắc nét hơn.</p>
                            <p><img alt="Nikon D6 - 17 tùy chọn Group-Area AF" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d6/anh-mo-ta/may-anh-dslr-nikon-d6-body-only-4.jpg"></p>
                            <p>Với hệ thống lấy nét này, D6 còn cho phép điểm lấy nét trung tâm có thể giảm xuống -4.5 EV và các điểm lấy nét còn lại giảm -4 EV, đem lại khả năng lấy nét hiệu quả trong môi trường ánh sáng tối.</p>
                            <h3><strong>Khả năng chụp ảnh liên tiếp tốc độ cao</strong></h3>
                            <p>Chiếc máy ảnh DSLR này của Nikon có thể chụp ảnh với tốc độ 14fps mang lại 200 ảnh chụp liên tiếp ở định dạng JPEG. Chuyển sang chế độ Live view, máy ảnh chụp liên tiếp được 10.5fps với độ phân giải 20.8MP và không tạo ra tiếng ồn. Ngoài ra, chúng ta cũng có thể chụp ảnh ở độ phân giải thấp hơn cho tốc độ chụp cao hơn như ở 2MP - 60 fps hay ở 8MP với tốc độ 30 fps.</p>
                            <p><img alt="Nikon D6 - chụp ảnh liên tiếp tốc độ cao" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d6/anh-mo-ta/may-anh-dslr-nikon-d6-body-only-5.jpg"></p>
                            <h3><strong>Tính năng quay video 4K siêu mượt</strong></h3>
                            <p>Máy ảnh DSLR Nikon D6 có khả năng quay video 4K/30p. Đồng thời vẫn có thể quay Full HD/60p cho chuyển động mượt mà, uyển chuyển hơn.</p>
                            <p>Bên cạnh đó, D6 cũng trang bị các tính năng hữu ích như lấy nét tiêu điểm, zebra stripes, timecode và VR điện tử giúp việc quay phim trở nên dễ dàng, tiện lợi hơn.</p>
                            <p>Hình ảnh và âm thanh là hai yếu tố quyết định tới chất lượng video quay được. Vì vậy, ngoài hình ảnh đẹp được quay với trình độ cao, âm thanh của video cần chân thực, sống động. Để có chất lượng âm thanh tốt, với chiếc D6 này có thể dùng micro stereo hoặc mic ngoài gắn qua jack cắm 3.5mm để thu âm và kiểm soát âm thanh.</p>
                            <p><img alt="Nikon D6 - quay video 4K" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d6/anh-mo-ta/may-anh-dslr-nikon-d6-body-only-6.jpg"></p>
                            <h3><strong>Hỗ trợ kết nối Wifi và Bluetooth</strong></h3>
                            <p>Tích hợp khả năng kết nối Wifi và Bluetooth, máy ảnh cho phép truyền hình ảnh, video tới các thiết bị công nghệ như điện thoại, máy tính, ipad nhanh chóng, từ đó người dùng có thể chia sẻ video, hình ảnh lên mạng xã hội ngay lập tức. Đồng thời với ứng dụng Nikon SnapBridge, bạn có thể điều khiển camera từ xa thông qua chiếc smartphone của mình.</p>
                            <p><img alt="Nikon D6 - kết nối Wifi và Bluetooth" src="https://cdn.vjshop.vn/may-anh/dslr/nikon/d6/anh-mo-ta/may-anh-dslr-nikon-d6-body-only-7.jpg"></p>
                            <p>Không còn nghi ngờ gì nữa, Nikon D6 - chiếc máy ảnh mang nhiều cải tiến mới của Nikon chính là thiết bị hỗ trợ không thể thiếu giúp các tín đồ thích quay phim, chụp ảnh sáng tạo và thỏa mãn niềm đam mê nhiếp ảnh của mình.</p>`,
        category: "cameras"
    },
    {
        title: 'Máy ảnh Canon EOS 850D (Body Only)',
        imageSrc: '../img/products/camera/canon-eos-850d-body-2-500x500.jpg',
        price: '69.990.000₫',
        comparePrice: '75.990.000₫',
        descriptionHTML: `<p><strong>Canon EOS 850D</strong> trang bị các tính năng cao cấp phù hợp với dòng máy ảnh chất lượng cao. Đây là mẫu máy hoàn hảo cho những nhiếp ảnh gia chuyên nghiệp. Theo đó, máy ảnh DSLR này kết hợp cảm biến CMOS APS-C 24,1MP với chế độ quay 4K chuyên nghiệp. Trên kính ngắm có tất cả 45 điểm lấy nét, màn hình live view sử dụng Dual Pixel CMOS AF. Ngoài ra, máy ảnh còn có khả năng kết nối Wifi cùng giao diện thân thiện với người dùng.</p>
                            <h3><strong>Canon EOS 850D với khóa tiêu điểm chính xác, nhanh chóng</strong></h3>
                            <p>Khi chụp ở chế độ live view, Dual Pixel CMOS AF sẽ giúp bạn lấy nét tự động nhanh và chính xác hơn. Chế độ Eye Recogn AF tập trung và theo dõi mắt chủ thể trên màn hình Live View.</p>
                            <p><img alt="Dual Pixel CMOS AF trên máy ảnh canon eos 850d sẽ giúp bạn lấy nét tự động nhanh và chính xác" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-850d/canon-eos-850d-6.jpg"></p>
                            <p>Tính năng nhận diện khuôn mặt EOS iTR AF trên Canon EOS 850D cũng đảm bảo ảnh chụp chân dung rõ ràng bằng cách theo dõi khuôn mặt của đối tượng chuyển động trong khi chụp bằng ống ngắm máy ảnh.</p>
                            <p><img alt="Tính năng nhận diện khuôn mặt EOS iTR AF giúp ảnh chụp chân dung rõ ràng" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-850d/canon-eos-850d-7.jpg"></p>
                            <p>Bên cạnh đó, khi chụp qua kính ngắm quang học, loại 45 điểm AF giúp lấy nét chính xác vào các đối tượng chuyển động nhanh chóng và dễ dàng. Độ trễ về thời gian giữa chuyển động của đối tượng thực tế và màn hình hiển thị khung ngắm hầu như không có vì vậy bạn sẽ không lo bị mất dấu vết đối tượng chuyển động.</p>
                            <p><img alt="Canon eos 850D dễ dàng lấy nét vào các đối tượng di chuyển" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-850d/canon-eos-850d-10.jpg"></p>
                            <h3><strong>Tốc độ chụp nhanh liên tục</strong></h3>
                            <p>Với những khoảnh khắc đáng giá đôi khi chỉ xuất hiện chớp nhoáng, điều này đặt ra thách thức đối với khả năng ghi hình nhanh của các dòng máy ảnh chất lượng cao. Theo đó, máy ảnh Canon EOS 850D sẽ giúp bạn không bỏ lỡ bất kỳ khoảnh khắc nào trước mắt với chế độ chụp liên tục ở tốc độ 7.5 khung hình/giây trong Live view One-Shot AF hoặc tối đa 7 khung hình/giây ở chế độ ống ngắm.</p>
                            <p><img alt="Canon eos 850D có tốc độ chụp liên tục nhanh" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-850d/canon-eos-850d-8.jpg"></p>
                            <h3><strong>Ghi điểm với ảnh và video chất lượng cao</strong></h3>
                            <p>Quay video 4K UHD với 23.98p/25p hoặc ghi hình ở chế độ Full HD 60p. Cổng HDMI cho phép bạn xuất video sang TV hoặc màn hình rời để xem video một cách thuận tiện với gia đình và bạn bè. Dải ISO mở rộng từ 100-25600 có thể nâng lên mức tối đa 51200 để mang lại hình ảnh sắc nét, rõ ràng, ít gây nhiễu ở tốc độ màn trập cao ngay cả khi cầm tay.</p>
                            <p><img alt="Canon eos 850D ghi điểm với hình ảnh và video chất lượng cao" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-850d/canon-eos-850d-9.jpg"></p>
                            <h3><strong>Canon EOS 850D - kết nối mọi lúc, mọi nơi</strong></h3>
                            <p>Canon EOS 850D sử dụng bộ kết nối Wifi tích hợp để chia sẻ, sao lưu nhanh hình ảnh, video của bạn. Với ứng dụng Canon Camera Connection có mặt trên cả iOS và Android sẽ giúp bạn kết nối không dây với máy ảnh một cách dễ dàng, thuận tiện xử lý các thao tác từ xa như: chỉnh chế độ Remote Shooting. Truyền tệp qua điện thoại thông minh hoặc sao lưu trên dữ liệu đám mây. Chuyển ảnh đồng thời trong quá trình chụp. Và phát lại từ xa hình ảnh, video trên thiết bị thông minh của bạn.</p>
                            <p><img alt="Canon EOS 850D sử dụng bộ kết nối Wifi và Bluetooth giúp kết nối mọi lúc mọi nơi" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-850d/canon-eos-850d-13.jpg"></p>
                            <p>Bên cạnh đó, Bluetooth sẵn sàng liên kết máy ảnh và thiết bị thông minh của bạn để duy trì kết nối liên tục giữa máy ảnh và thiết bị thông minh. Bạn cũng có thể ghép nối máy ảnh với một điều khiển từ xa không dây, chẳng hạn như BR-E1 hoặc smartphone của bạn để thực hiện chụp từ xa.</p>
                            <h3><strong>Thiết kế của Canon 850D thân thiện với người dùng</strong></h3>
                            <p>Bạn có thể chụp ảnh với màn hình cảm ứng ở đa góc bao gồm cả các góc thấp trên mặt đất. Bên cạnh đó, màn hình LCD trên EOS 850D có thể cho phép bạn xem và điều chỉnh tiêu điểm. Nút AF-ON được thêm vào để bạn tận hưởng nhiều tiện lợi hơn trong việc chụp hình.</p>
                            <p><img alt="Canon eos 850D có màn hình cảm ứng đa góc" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-850d/canon-eos-850d-12.jpg"></p>
                            <p>Bảng quay số điều khiển nhanh cho phép điều chỉnh các cài đặt chụp của bạn và duyệt ảnh nhanh trong chế độ phát lại. Ngoài ra thiết kế còn có các nút bấm mặt số trên Canon EOS 850D được định vị để chụp một cách dễ dàng và thuận tiện hơn.</p>
                            <p><img alt="Canon eos 850D có bảng quay số nhanh điều chỉnh các cài đặt chụp" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-850d/canon-eos-850d-11.jpg"></p>
                            <h3><strong>Chế độ cài đặt tự động thông minh trên Canon EOS 850D</strong></h3>
                            <p>Scene Intelligent Auto là chế độ hoàn toàn tự động. Khi sử dụng chế độ này, nó cho phép máy ảnh phân tích cảnh và tự động cài đặt tối ưu. Chế độ tự động cũng điều chỉnh tiêu cự bằng cách phát hiện đối tượng đứng yên hay chuyển động.</p>
                            <h3><strong>Các thông số nổi bật</strong></h3>
                            <ul>
                            <li>Cảm biến CMOS APS-C 24.1MP 22.3 x 14.9mm</li>
                            <li>Bộ xử lý Digic 8</li>
                            <li>Quay phim 4K UHD 25fps</li>
                            <li>5 trục Digital chống rung, ổn định</li>
                            <li>Tất cả 45 loại điểm AF chéo</li>
                            <li>Kết nối Wifi và Bluetooth</li>
                            </ul>`,
        category: "cameras"
    },
    {
        title: 'Máy ảnh Canon EOS 77D (Body Only)',
        imageSrc: '../img/products/Camera/canon-eos-77d-500x500.jpg',
        price: '15.990.000₫',
        comparePrice: '18.990.000₫',
        descriptionHTML: `<h3><strong>Cảm biến APS-C CMOS 24.2MP và bộ xử lý hình ảnh DIGIC 7</strong></h3>
                            <p><img alt="máy ảnh Canon EOS 77D" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-77d/may-anh-canon-eos-77d-1.jpg"></p>
                            <p>Cảm biến APS-C CMOS 24.2MP và bộ xử lý hình ảnh DIGIC 7 trên Canon EOS 77D kết hợp để mang lại cho một hiệu suất xử lý hình ảnh vượt trội so với thế hệ trước. Hai công nghệ này làm việc một cách hoàn hảo để mang lại dải nhạy sáng cao, kết hợp với hiệu suất hoạt động tuyệt vời giúp bức ảnh được chụp ra một cách vô cùng tuyệt vời.</p>
                            <p>Phạm vi ISO từ 100 đến 51200 - một con số khá lớn, hoạt động phù hợp với nhiều điều kiện ánh sáng khác nhau, kết hợp cùng bộ xử lý hình ảnh DIGIC 7 giúp cho máy có khả năng khử nhiễu ảnh một cách tuyệt vời. Bộ xử lý này cũng đẩy tốc độ chụp của máy lên khá nhanh, lên tới 6 khung hình/giây để bắt trọn từng khoảnh khắc.</p>
                            <h3><strong>Hệ thống 45 điểm lấy nét chéo và Hệ thống Dual Pixel CMOS AF</strong></h3>
                            <p><img alt="hệ thống lấy nét 45 điểm trên canon eos 77d" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-77d/may-anh-77d-1.jpg"></p>
                            <p>Hệ thống 45 điểm lấy nét tự động chéo cung cấp cho Canon EOS 77D khả năng lấy nét nhanh và chính xác trong điều kiện ánh sáng yếu.</p>
                            <p>Hệ thống Dual Pixel CMOS AF trên máy ảnh Canon giúp hiệu suất lấy nét của máy khi quay video hoặc quay ở chế độ live view được tốt hơn đáng kể so với phiên bản trước. Hệ thống này khi kết hợp cùng chế độ Movie Servo AF sẽ cung cấp cho máy một khả năng lấy nét khi quay video một cách tự kỳ mượt mà, độ sáng tốt cũng như độ ổn định rất cao.</p>
                            <h3><strong>Quay video chất lượng Full HD 1080p</strong></h3>
                            <p><img alt="quay phim chất lượng cao trên canon eos 77d" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-77d/may-anh-canon-eos-77d-2-1.jpg"></p>
                            <p>Điểm mạnh lớn của Canon EOS 77D chính là khả năng quay video ở chất lượng 1080p. Máy có khả năng tracking bám theo chủ thể liên tục rất tốt nhờ 2 công nghệ Dual Pixel và bộ xử lý DIGIC 7. Máy cũng được trang bị thêm công nghệ chống rung số 5 trục - một trong những công nghệ chống rung tiên tiến giúp chất lượng quay video ở mức rất tốt trong phân khúc máy ảnh bán chuyên nghiệp.</p>
                            <h3><strong>Thiết kế thân thiện với người sử dụng</strong></h3>
                            <p><img alt="thiết kế của máy ảnh dslr canon eos 77d" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-77d/may-anh-canon-eos-77d-3-1.jpg"></p>
                            <p>Canon 77D kế thừa vẻ đẹp đã tạo nên thương hiệu của 760D trước đó. Màn hình cảm ứng LCD 3 inch 1.04 triệu điểm ảnh có khả năng xoay lật dễ dàng cung cấp cho người dùng màu sắc vô cùng chính xác, màn hình phụ thứ 2 cung cấp khả năng hiển thị thông số của ảnh cực kỳ tiện lợi.</p>
                            <p><img alt="mặt trên của máy ảnh canon eos 77d" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-77d/may-anh-canon-eos-77d-4-1.jpg"></p>
                            <p>Máy được làm bằng chất liệu nhựa cao cấp cho cảm giác cầm nắm khá cứng cáp và chắc tay. Các nút bấm, vòng xoay được bố trí khá tiện lợi cũng như thông minh, độ nảy phím tốt và rất dễ thao tác.</p>
                            <h3><strong>Pin và công nghệ không dây trên Canon EOS 77D</strong></h3>
                            <p>Máy được trang bị Wifi, Bluetooth và NFC giúp cho việc kết nối với các thiết bị ngoại vi nhanh chóng và dễ dàng hơn. Máy được trang bị khả năng bật máy từ xa thông qua wifi khi được kết nối với điện thoại, NFC cũng giúp cho việc xem ảnh trên smartphone một cách nhanh chóng hơn.</p>
                            <p><img alt="phụ kiện của máy ảnh canon eos 77d" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-77d/may-anh-canon-eos-77d-5-2.jpg"></p>
                            <p>Canon EOS 77D được trang bị pin lithium-ion dung lượng lớn có khả năng chụp được 820 tấm/ 1 lần sạc - một thời lượng pin cực kỳ ấn tượng đối với những dòng máy ảnh ở phân khúc bán chuyên nghiệp.</p>
                            <h3><strong>Ống kính Kit 18-55mm f/3.5 - 5.6 IS STM</strong></h3>
                            <p><img alt="ống kính kit kèm máy ảnh canon eos 77d" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-77d/may-anh-canon-eos-77d-5-1.jpg"></p>
                            <p>Một chiếc lens tuyệt vời, màu sắc tươi, sống động, độ tương phản tốt và cực kỳ sắc nét. Tính năng chống rung IS của lens hoạt động cực kỳ tốt kể cả khi chụp chậm ở tốc độ 1/4 giây. Chiếc lens này là một trong những chiếc lens gần như hoàn hảo trong mọi mục đích sử dụng.</p>
                            <p>Với mức giá gần 1000USD, chiếc máy đến từ thương hiệu Canon cũng như kết hợp cùng với hàng loạt công nghệ khá thú vị, Canon EOS 77D là một sự lựa chọn không tồi dành cho những nhiếp ảnh gia bán chuyên nghiệp vào thời điểm hiện tại.</p>`,
        category: "cameras"
    },
    {
        title: 'Máy ảnh Canon EOS 6D Mark II',
        imageSrc: '../img/products/Camera/canon-eos-6d-ii-with-24-105-f4l-ii-1-500x500.webp',
        price: '27.990.000₫',
        comparePrice: '32.990.000₫',
        descriptionHTML: `<h3><strong>Cảm biến 26.2MP Full-Frame CMOS và bộ xử lý hình ảnh DIGIC 7</strong></h3>
                            <p>Cảm biến 26.2MP Full-Frame CMOS kết hợp cùng bộ xử lý hình ảnh DIGIC 7 trên Canon 6D Mark II tạo ra những hình ảnh và video vô cùng sắc nét và sống động. Giải nhạy sáng ISO của máy có thể mở rộng lên tới 102.400 - một con số khá khủng trong phân khúc giá.</p>
                            <p><img alt="máy ảnh Canon 6D Mark II" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-6d-mark-ii/canon-6d-mark-ii.jpg"></p>
                            <p>Hỗ trợ trong việc chụp ảnh phơi sáng là hệ thống cảm biến đo sáng RGB + IR 7560 pixel giúp giảm thiểu tác động của việc nhấp nháy sáng bên ngoài môi trường để đảm bảo ảnh khi được chụp ra có độ chính xác cao về ánh sáng.</p>
                            <h3><strong>Hệ thống 45 điểm lấy nét chéo và Dual Pixel CMOS AF</strong></h3>
                            <p><img alt="Hệ thống 45 điểm lấy nét chéo và Dual Pixel CMOS AF trên canon 6D mark II" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-6d-mark-ii/may-anh-canon-6d-mark-ii-1.jpg"></p>
                            <p>Canon EOS 6D Mark II có hệ thống 45 điểm lấy nét chéo giúp cho việc bắt chuyển động của vật thể một cách trơn tru và vô cùng mượt mà cũng như độ nét ảnh được tăng lên đáng kể.</p>
                            <p>Hệ thống Dual Pixel CMOS AF giúp hiệu suất lấy nét của máy khi quay video hoặc quay ở chế độ live view được tốt hơn nhiều so với phiên bản tiền nhiệm.</p>
                            <h3><strong>Quay video độ phân giải Full HD</strong></h3>
                            <p><img alt="Quay video độ phân giải Full HD trên Canon 6D Mark II 2" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-6d-mark-ii/may-anh-canon-6d-mark-ii-2.jpg"></p>
                            <p>Canon EOS 6D Mark II có thể quay được video độ phân giải Full HD với tốc độ khung hình lên đến 60 fps. Máy cũng được trang bị thêm công nghệ chống rung số 5 trục giúp trải nghiệm khi quay video một cách mượt mà được gia tăng đáng kể.</p>
                            <p>Kết hợp với đó là jack micro 3.5mm giúp cho việc thu âm của máy được dễ dàng hơn trong nhiều điều kiện thời tiết khác nhau.</p>
                            <h3><strong>Canon 6D Mark II với thiết kế chuyên nghiệp và bền bỉ</strong></h3>
                            <h3><strong>Màn hình của Canon 6D Mark II</strong></h3>
                            <p>Màn hình cảm ứng LCD 3 inch với 1.04 triệu điểm ảnh có khả năng xoay lật một cách vô cùng tiện dụng, đi kèm với công nghệ lấy nét trực tiếp trên màn hình cảm ứng sẽ là một trợ thủ đắc lực nếu người dùng muốn quay vlog cũng như làm phim bán chuyên nghiệp.</p>
                            <p><img alt="Canon 6D Mark II 1" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-6d-mark-ii/canon-6d-mark-ii-1.jpg"></p>
                            <h3><strong>Kính ngắm</strong></h3>
                            <p>Kính ngắm quang học cung cấp phạm vi bao phủ lên tới 98% khung hình và độ phóng đại lên tới 0.71x.</p>
                            <p><img alt="may-anh-Canon 6D Mark II 4" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-6d-mark-ii/may-anh-canon-6d-mark-ii-4.jpg"></p>
                            <h3><strong>Thân máy ảnh</strong></h3>
                            <p>Máy cũng được làm bằng kim loại nguyên khối cho cảm giác cầm nắm cũng như trải nghiệm là cực kỳ cao cấp.</p>
                            <p><img alt="Canon 6D Mark II 2" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-6d-mark-ii/canon-6d-mark-ii-2.jpg"></p>
                            <h3><strong>Các nút chức năng trên Canon 6D Mark II</strong></h3>
                            <p>Các nút bấm, đĩa điều khiển,... cũng được bố trí để giúp người dùng tiện dụng hơn trong vấn đề sử dụng, độ đàn hồi tốt cũng như độ bấm khá nảy giúp tăng trải nghiệm của người dùng.</p>
                            <h3><strong>Pin và kết nối không dây</strong></h3>
                            <p>Canon 6D Mark II được trang bị pin dung lượng lớn LP-E6N và có thể gắn thêm battery grip giúp máy có thể tăng thời gian sử dụng lên 300% so với thông thường.</p>
                            <p><img alt="Pin của máy ảnh canon 6d mark ii" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-6d-mark-ii/6d-mark-ii-battery.png"></p>
                            <p>Đi cùng với đó là hàng loạt các kết nối không dây giúp cho chiếc máy ảnh Canon này có thể truyền tải dữ liệu một cách vô cùng nhanh chóng và dễ dàng.</p>
                            <h3><strong>Ảnh chụp mẫu từ Canon EOS 6D Mark II</strong></h3>
                            <p><img alt="ảnh chụp thực tế của máy ảnh Canon 6D Mark II - ảnh 1" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-6d-mark-ii/may-anh-canon-6d-mark-ii7.jpg"></p>
                            <p><img alt="ảnh chụp thực tế của máy ảnh Canon 6D Mark II - ảnh 2" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-6d-mark-ii/may-anh-canon-6d-mark-ii-8.jpg"></p>
                            <p><img alt="ảnh chụp thực tế của máy ảnh Canon 6D Mark II - ảnh 3" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-6d-mark-ii/may-anh-canon-6d-mark-ii-9.jpg"></p>
                            <p><img alt="ảnh chụp thực tế của máy ảnh Canon 6D Mark II - ảnh 4" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-6d-mark-ii/may-anh-canon-6d-mark-ii-10.jpg"></p>
                            <p>Mẫu máy ảnh dành cho người dùng bán chuyên cũng như chuyên nghiệp này là một mẫu máy vô cùng tốt đến từ nhà Canon, thiết kế ổn, chất liệu cao cấp đi kèm với đó là hàng loạt các tính năng tiện dụng sẽ là lựa chọn không tồi cho đại đa số nhiếp ảnh gia vào thời điểm hiện tại.</p>`,
        category: "cameras"
    },
    {
        title: 'Máy ảnh Canon EOS 5D Mark IV (Body Only)',
        imageSrc: '../img/products/Camera/canon-eos-5d-mark-iv-500x500.webp',
        price: '51.990.000₫',
        comparePrice: '57.990.000₫',
        descriptionHTML: `<h3><strong>Công nghệ đột phá bên trong thiết kế quen thuộc</strong></h3>
                            <p><img alt="máy ảnh Canon EOS 5D Mark IV" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-5d-mark-iv/may-anh-canon-eos-5d-mark-iv.jpg"></p>
                            <h3><strong>Màn hình cảm ứng</strong></h3>
                            <p>Canon EOS 5D Mark IV có màn hình cảm ứng LCD lớn 3.2 inch với 1.62 triệu điểm ảnh đi kèm với lớp chống phản chiếu giúp cho việc hiển thị hình ảnh ngoài trời thực sự vô cùng xuất sắc.</p>
                            <p><img alt="màn hình phụ trên Canon EOS 5D Mark IV" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-5d-mark-iv/may-anh-may-anh-canon-eos-5d-mark-iv.jpg"></p>
                            <p>Nút chọn chế độ AF chuyên dụng giúp người dùng có thể truy cập nhanh vào các tùy chọn lấy nét giúp cho công việc này diễn ra thực sự trơn tru và dễ dàng.</p>
                            <p><img alt="khe cắm thẻ nhớ của Canon EOS 5D Mark IV 2" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-5d-mark-iv/may-anh-may-anh-canon-eos-5d-mark-iv-2.jpg"></p>
                            <p>Máy ảnh có thể cắm thẻ nhớ kép giúp tăng lưu lượng lưu trữ cho người dùng.</p>
                            <p><img alt="kính ngắm trên máy ảnh Canon EOS 5D Mark IV 3" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-5d-mark-iv/may-anh-may-anh-canon-eos-5d-mark-iv-3.jpg"></p>
                            <h3><strong>Kính ngắm thông minh trên Canon EOS 5D Mark IV</strong></h3>
                            <p>Kính ngắm thông minh được thiết kế để người sử dụng thấy những điểm AF sẽ được tô sáng sang màu đỏ. Ngoài ra kính ngắm cũng có thể hiển thị hàng loạt các thông số như lưới, cân bằng trắng, chế độ đo sáng, thông tin AF và các cài đặt khác - một thiết kế cực kỳ thông minh và vô cùng hiện đại trên chiếc máy ảnh này.</p>
                            <p><img alt="thân máy của Canon EOS 5D Mark IV 5" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-5d-mark-iv/may-anh-canon-eos-5d-mark-iv-5.jpg"></p>
                            <h3><strong>Thân máy với hợp kim Magie chắc chắn</strong></h3>
                            <p>Thân máy được làm bằng hợp kim Magie - loại hợp kim cực kỳ cao cấp cho cảm giác cầm nắm cũng như trải nghiệm sử dụng thực sự "đáng tiền" cũng như cho phép máy hoạt động tốt ở nhiều điều kiện môi trường khắc nghiệt khác nhau.</p>
                            <h3><strong>Cảm biến CMOS Full-frame 30.4MP và bộ xử lý hình ảnh DIGIC 6+</strong></h3>
                            <p><img alt="Canon EOS 5D Mark IV với cảm biến và bộ xử lý hình ảnh" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-5d-mark-iv/may-anh-canon-eos-5d-mark-iv-6.jpg"></p>
                            <p>Chiếc máy ảnh DSLR của Canon được trang bị cảm biến CMOS Full-Frame 30.4MP giúp bức ảnh chụp ra trong bất kỳ điều kiện môi trường nào cũng có một độ nét cực kỳ ấn tượng. Ngoài ra bộ xử lý hình ảnh DIGIC 6+ cũng đã làm xuất sắc nhiệm vụ khi máy có thể xử lý hình ảnh không bị nhiễu nhiều kể cả khi đặt máy ở mức ISO cao. Máy ảnh cũng có thể mở rộng ISO lên tới 102.400 - một con số rất lớn.</p>
                            <h3><strong>Quay video DCI độ phân giải 4K</strong></h3>
                            <p><img alt="quay video 4k trên máy ảnh Canon EOS 5D Mark IV" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-5d-mark-iv/may-anh-canon-eos-5d-mark-iv-7.jpg"></p>
                            <p>Là một mẫu máy ảnh thuộc phân khúc cao cấp, máy có khả năng quay video của máy cực kỳ ấn tượng. Canon EOS 5D Mark IV có khả năng quay video độ phân giải 4K tốc độ lên tới 30 fps và 1080p ở tốc độ khung hình 60 fps nhờ con chip xử lý vô cùng mạnh mẽ. Kèm với đó là jack căn mic 3.5mm giúp cho việc cắm phụ kiện thu âm bên ngoài dễ dàng hơn.</p>
                            <h3><strong>Dual Pixel RAW</strong></h3>
                            <p><img alt="may-anh Canon EOS 5D Mark IV8" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-5d-mark-iv/may-anh-canon-eos-5d-mark-iv8.jpg"></p>
                            <p>Đây là công nghệ mới mà Canon phát triển và được triển khai đầu tiên trên mẫu Canon EOS 5D Mark IV này. Công nghệ này giúp người dùng có thể điều chỉnh được độ nét ở biên độ nhỏ, điều chỉnh được Bokeh đẹp hơn và giúp giảm hiệu ứng bóng ma một cách mượt mà hơn.</p>
                            <h3><strong>Ảnh chụp mẫu từ Canon EOS 5D Mark IV</strong></h3>
                            <p>Dưới đây là một vài hình ảnh chụp mẫu của Canon EOS 5D Mark IV.</p>
                            <p><img alt="ảnh chụp thực tế từ máy ảnh Canon EOS 5D Mark IV - ảnh 1" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-5d-mark-iv/may-anh-canon-eos-5d-mark-iv-9.jpg"></p>
                            <p><img alt="ảnh chụp thực tế từ máy ảnh Canon EOS 5D Mark IV - ảnh 2" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-5d-mark-iv/may-anh-canon-eos-5d-mark-iv-10.jpg"></p>
                            <p><img alt="ảnh chụp thực tế từ máy ảnh Canon EOS 5D Mark IV - ảnh 3" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-5d-mark-iv/may-anh-canon-eos-5d-mark-iv-11.jpg"></p>
                            <p><img alt="ảnh chụp thực tế từ máy ảnh Canon EOS 5D Mark IV - ảnh 4" src="https://cdn.vjshop.vn/may-anh/dslr/canon/canon-eos-5d-mark-iv/may-anh-canon-eos-5d-mark-iv-12.jpg"></p>
                            <p>Với hàng loạt các công nghệ tân tiến kể trên đi kèm với một mức giá khá phải chăng, Canon EOS 5D Mark IV là một trong những sự lựa chọn không thể bỏ qua đối với những nhiếp ảnh gia chuyên nghiệp cũng như những người dùng bán chuyên muốn nâng cấp thiết bị của mình.</p>`,
        category: "cameras"
    },
    {
        title: 'Canon RF 70-200mm f/4L IS USM',
        imageSrc: '../img/products/Lens/Canon-RF-70-200mm-f4L-IS-USM.jpg',
        price: '52.990.000₫',
        comparePrice: '57.990.000₫',
        descriptionHTML: `<p>Nổi tiếng với phạm vi và tính linh hoạt, <strong>Canon RF 70-200mm f/4L IS USM</strong> sở hữu ngoại hình nhỏ gọn và nhẹ ấn tượng hoàn hảo để kết hợp với các thân máy ảnh mirrorless full frame. Khẩu độ tối đa f/4 tạo nên sự cân bằng giữa độ sáng vừa đủ để chụp trong các điều kiện ánh sáng sẵn có và thiết kế đặc biệt di động, thuận tiện chụp cầm tay. Tính năng ổn định hình quang học bổ trợ bù trừ đến 5 bước dừng khi xóc máy, hoặc lên đến 7.5 bước dừng ấn tượng khi lắp với các thân máy ảnh dòng EOS R có IBIS. Về quang học, ống kính năng trang bị bốn thấu kính UD giảm thiểu nhiều loại quang sai xuyên suốt dải zoom, cho độ trong rõ cao, kết hợp lớp phủ Air Sphere để giảm bóng ma và lóa sáng. Hệ thống lấy nét Dual Nano USM mang lại hiệu suất lấy nét tự động nhanh chóng và gần như yên lặng, có kết hợp lấy nét thủ công toàn thời gian. Ngoài ra, ống kính 70-200mm này có trang bị kháng thời tiết và phủ fluorine để bảo vệ các thấu kính phía trước và phía sau.</p>
                                <p><img height="800" src="https://zshop.vn/images/companies/1/1604443681_1601518.jpg?1604473200401" width="800"></p>
                                <h3>Dải tiêu cự nổi tiếng</h3>
                                <p>RF 70-200mm f/4L IS USM vừa cho phép căn khung ảnh phong cảnh cho bố cục sáng tạo, vừa chụp cận cảnh cho ảnh thêm nghệ thuật. Dải tiêu cự từ telephoto tầm trung là 70mm đến 200mm cung cấp phạm vi phù hợp chụp đẹp từ thể thao đến chân dung.</p>
                                <p><img alt="" height="174" src="https://zshop.vn/images/companies/1/07023hda0da0sa.jpg?1604476213375" width="800"></p>
                                <h3>Chống rung mạnh mẽ</h3>
                                <p>Ổn định hình ảnh quang học tích hợp cung cấp khả năng ổn định đến 5 bước dừng tốc độ màn trập mà trước đây chưa từng cho phép chụp cầm tay. Khi sử dụng với các thân máy ảnh tương thích, ống kính này có thể đạt khả năng ổn định hình ảnh lên đến 7.5 bước dừng.</p>
                                <p><img height="270" src="https://zshop.vn/images/companies/1/1a13e636448340c2a6e995ed706e2024_RF70-200mm+f4L+IS+USM+IS+Comparison.png?1604476080205" width="800"></p>
                                <h3>Chụp cận cảnh hơn</h3>
                                <p>RF 70-200mm f/4L IS USM có khả năng lấy nét ở khoảng cách gần 60 cm ở bất kỳ tiêu cự nào, cho phép bạn tiếp cận chủ thể gần hơn.</p>
                                <p>Ở đầu 200mm của ống kính, bạn có thể chụp cận cảnh chủ thể với số phóng đại macro lên đến 0.28x.</p>
                                <h3>Thiết kế nhỏ và nhẹ hơn</h3>
                                <p>Tuy có tiêu cự xa, RF 70-200mm f/4L IS USM nhẹ hơn các ống zoom tiêu chuẩn và ngắn hơn 29% so với phiên bản EF của nó.</p>
                                <h3>Thiết kế floating và Dual Nano USM</h3>
                                <p><img alt="" height="561" src="https://zshop.vn/images/companies/1/08cc953212b7457ab022d7a26590586f_RF70-200mm+f4L+IS+USM+NANO+USM.png?1604475990734" width="800"></p>
                                <p>Hai động cơ Nano USM cho phép đạt tốc độ lấy nét tự động nhanh chính xác. Mỗi động cơ Nano USM làm việc độc lập để kiểm soát lấy nét và nhóm thấu kính "floating", giúp tránh dịch chuyển vị trí lấy nét trong lúc zoom; còn trong lúc chụp cận cảnh, cặp động cơ này điều khiển kiểm soát vị trí thấu kính linh hoạt giúp hiệu quả tránh giảm chất lượng hình ảnh.</p>
                                <p>Hệ thống điều khiển lấy nét floating điện tử bên trong ống kính cho khả năng kiểm soát tuyệt vời, đồng thời giảm sự phụ thuộc vào hệ thống cơ học, góp phần vào thiết kế ống kính nhỏ hơn.</p>
                                <h3>Kháng thời tiết và bền bỉ</h3>
                                <p>Cấu trúc kháng bụi và rò rỉ nước bằng mọi cách giúp giữ nước và bụi không lọt vào ống kính. Nòng ống kính mở rộng được chế tạo cho độ bền cao, chống sốc và chống rung. Lớp phủ fluorine chống nhớp ở thấu kính phía trước để tránh ẩm và dầu dính vào. Lớp phủ trắng chống nhiệt điển hình giúp chống quá nhiệt trong thời tiết nóng bức.</p>
                                <h3>Ảnh mẫu chụp bằng ống kính Canon RF 70-200mm f/4L IS USM</h3>
                                <p><img height="533" src="https://zshop.vn/images/companies/1/RF70-200F4%20(1).jpg?1604475116001" width="800"></p>
                                <p><img alt="" height="533" src="https://zshop.vn/images/companies/1/RF70-200F4%20(2).jpg?1604475244401" width="800"></p>`,
        category: "lenses"
    },
    {
        title: 'Canon RF 24mm f/1.8 Macro IS STM',
        imageSrc: '../img/products/Lens/Canon-RF-24mm-f1.8-Macro-IS-STM.jpg',
        price: '50.990.000₫',
        comparePrice: '65.990.000₫',
        descriptionHTML: `<p><strong>Canon RF 24mm f/1.8 Macro IS STM</strong> là sự kết hợp độc đáo giữa trường nhìn rộng và thiết kế lấy nét cận cảnh, tiêu cự góc cực rộng trong ống kính macro. Ống kính hỗ trợ chụp ở phạm vi gần với khẩu độ f/1.8 rộng, đồng thời giữ được không gian nhìn thoáng và độ sâu trường ảnh đậm. Chất lượng quang học được đảm bảo nhờ hệ thống thấu kính tiên tiến tối ưu cho dải tiêu cự đơn. Trọng lượng nhẹ và kích thước nhỏ gọn lý tưởng để sử dụng hàng ngày. Cơ chế ổn định hình ảnh quang học 5 bước dừng và động cơ lấy nét êm giúp ống kính này thích hợp với cả ứng dụng quay phim chất lượng cao.</p>
                            <p><img alt="" height="394" src="https://zshop.vn/images/companies/1/san_pham/Lens/Canon/1657621852_IMG_17931141.jpg?1657684411539" width="700"></p>
                            <h3>Chụp ảnh góc rộng với độ rõ nét cao</h3>
                            <p>Ống kính một tiêu cự góc rộng 24mm sử dụng ngàm Canon RF xuất sắc, gọn nhẹ, trang bị thấu kính phi cầu và các lớp phủ cao cấp cung cấp hình ảnh chất lượng cao.</p>
                            <p><img alt="" height="395" src="https://zshop.vn/images/companies/1/san_pham/Lens/Canon/ezgif.com-gif-maker%20%2817%29.jpg?1657685121601" width="700"></p>
                            <h3>Vận hành nhanh và sáng, chụp low light xuất sắc</h3>
                            <p>Khẩu độ tối đa f/1.8 có thiết kế 9 lá khẩu tròn vận hành tuyệt vời trong điều kiện ánh sáng yếu, cho hiệu ứng bokeh và xóa phông đẹp mắt.</p>
                            <p><img alt="" height="394" src="https://zshop.vn/images/companies/1/san_pham/Lens/Canon/ezgif.com-gif-maker%20%2824%29.jpg?1657685181180" width="700"></p>
                            <h3>Cực kỳ mượt mà và ổn định</h3>
                            <p>Ổn định hình ảnh quang học 5 bước dừng cho phép chụp tay và quay phim ổn định ở các tốc độ màn trập dài và lên đến 6.5 bước dừng khi dùng trên thân máy ảnh EOS R có sẵn cơ chế chống rung trong thân máy.</p>
                            <p><img alt="" height="293" src="https://zshop.vn/images/companies/1/san_pham/Lens/Canon/1657623043_IMG_1793146.jpg?1657685103265" width="700"></p>
                            <h3>Lấy nét nhanh và êm cho ảnh và âm thanh sắc nét</h3>
                            <p>Ống kính RF 24mm f/1.8 Macro IS STM trang bị động cơ lấy nét tự động chuyển động bước STM êm, khóa vào đối tượng nhanh, kể cả khi đối tượng đang di chuyển nhanh.</p>
                            <p><img alt="" height="395" src="https://zshop.vn/images/companies/1/san_pham/Lens/Canon/ezgif.com-gif-maker%20%2820%29.jpg?1657685207789" width="700"></p>
                            <h3>Tiếp cận gần hơn hoặc lấy toàn cảnh rộng hơn</h3>
                            <p>Khoảng cách lấy nét tối thiểu chỉ 14cm (độ phóng đại 0.5x hoặc nửa kích thước thực) là ưu điểm để chụp ảnh góc rộng sáng tạo và cho phép tiếp cận đối tượng cực gần.</p>
                            <p><img alt="" height="394" src="https://zshop.vn/images/companies/1/san_pham/Lens/Canon/ezgif.com-gif-maker%20%2826%29.jpg?1657685239246" width="700"></p>
                            <h3>Điều khiển dễ dàng trong tầm tay</h3>
                            <p>Ống kính RF 24mm f/1.8 Macro IS STM có vòng điều khiển có thể tùy chỉnh cho phép tinh chỉnh ISO, khẩu độ hoặc thay đổi cách thức lấy nét và vòng chuyên chỉnh tiêu cự để lấy nét tay chuẩn xác.</p>
                            <h3>Ảnh mẫu chụp bằng ống kính Canon RF 24mm f/1.8 Macro IS STM</h3>
                            <p><img alt="" height="394" src="https://zshop.vn/images/companies/1/san_pham/Lens/Canon/ezgif.com-gif-maker%20%2821%29.jpg?1657685226817" width="700"></p>`,
        category: "lenses"
    },
    {
        title: 'Canon RF 135mm f/1.8 L IS USM',
        imageSrc: '../img/products/Lens/Canon-RF-135mm-f1.8-L-IS-USM.jpg',
        price: '69.990.000₫',
        comparePrice: '75.990.000₫',
        descriptionHTML: `<p><strong>Canon RF 135mm f/1.8 L IS USM</strong> là sự kết hợp giữa độ dài tiêu cự tele trung bình với khẩu độ tối đa cực sáng, mang đến độ sắc nét cao và độ sâu trường ảnh ấn tượng, là lựa chọn lý tưởng để chụp ảnh chân dung. Mang lại lợi ích cho sự kết hợp xuất sắc này là thiết kế quang học tiên tiến của dòng ống kính L, kết cấu chắc chắn và khả năng chống chịu thời tiết, lấy nét tự động nhanh cùng cơ chế ổn định hình ảnh đáng tin cậy để sử dụng dễ dàng.</p>
                            <p><img alt="" height="371" src="https://zshop.vn/images/companies/1/san_pham/Camera/Canon%20MRL/r62/1667347825_1733226a.jpg?1667441259451" width="700"></p>
                            <h3>Ống kính tele khẩu độ nhanh với tính linh hoạt cao</h3>
                            <p>Chụp ảnh chân dung và chi tiết đẹp mắt với khả năng tách chủ thể vượt trội nhờ tiêu cự 135mm dài hơn và khẩu độ f/1.8 nhanh, 9 lá khẩu, cùng khả năng kiểm soát độ sâu trường ảnh đáng chú ý để tạo ra hiệu ứng bokeh đẹp.</p>
                            <p><img alt="" height="351" src="https://zshop.vn/images/companies/1/san_pham/Camera/Canon%20MRL/r62/1667390517_IMG_1863952.jpg?1667458092252" width="700"></p>
                            <h3>Chất lượng hình ảnh tuyệt vời trên toàn khung hình</h3>
                            <p>Hình ảnh sắc nét đáng tin cậy nhờ ba thấu kính UD kết hợp lớp phủ ASC và Super Spectra, với lớp phủ flo ở mặt kính phía trước bảo vệ khỏi bụi bẩn.</p>
                            <p><img alt="" height="268" src="https://zshop.vn/images/companies/1/san_pham/Camera/Canon%20MRL/r62/1667390517_IMG_1863962a.jpg?1667457925495" width="700"></p>
                            <h3>Trình diễn xuất sắc trong điều kiện ánh sáng yếu</h3>
                            <p>Chụp mượt mà kể cả khi thiếu sáng nhờ cơ chế ổn định hình ảnh quang học 5.5 bước dừng, tăng lên 8 bước dừng khi kết hợp với tính năng ổn định trên thân máy ảnh EOS R tương thích.</p>
                            <p><img alt="" height="275" src="https://zshop.vn/images/companies/1/san_pham/Camera/Canon%20MRL/r62/1667390517_IMG_1863962a2.jpg?1667458046890" width="700"></p>
                            <h3>Xử lý dễ dàng</h3>
                            <p>Luôn nắm bắt khoảnh khắc và hòa hợp với ống kính nhờ hai nút chức năng tùy chỉnh và vòng điều khiển cho phép tinh chỉnh và kiểm soát các cài đặt quan trọng, cùng tính năng chỉnh focus breathing khi quay video.</p>
                            <p><img height="311" src="https://zshop.vn/images/companies/1/san_pham/Camera/Canon%20MRL/r62/1667390517_IMG_1863962a1.jpg?1667458034523" width="700"></p>
                            <h3>Mạnh mẽ, yên lặng, đáng tin cậy</h3>
                            <p>Chụp trong mọi tình huống, ngay cả khi cận cảnh lên đến 0.7m (độ phóng đại 0.26x). Đây là ống kính dòng L có khả năng chống chịu thời tiết tiên tiến, và với động cơ Nano USM, ống kính này cũng gần như không gây tiếng ồn.</p>
                            <h3>Ảnh mẫu chụp bằng ống kính Canon RF 135mm f/1.8 L IS USM</h3>
                            <p><img alt="" height="467" src="https://zshop.vn/images/companies/1/san_pham/Camera/Canon%20MRL/r62/1667390517_IMG_1863957.jpg?1667457459655" width="700"></p>
                            <p><img alt="" height="234" src="https://zshop.vn/images/companies/1/san_pham/Camera/Canon%20MRL/r62/1667390517_IMG_1863955.jpg?1667457473962" width="350"><img alt="" height="234" src="https://zshop.vn/images/companies/1/san_pham/Camera/Canon%20MRL/r62/1667390517_IMG_1863962.jpg?1667457485236" width="350"></p>
                            <p><img alt="" height="525" src="https://zshop.vn/images/companies/1/san_pham/Camera/Canon%20MRL/r62/1667390517_IMG_1863959.jpg?1667457432043" width="350"><img alt="" height="525" src="https://zshop.vn/images/companies/1/san_pham/Camera/Canon%20MRL/r62/1667390517_IMG_1863958.jpg?1667457445145" width="350"></p>`,
        category: "lenses"
    },
    {
        title: 'Nikon NIKKOR Z DX 18-140mm f/3.5-6.3 VR',
        imageSrc: '../img/products/Lens/Nikon-NIKKOR-Z-DX-18-140mm-f3.5-6.3-VR.jpg',
        price: '61.990.000₫',
        comparePrice: '70.990.000₫',
        descriptionHTML: `<p><strong>Nikon Z DX 18-140mm</strong> gọn nhẹ và linh hoạt, là ống kính zoom đa năng có dải tiêu cự trải từ góc rộng tới tầm xa. Là giải pháp một ống kính đáp ứng đa dạng chủ thể nhiếp ảnh để chụp du lịch, chụp dạo, hàng ngày, ống kính tương đương 27-210mm này lý tưởng để chụp từ phong cảnh, chân dung tới chụp các chủ thể đang di chuyển ở xa.</p>
                            <p>Ống kính Nikon Z 18-140mm hỗ trợ chụp sắc nét và ổn định là cơ chế ổn định hình ảnh Vibration Reduction cân bằng xóc máy tới 5 bước dừng cho ảnh cải thiện khi chụp trong điều kiện thiếu sáng. Động cơ chuyển động bước cung cấp hiệu năng lấy nét tự động êm, nhanh và chuẩn xác, kết hợp cơ chế lấy nét thủ công, khoảng cách lấy nét gần nhất chỉ 20cm thích hợp chụp cận cảnh. Vòng điều khiển có thể cài đặt giúp thực hiện các điều chỉnh thiết lập phơi sáng dễ dàng.</p>
                            <p><img alt="" height="394" src="https://zshop.vn/images/companies/1/san_pham/Lens/Nikon/1634117738_1649436-1.jpg?1661307789473" width="700"></p>
                            <h3>Zoom 7.8x linh hoạt</h3>
                            <p>Ống kính Nikon Z DX 18-140mm chụp linh hoạt ở mọi cú máy. Zoom mượt mà từ góc rộng 18mm (tương đương 27mm trên máy ảnh APS-C), xuyên qua các tiêu cự rất được ưu chuộng 35mm, 50mm, 85mm, 105mm thẳng tới đầu tele 140mm (tương đương 210mm trên máy ảnh APS-C).</p>
                            <p><img alt="" height="456" src="https://zshop.vn/images/companies/1/san_pham/Lens/Nikon/03-fw-versatile-zoom.jpg?1661308654086" width="700"></p>
                            <h3>Nắm bắt mọi góc độ</h3>
                            <p>Các thấu kính NIKKOR Z xuất sắc mang tới hình ảnh và video có độ tương phản và độ phân giải cao tuyệt đẹp xuyên suốt dải zoom. Thấu kính ED đặc biệt giúp giảm quang sai màu theo trục và giảm thiểu hiện tượng nhòe màu trên toàn khung hình.</p>
                            <h3>Ổn định hình ảnh VR</h3>
                            <p>Cơ chế ổn định hình ảnh VR tích hợp cung cấp khả năng bù trừ xóc máy đến 5 bước dừng, hỗ trợ tốt hơn khi chụp tay cho video ổn định hơn và chụp ảnh sắc nét hơn, đồng thời cho phép chụp ảnh ở những tốc độ màn trập chậm mà không gây ra hiệu ứng nhòe chuyển động.</p>
                            <p><img alt="" height="394" src="https://zshop.vn/images/companies/1/san_pham/Lens/Nikon/08-half-left-vr.jpg?1661308676995" width="700"></p>
                            <h3>Quay video ấn tượng</h3>
                            <p>Thao tác chuyển đổi khẩu độ và điều chỉnh phơi sáng mượt mà nhờ lá khẩu điện từ. Động cơ chuyển động bước cực êm giúp tránh âm thanh điều khiển tiêu cự không lọt vào khi đang quay video, focus breathing cũng được kiểm soát tốt.</p>
                            <h3>Chụp cận cảnh</h3>
                            <p>Chụp cận cảnh ở khoảng cách với chủ thể chỉ 20cm và lấp đầy khung hình với các chi tiết kiểu macro ở tỉ lệ tái tạo 0.33x lớn. Thích hợp chụp tabletop và food photography.</p>
                            <p><img alt="" height="300" src="https://zshop.vn/images/companies/1/san_pham/Lens/Nikon/10-fw-macro.jpg?1661308694533" width="700"></p>
                            <h3>Chống bụi, chống giọt bắn</h3>
                            <p>Thân ống kính Nikon Z DX 18-140mm và những phần có thể dịch chuyển được thiết kế cẩn thận để tránh bụi và giọt bắn.</p>
                            <h3>Nhỏ gọn, di động</h3>
                            <p>Chỉ nặng 315g và kích thước 73x90mm, NIKKOR Z DX 18-140mm f/3.5-6.3 VR lý tưởng chụp du lịch hoặc hàng ngày.</p>
                            <p><img alt="" height="300" src="https://zshop.vn/images/companies/1/san_pham/Lens/Nikon/12-fw-scenic.jpg?1661308711063" width="700"></p>
                            <h3>Điều khiển tùy biến</h3>
                            <p>Ống kính Nikon Z DX 18-140mm f3.5-6.3 với vòng điều khiển không tiếng vận hành mượt mà có thể tùy chỉnh để phù hợp với yêu cầu tác nghiệp của người dùng: lấy nét tay chuẩn xác hoặc điều chỉnh khẩu độ, ISO hoặc cân bằng phơi sáng.</p>`,
        category: "lenses"
    },
    {
        title: 'Nikon NIKKOR Z 800mm f/6.3 VR S',
        imageSrc: '../img/products/Lens/Nikon-NIKKOR-Z-800mm-f6.3-VR-S.jpg',
        price: '69.990.000₫',
        comparePrice: '175.990.000₫',
        descriptionHTML: `<p><strong>Nikon Z 800mm f/6.3</strong> là ống kính một tiêu cự chụp siêu xa nổi bật nhờ sự kết hợp độc đáo của một trong những tiêu cự dài nhất hiện có trong thiết kế di động ấn tượng. Thiết kế khác biệt này có thể thực hiện được nhờ bao gồm một thấu kính Phase Fresnel, giúp giảm 50% trọng lượng tổng thể và 16% chiều dài so với ống kính 800 mm f/5.6 ngàm F trước đây.</p>
                            <p><img height="393" src="https://zshop.vn/images/companies/1/san_pham/Lens/Nikon/1649203416_IMG_1729723a.jpg?1679365906996" width="700"></p>
                            <h3>Thiết kế nhẹ hơn, gọn hơn</h3>
                            <p>Sự kết hợp tinh vi giữa các công nghệ làm cho ống kính chụp siêu xa này trở thành một ống kính tương đối gọn gàng, mở ra những khả năng mới về độ dài tiêu cự mà trước đây chỉ dành cho việc sử dụng tripod.</p>
                            <p>Thành phần thấu kính Phase Fresnel không chỉ bù quang sai màu và viền màu mà còn thay thế một số phần tử thủy tinh thông thường để thúc đẩy bố cục quang học nhỏ gọn và nhẹ hơn.</p>
                            <p>Độ mở ống kính tối đa khiêm tốn f/6.3 tạo ra sự cân bằng giữa thiết kế sáng sủa thực tế và kết cấu nhẹ.</p>
                            <p>So với ống kính 800mm f/5.6 ngàm F trước đây nặng hơn 4536g, ống kính Nikon Z 800mm f/6.3 ngàm Z này có trọng lượng chỉ bằng một nửa ở mức 2385g. Ngoài ra, thiết kế dành riêng cho máy ảnh mirrorless cũng góp phần làm cho tổng thể ngắn hơn chiều dài ống kính, chỉ dài hơn 385mm so với ống kính trước đây dài 457mm.</p>
                            <p><img height="393" src="https://zshop.vn/images/companies/1/san_pham/Lens/Nikon/1649203416_IMG_1729729a.jpg?1679365947776" width="700"></p>
                            <h3>Chất lượng dòng ống kính S</h3>
                            <p>Giúp loại bỏ hầu như hoàn toàn quang sai màu, viền màu và coma, ống kính này có hai thấu kính ED (tán sắc cực thấp) và một thấu kính Super ED, hai thấu kính fluorite nhẹ và một thấu kính SR (khúc xạ bước sóng ngắn).</p>
                            <p>Thấu kính SR có thiết kế tán sắc cao chuyên dụng khúc xạ các bước sóng ngắn màu xanh lam; điều này giúp đạt khả năng kết xuất màu thực sự chính xác và cũng giúp làm thiết kế ống kính nhỏ gọn hơn.</p>
                            <p>Lớp phủ pha lê nano giúp chống lóa toàn diện ở mọi góc độ, giúp loại bỏ bóng mờ, phản quang và lóa sáng để có độ tương phản cao hơn và phản hồi màu sắc chính xác hơn khi chụp trong điều kiện ánh sáng mạnh và ngược sáng.</p>
                            <p><img height="393" src="https://zshop.vn/images/companies/1/san_pham/Lens/Nikon/1649203416_IMG_1729739a.jpg?1679365933957" width="700"></p>
                            <h3>Hệ thống lấy nét tự động đa điểm</h3>
                            <p>Hệ thống lấy nét đa điểm kết hợp hai bộ truyền động AF riêng biệt, được đồng bộ để mang lại khả năng lấy nét tự động đặc biệt nhanh và chính xác. Hệ thống này sử dụng động cơ bước, mang lại hiệu suất lấy nét tự động mượt mà và yên tĩnh ấn tượng, rất phù hợp với cả chụp ảnh và quay phim.</p>
                            <p>Ống kính Nikon Z 800mm f/6.3 có hỗ trợ lấy nét thủ công chéo toàn thời gian và sử dụng thiết kế lấy nét bên trong ống kính khi chỉ các nhóm thấu kính bên trong được di chuyển trong khi lấy nét, để duy trì chiều dài tổng thể của thấu kính trong quá trình sử dụng và thúc đẩy tốc độ lấy nét nhanh hơn.</p>
                            <p><img height="393" src="https://zshop.vn/images/companies/1/san_pham/Lens/Nikon/1649203416_IMG_1729732a.jpg?1679365923131" width="700"></p>
                            <h3>Chống rung Vibration Reduction</h3>
                            <p>Tính năng ổn định hình ảnh Vibration Reduction giúp giảm sự xuất hiện của rung máy đến 5 stop cho phép chụp cầm tay tốt hơn trong điều kiện ánh sáng yếu.</p>
                            <p>Tính năng Synchro VR cũng được hỗ trợ khi ghép nối với các máy ảnh tương thích có tính năng chống rung dịch chuyển cảm biến, kết hợp cơ chế chống rung trong thân máy với chống rung quang học để cải thiện hiệu suất và kiểm soát rung đến 5.5 stop.</p>`,
        category: "lenses"
    },
    {
        title: 'Samyang AF 35-150mm f/2-2.8 FE (Chính hãng)',
        imageSrc: '../img/products/Lens/samyang-35-150-1.webp',
        price: '30.980.000₫',
        comparePrice: '',
        descriptionHTML: `<p><strong>Samyang AF 35-150mm f/2-2.8 FE</strong> sở hữu khẩu độ tối đa là f/2 ở điểm rộng nhất và f/2.8 ở điểm cuối tele, bao quát năm độ dài tiêu cự chính (35mm/50mm/85mm/135mm/150mm). Với phạm vi zoom rộng, ống kính này được thiết kế như một ống kính toàn năng nhanh, bao quát nhiều tình huống chụp ảnh khác nhau từ chân dung đến du lịch. Ngoài ra, thiết kế quang học xuất sắc của ống kính cung cấp độ phân giải vượt trội đến tận rìa ảnh và động cơ bước tuyến tính cho phép thực hiện lấy nét tự động nhanh, chính xác hơn.</p>
                            <p><img alt="" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/1685868376a.jpg?1681181965657"></p>
                            <h3>Bao phủ mọi thứ trong khoảng từ 35mm đến 150mm</h3>
                            <p>Samyang đã tiến thêm một bước với ống kính zoom thứ hai để mang lại trải nghiệm thuận tiện hơn cho người dùng. Ống kính này rất linh hoạt vì là ống kính đa năng với khẩu độ tối đa nhanh và cung cấp giải pháp cho các nhiếp ảnh gia muốn tránh thay đổi ống kính. Mặc dù được thiết kế chủ yếu cho nhiếp ảnh gia chân dung, nhưng phạm vi zoom rộng cũng hữu ích chụp quảng cáo, sự kiện và du lịch.</p>
                            <p><img alt="" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/1685868376a1.jpg?1681182389634"></p>
                            <h3>Vượt trội từ góc này sang góc khác</h3>
                            <p>Với thiết kế quang học mới nhất sử dụng các thấu kính đặc biệt cho 12 trong tổng số 21 thành phần (trong 18 nhóm), thể hiện hiệu suất quang học xuất sắc trong các phạm vi zoom từ góc rộng đến tầm xa. Khi kết hợp với cảm biến ảnh full frame của Sony, ống kính mang lại hình ảnh sắc nét vượt trội từ góc cạnh. Ngoài ra, công nghệ UMC (Ultra Multi-Coating) giúp giảm thiểu hiện tượng lóa sáng và bóng mờ, giúp tạo ra hình ảnh tự nhiên và rõ nét.</p>
                            <p><img alt="" height="367" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/1685839757a.jpg?1681182501160" width="700"></p>
                            <h3>Hiệu ứng bokeh ấn tượng với khẩu độ sáng f/2-f/2.8</h3>
                            <p>Khẩu độ lớn bắt đầu từ f/2 tạo ra hiệu ứng mờ hậu cảnh hấp dẫn. Ống kính tách chủ thể khỏi nền hiệu quả, sử dụng độ sâu trường ảnh nông để chụp ảnh độc đáo. Hiệu ứng bokeh rõ ràng và tự nhiên nhờ 9 lá khẩu giúp chụp cảnh quan thành phố tuyệt đẹp vào ban đêm.</p>
                            <p><img alt="" height="461" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/1685839753.jpg?1681182679873" width="700"></p>
                            <h3>Hiệu suất AF nhanh, chính xác và MOD ngắn</h3>
                            <p>Động cơ bước tuyến tính mang lại khả năng phản hồi và độ chính xác cao khi chụp ảnh và quay video, rất phù hợp để theo dõi các đối tượng chuyển động nhanh. Ống kính này cũng cung cấp hiệu suất chụp cận cảnh tuyệt vời để zoom toàn diện. Với MOD (khoảng cách đối tượng tối thiểu) là 0,33m ở đầu 35mm và 0,85m ở đầu 150mm, bạn có thể dễ dàng chụp cận cảnh với chi tiết sắc nét. Kết hợp với khẩu độ nhanh, hậu cảnh được làm mờ đẹp mắt khi ở gần đối tượng, giúp ống kính trở nên linh hoạt hơn.</p>
                            <p><img alt="" height="461" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/1685839757.jpg?1681182830713" width="700"></p>
                            <h3>Các tính năng được tối ưu hóa để quay video</h3>
                            <p><img alt="" height="422" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/1685839952aa.jpg?1681182852108" width="700"></p>
                            <h3>Thiết kế cao cấp và chắc chắn</h3>
                            <p>'Vòng đỏ ẩn' nâng cấp thiết kế cao cấp của Samyang lên tầm cao mới, làm cho ống kính trở nên hấp dẫn hơn. Ngoài ra, bằng cách áp dụng vành kim loại, chất lượng chế tạo đã được cải thiện và ống kính chắc chắn hơn. Ống kính được thiết kế để chống chịu thời tiết ở ngàm và khắp thân máy. Niêm phong thời tiết giúp ngăn hư hỏng hoặc bám bẩn do bụi, mưa nhẹ và tuyết.</p>
                            <p><img alt="" height="329" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/1685839952a.jpg?1681182929892" width="700"></p>
                            <p><img alt="" height="461" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/1685839761a.jpg?1681183132822" width="700"></p>`,
        category: "lenses"
    },
    {
        title: 'Nikon NIKKOR Z 85mm f/1.2 S',
        imageSrc: '../img/products/Lens/Nikon-NIKKOR-Z-85mm-f1.2-S.webp',
        price: '65.000.000₫',
        comparePrice: '69.900.000₫',
        descriptionHTML: `<p><strong>Nikon Z 85mm f/1.2 S</strong> là ống kính một tiêu cự chân dung tầm xa ngắn cực nhanh dành cho máy ảnh mirrorlress ngàm Z. Ống kính đạt được cả hiệu suất kết xuất vượt trội và hiệu ứng bokeh lớn, đẹp mắt, mở rộng khả năng cho người dùng chụp ảnh chân dung, cưới, thai kỳ, thời trang cao cấp và boudoir.</p>
                            <p><img alt="" height="393" src="https://zshop.vn/images/companies/1/san_pham/Lens/Nikon/1675724738_IMG_1932083a.jpg?1679312270376" width="700"></p>
                            <h3>Ống kính f/1.2 cực nhanh</h3>
                            <p>Tách nền nổi bật với mặt phẳng lấy nét f/1.2 mỏng như tờ giấy. Ở f/2, các điểm sáng biến thành những quả cầu đẹp như mơ. Tăng hiệu suất thu thập ánh sáng và cho khả năng chụp trong bóng tối ở gần.</p>
                            <h3>Hiệu suất của dòng NIKKOR S cao cấp</h3>
                            <p>Ống kính siêu quang học với các tính năng video tiên tiến, chụp tốt kết cấu của da, tóc và vải. Được lắp ráp chuyên nghiệp với khả năng kháng thời tiết cao cấp.</p>
                            <p><img alt="" height="393" src="https://zshop.vn/images/companies/1/san_pham/Lens/Nikon/1675724738_IMG_1932101a.jpg?1679313453323" width="700"></p>
                            <h3>2 thấu kính phi cầu kết hợp với 1 thấu kính ED</h3>
                            <p>Hệ thống quang học này giúp ống kính giảm quang sai, giảm breathing, sửa méo hình và tối ưu hiệu chỉnh quang sai màu.</p>
                            <h3>Hệ thống lấy nét đa điểm và động cơ STM kép</h3>
                            <p>Lấy nét tự động dứt khoát ngay cả khi chụp ở f/1.2. Động cơ truyền động kép giúp lấy nét chính xác, yên tĩnh với tốc độ cao, hiệu suất hình ảnh tuyệt vời khi chụp ở khoảng cách gần.</p>
                            <p><img alt="" height="393" src="https://zshop.vn/images/companies/1/san_pham/Lens/Nikon/1675724738_IMG_1932097a.jpg?1679313431234" width="700"></p>
                            <h3>Triệt tiêu hiện tượng focus breathing</h3>
                            <p>Lấy nét tay ưu tiên tự động A/M giúp dễ dàng chuyển đổi ống kính sang chế độ lấy nét tay trong khi vận hành lấy nét tự động, tương thích với Eye-Detect AF, chuyển đổi tiêu điểm ấn tượng khi di chuyển từ chủ đề này sang chủ đề khác.</p>
                            <h3>Lớp phủ pha lê nano</h3>
                            <p>Loại bỏ gần như hoàn toàn lỗi phản quang phần tử thấu kính bên trong và giải quyết hiệu ứng bóng mờ do đó. Giảm bóng mờ và lóa sáng do ánh sáng đi vào ống kính theo đường chéo.</p>
                            <p><img alt="" height="393" src="https://zshop.vn/images/companies/1/san_pham/Lens/Nikon/1675724738_IMG_1932087a.jpg?1679313413534" width="700"></p>
                            <h3>Vòng điều khiển có thể cài đặt và nút tắt L-Fn</h3>
                            <p>Cài đặt mặc định là điều chỉnh lấy nét thủ công, nhưng người dùng cũng có thể cài đặt trong menu của thân máy ảnh để sử dụng điều khiển khẩu độ hoặc bù phơi sáng. Cài nút L.Fn để khóa AF, theo dõi hình ảnh hoặc phát lại.</p>
                            <h3>Kháng thời tiết cao cấp</h3>
                            <p>Thích hợp cho những chuyến du ngoạn ngoài trời, chụp phong cảnh trong môi trường khắc nghiệt.</p>`,
        category: "lenses"
    },
    {
        title: 'Samyang AF 75mm f/1.8 Fujifilm X',
        imageSrc: '../img/products/Lens/samyang-75mm-x-1.webp',
        price: '9.900.000₫',
        comparePrice: '',
        descriptionHTML: `<p><strong>Samyang AF 75mm f/1.8 X</strong> là ống kính supertelephoto một tiêu cự gọn nhẹ chỉ 257g kết hợp công nghệ quang học được tích lũy hơn 50 năm của Samyang. Cung cấp độ phân giải tuyệt vời đồng hành tuyệt vời với cảm biến có độ phân giải cao của các máy ảnh mới nhất trong thiết kế chụp xa tầm trung cực kỳ nhỏ gọn. Cùng với hiệu suất quang học vượt trội có thể quay rõ nét 4K và 6K, chức năng điều khiển khẩu độ cài sẵn mới độc đáo của Samyang cho phép bạn thể hiện độ sâu trường ảnh mượt mà khi quay video.</p>
                                <p><img alt="" height="393" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/Samyang%2075mm%20X%20%285%29a.jpg?1683170708722" width="700"></p>
                                <h3>Kết hợp hoàn hảo với máy ảnh Fujifilm X</h3>
                                <p>Ống kính AF 75mm f/1.8 X cực kỳ gọn nhẹ, chỉ nặng 257g và dài 69.3mm, là ống kính tele lấy nét tự động nhỏ và nhẹ nhất hiện nay dành cho người dùng ngàm Fuji X. Tối ưu tính di động của ống kính, kết hợp tuyệt vời với máy ảnh mirrorless nhỏ gọn của Fujifilm.</p>
                                <p><img alt="" height="468" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/1743582036.png?1683171288942" width="700"></p>
                                <h3>Độ phân giải xuất sắc</h3>
                                <p>Samyang AF 75mm f/1.8 X mang đến chất lượng hình ảnh xuất sắc với thiết kế quang học gồm 2 thấu kính HR (High-Refractive) và 3 thấu kính ED (Extra-Low Dispersion), cung cấp độ tương phản và phân giải tuyệt đẹp từ trung tâm tới góc ảnh. Công nghệ tráng phủ tân tiến của Samyang được áp dụng nhằm đạt độ sắc nét và trong rõ cao kể cả trong điều kiện ánh sáng yếu.</p>
                                <p><img alt="" height="389" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/1743578038.png?1683171894913" width="700"></p>
                                <h3>Hậu cảnh ấn tượng với bokeh tinh tế</h3>
                                <p>Làm nổi bật đối tượng bằng cách sử dụng độ sâu trường ảnh nông với AF 75mm f/1.8 X. Hiệu ứng bokeh mượt mà được tạo ra nhờ thiết kế khẩu độ tròn 9 lá giúp biểu hiện độ sâu trường ảnh nông trở nên mơ mộng hơn.</p>
                                <p><img alt="" height="468" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/1743582051.png?1683171962490" width="700"></p>
                                <h3>Chức năng kiểm soát khẩu độ cài sẵn chuyên dùng cho quay video</h3>
                                <p>Với tính năng riêng của Samyang "Điều khiển khẩu độ đặt sẵn" trên "Custom Swith", bạn có thể tạo một video tối đa giao diện độc đáo của riêng máy ảnh Fujifilm. Bạn có thể kiểm soát độ sâu trường ảnh mượt mà hơn mà không bị nhiễu và rung khi quay video ở chế độ AF. Mọi chuyển động sẽ được thể hiện tự nhiên hơn so với điều khiển trên thân máy ảnh Fujifilm.</p>
                                <p><img alt="" height="393" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/Samyang%2075mm%20X%20%285%29b.jpg?1683172062285" width="700"></p>
                                <h3>Thiết kế hiện đại với niêm phong thời tiết</h3>
                                <p>AF 75mm f/1.8 X áp dụng thiết kế Samyang AF thế hệ thứ 2 như vòng lấy nét có hoa văn bằng cao su, vòng màu đỏ ẩn và lớp hoàn thiện mờ, cũng như khả năng chống chịu thời tiết được áp dụng cho 5 điểm khác nhau.</p>
                                <p><img alt="" height="485" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/1677806443.png?1683172159351" width="700"></p>
                                <h3>Tự động lấy nét nhanh và chính xác</h3>
                                <p>Samyang AF 75mm f/1.8 X theo dõi đối tượng chính xác và nhanh chóng, trong khi AF hoạt động nhẹ nhàng và mượt mà ở chế độ quay video. Đặc biệt, ống kính thuận lợi cho việc quay video vì gọn và nhẹ phù hợp để sử dụng trên gimbal, kết hợp với các máy ảnh Fujifilm X nhỏ gọn.</p>
                                <p><img alt="" height="468" src="https://zshop.vn/images/companies/1/san_pham/Lens/Samyang/1743582373.png?1683172173791" width="700"></p>`,
        category: "lenses"
    },
    {
        title: "Máy quay phim Z CAM E2 Professional 4K Cinema Camera",
        imageSrc: "../img/products/Camcorder/z-cam-e2-1-500x500.webp",
        price: "53.190.000₫",
        comparePrice: "",
        descriptionHTML: `<p><strong>Z CAM E2 Professional 4K Cinema Camera</strong> là máy quay phim chuyên nghiệp, cho phép quay video 4K DCI và 4K UHD lên đến 160fps. Máy sử dụng cảm biến 4/3 inch (MFT mount) cung cấp hình ảnh tuyệt đẹp với Dynamic Range lên tới 13-stops, có hỗ trợ ghi hình ProRes HQ 10-bit, cũng như codec H.265 và H.264 để xử lý nén hiệu quả.</p>
                            <p><img alt="Ảnh sản phẩm Z CAM E2 Professional 4K Cinema Camera" src="https://cdn.vjshop.vn/may-quay-phim/z-cam/z-cam-e2-4k-cinema-camera/z-cam-e2-1.jpg"></p>
                            <h3>Hiệu Năng của Z CAM E2</h3>
                            <p>Máy quay phim <strong>Z Cam E2</strong> đem đến khả năng quay video 4K ở tốc độ 160fps và Full-HD lên đến 240fps chỉ bằng cảm biến CMOS 4/3 inch WDR với độ phân giải 10.28 MP. Bên cạnh đó, người dùng có thể đồng bộ cùng lúc hai chiếc <strong>E2</strong> với nhau thông qua một sợi cáp rời, và cho phép mở rộng khả năng đồng bộ lên đến 100 chiếc.</p>
                            <p><img alt="Hiệu Năng của Z CAM E2" src="https://cdn.vjshop.vn/may-quay-phim/z-cam/z-cam-e2-4k-cinema-camera/z-cam-e2-3.jpg"></p>
                            <p>Cảm biến 4/3” này còn hỗ trợ video 10-bit và dải Dynamic Range 13-stops, mang lại tính linh hoạt trong quá trình xử lý hậu kì. Đặc biệt, khi quay ở chế độ WDR, dải màu có thể lên tới 16-stops, cung cấp hình ảnh có màu sắc chính xác với độ chuyển màu mượt mà. Ngoài ra, chiếc camera này cho phép ghi hình ở chế độ ProRes 10-bit 4:2:2, cũng như sử dụng codec H.265 và H.264 để mã hóa video hiệu quả.</p>
                            <p><strong>Z CAM E2 Professional</strong> cung cấp ba mức ISO gốc là 80, 160 và 800. Điều đó có nghĩa là bạn có thể điều chỉnh mức độ phơi sáng thích hợp tùy theo điều kiện môi trường quay, mà vẫn duy trì chất lượng hình ảnh ở mức đáng kinh ngạc.</p>
                            <p><img alt="Z CAM E2 Professional với nhiều chố độ quay phim" src="https://cdn.vjshop.vn/may-quay-phim/z-cam/z-cam-e2-4k-cinema-camera/anh-mo-ta/z-cam-e2-info-3.jpg"></p>
                            <p>Hơn thế nữa, nhằm đáp ứng các tình huống chỉ được quay một lần như hội nghị, sự kiện, buổi thuyết trình,… chiếc máy này cho phép bạn quay không giới hạn thời gian, video sẽ chỉ dừng khi bộ lưu trữ đã đầy</p>
                            <h3>Khả năng kết nối của Z CAM E2 Professional</h3>
                            <p><b>Z Cam E2</b> được trang bị khá nhiều cổng kết nối để mở rộng khả năng điều khiển cũng như phạm vi hoạt động.</p>
                            <p>USB Type-C cho phép điều khiển và xem trực tiếp hình ảnh qua thiết bị iOS có cài ứng dụng Z Camera, đồng thời có thể sử dụng để ghi dữ liệu lên các bộ nhớ SSD gắn ngoài.</p>
                            <p>HDMI 2.0 hỗ trợ đầu ra video, cung cấp video DCI 4K 60fps 10-bit</p>
                            <p>Ethernet giúp truyền dữ liệu cực nhanh và cho phép điều khiển camera từ xa. Cổng dữ liệu này cũng mở ra khả năng phát trực tiếp video chất lượng cao qua internet.</p>
                            <p>Cổng LEMO 10-pin giúp kết nối một hoặc một chuỗi <strong>Z Cam E2</strong>, tạo điều kiện dễ dàng khi thiết lập các góc quay phức tạp.</p>
                            <p>Cổng COM (RS232) hỗ trợ giao thức UART</p>
                            <p>Cổng LANC 2.5mm cho phép kết nối với bộ điều khiển</p>
                            <p><img alt="Khả năng kết nối của Z CAM E2 Professional" src="https://cdn.vjshop.vn/may-quay-phim/z-cam/z-cam-e2-4k-cinema-camera/anh-mo-ta/z-cam-e2-info-2.jpg"></p>
                            <h3>Thiết kế thân máy</h3>
                            <p>Dễ thấy, máy quay <strong>Z Cam E2</strong> được hoàn thiện từ vật liệu nhôm cao cấp có độ bền cao, hỗ trợ quá trình tản nhiệt diễn ra nhanh chóng. Xung quanh thân máy được bố trí 9 lỗ ren cho phép gắn thêm các thiết bị hỗ trợ bên ngoài như khung máy, màn hình, thiết bị âm thanh,... Máy quay phim được cấp nguồn từ pin L-series (không bao gồm) hoặc thông qua adapter AC đi kèm. Một hệ thống các phím chức năng trên thân máy cho phép người dùng thiết lập các chế độ một cách trực quan.</p>
                            <p><img alt="Z Cam E2 - Pin L series" src="https://cdn.vjshop.vn/may-quay-phim/z-cam/z-cam-e2-4k-cinema-camera/anh-mo-ta/z-cam-e2-info-1.jpg"></p>
                            <h3>Ứng dụng iOS</h3>
                            <p><strong>Z Camera</strong> là một ứng dụng cho hệ điều hành iOS giúp kết nối máy quay phim với thiết bị di động thông qua kết nối Wifi hoặc cáp USB-C. Nó cho phép người dùng điều khiển và cài đặt chế độ quay từ xa, đồng thời cung cấp các tính năng nâng cao để xem trước hình ảnh trực tiếp trên màn hình của thiết bị ghép nối.</p>
                            <p><img alt="Z Cam E2 - Ứng dụng Z Camera" src="https://cdn.vjshop.vn/may-quay-phim/z-cam/z-cam-e2-4k-cinema-camera/anh-mo-ta/z-cam-e2-info-4.jpg"></p>`,
        category: "camcorders"
    },
    {
        title: "Blackmagic Pocket Cinema Camera 6K Pro",
        imageSrc: "../img/products/Camcorder/blackmagic-6k-pro-2-500x500.webp",
        price: "59.990.000₫",
        comparePrice: "65.500.000₫",
        descriptionHTML: `<p><strong>Blackmagic Pocket Cinema Camera 6K Pro</strong> là thế hệ máy quay Super35 nhỏ gọn với đầy đủ tính năng hơn hẳn các thế hệ trước. Theo đó, loại máy quay mạnh mẽ này sử dụng màn hình cảm ứng HDR với độ phân giải cao 6144x3456, độ nhạy sáng ISO lên đến 25600. Bên cạnh đó nó cũng sở hữu khả năng ghi trực tiếp vào đĩa USB-C, tích hợp bộ lọc ND, tùy chọn kính ngắm màn hình OLED hỗ trợ quá trình quay phim. Ngoài ra, máy quay còn có pin lớn cho phép kéo dài thời gian ghi hình.</p>
                            <h3>Cảm biến hình ảnh Super 35</h3>
                            <p>Máy quay Blackmagic 6K Pro sử dụng cảm biến Super35 với dải động 13 điểm dừng và ISO gốc kép cho độ nhạy sáng lên đến 25600 giúp ghi lại hình ảnh 50 fps với độ phân giải cao ở 6144x3456. Chức năng ghi hình của nó cũng có thể biến một khung hình thành hai khung hình khác nhau bằng cách cắt cảnh thứ hai ra từ một khung hình.</p>
                            <p><img alt="lackmagic 6K Pro sử dụng cảm biến Super35 với dải động 13 điểm dừng" src="https://cdn.vjshop.vn/may-quay-phim/blackmagic-design/blackmagic-pocket-cinema-camera-6k-pro/anh-bai-viet/blackmagic-6k-pro-9.jpg"></p>
                            <h3>Thiết kế thân máy</h3>
                            <p>Blackmagic 6K Pro có tất cả các tính năng ghi hình, cảm biến, giải động các nút và cổng chức năng như các thế hệ tiền nhiệm của nó. Tuy nhiên một số thiết kế mới bổ sung vào cho máy quay các tính năng quan trọng như màn hình LCD cảm ứng 5 inch có thể xoay với độ sáng 1500cd/m2, kính ngắm điện tử EVF Pro tùy chọn.</p>
                            <p><img alt="Màn hình LCD cảm ứng 5 inch của Blackmagic 6K pro có thể xoay với độ sáng 1500cd/m2" src="https://cdn.vjshop.vn/may-quay-phim/blackmagic-design/blackmagic-pocket-cinema-camera-6k-pro/blackmagic-6k-pro-7.jpg"></p>
                            <h3>Nâng cấp xử lý hình ảnh</h3>
                            <p>Về khả năng quay, độ phân giải mà Blackmagic 6K Pro hỗ trợ bao gồm: 6144x3456 (K), 6144x2560 (6K 2.4:1), 5744x3024 (5.7K 17:9), 4096x2160 (4K DCI), 1920x1080 (HD) và nhiều hơn nữa. Khả năng nâng cấp cho phép ghi hình rõ nét giúp chinh phục công nghệ độ phân giải 8K. Ngoài ra, bộ xử lý màu thế hệ Gen 5 được cập nhật cũng giúp dễ dàng cắt các cảnh quay 4K Pro, 6K và BMPCC 4K. Ngoài ra, Blackmagic 6K Pro cũng có thể chụp ảnh tĩnh 21.2MP.</p>
                            <p><img alt="Blackmagic 6K pro nâng cấp xử lý hình ảnh, đa dạng độ phân giải" src="https://cdn.vjshop.vn/may-quay-phim/blackmagic-design/blackmagic-pocket-cinema-camera-6k-pro/blackmagic-6k-pro-4.jpg"></p>
                            <h3>Một số thông số nổi bật của Blackmagic 6K Pro</h3>
                            <p>Màn hình cảm ứng LCD 5 inch xoay với độ sáng 1500 cd/m2.</p>
                            <p>Tích hợp bộ lọc ND 2/4/6.</p>
                            <p>Ngàm EF hỗ trợ chức năng iris, lấy nét tự động, thu phóng bằng cách sử dụng kết nối điện tử khi sử dụng các ống kính tương thích.</p>
                            <p>Sử dụng khe cắm thẻ CFast 2.0 và SD/UHS-II bên trong hoặc qua cổng HDMI đến bộ chuyển đổi ATEM mini để phát trực tiếp hoặc xuất qua cổng USB Type-C để ghi hình các clip dài hơn vào ổ SSD bên ngoài.</p>
                            <p>Hỗ trợ âm thanh chuyên nghiệp với hai đầu vào mini-XLR với nguồm phantom+48V, một đầu vào âm thanh nổi 3.5mm, một loa đơn âm, một đầu ra tai nghe và hệ thống mic âm thanh nổi tích hợp.</p>
                            <p><img alt="Blackmagic 6K pro hỗ trợ các cổng kết nối đầu ra chuyên nghiệp " src="https://cdn.vjshop.vn/may-quay-phim/blackmagic-design/blackmagic-pocket-cinema-camera-6k-pro/blackmagic-6k-pro-8.jpg"></p>
                            <p>Đồng hồ mã định thời gian (time code) chính xác.</p>
                            <p>Blackmagic 6K Pro đi kèm với nguồn điện 30W cung cấp khả năng sạc đồng thời. Loại pin NP-F570 L-series lớn cho phép ghi hình lâu hơn.</p>
                            <p>Cập nhật thế hệ màu Gen 5 giúp xử lý các cảnh cắt từ 4K Pro, 6K và BMPCC 4K. Đồng thời bổ sung ứng dụng chuyển đổi màu 3D LUT.</p>
                            <p>Sử dụng định dạng RAW với siêu dữ liệu cảm biến giúp đơn giản hóa việc chỉnh sửa.</p>
                            <p>Phụ kiện tùy chọn EVF Pro và Battery Grip.</p>`,
        category: "camcorders"
    },
    {
        title: "Máy quay phim Sony FX3 | Nhập Khẩu",
        imageSrc: "../img/products/Camcorder/sony-fx3-1-500x500.webp",
        price: "82.990.000₫",
        comparePrice: "89.990.000₫",
        descriptionHTML: `<h3>Sony FX3 (ILME-FX3) – Trải nghiệm điện ảnh tự do mới</h3>
                            <p>Máy quay phim Sony FX3 làm sống động từng thước phim, hiện thức hóa những ý tưởng táo bạo của những người sáng tạo nội dung đầy đam mê. FX3 mang đến chất điện ảnh với hiệu suất đáng tin cậy, phù hợp với nhu cầu sáng tạo ngày nay. Thiết kế nhỏ gọn và nhẹ, dễ dàng mang theo trong mọi chuyến hành trình.</p>
                            <p><img alt="Sony FX3 - Nâng tầm trải nghiệm quay phim điện ảnh" src="https://cdn.vjshop.vn/may-quay-phim/sony/sony-fx3/anh-bai-viet/sony-fx3-info-1.jpg"></p>
                            <h3>Ghi hình toàn khung, ngay cả trong điều kiện thiếu sáng</h3>
                            <p>Cảm biến Full-frame trong Sony FX3 được tối ưu, sử dụng các kỹ thuật thu thập ánh sáng tiên tiến giúp hình ảnh thu được trở nên rõ ràng hơn, đặc biệt là khả năng ghi hình chất lượng cao ngay cả trong điều kiện ánh sáng yếu. Độ nhạy sáng ISO 80 - 102400 và có thể mở rộng lên đến 409600.</p>
                            <p><img alt="Sony FX3 - Ghi hình trong điều kiện thiếu sáng" src="https://cdn.vjshop.vn/may-quay-phim/sony/sony-fx3/anh-bai-viet/sony-fx3-info-2.jpg"></p>
                            <h3>Dải tần nhạy sáng rộng, nâng cao khả năng sáng tạo</h3>
                            <p>Sony FX3 (ILME-FX3) cung cấp dải động lên tới 15-stop đặc biệt để xử lý các cảnh khác nhau từ trong nhà ra ngoài trời, từ buổi sáng đến buổi tối. Ghi lại mọi sắc thái, cho phép tự do cân bằng màu sắc, đem lại chất điện ảnh chưa từng có.</p>
                            <p><img alt="Sony FX3 - Cung cấp dải tần nhạy sáng rộng" src="https://cdn.vjshop.vn/may-quay-phim/sony/sony-fx3/anh-bai-viet/sony-fx3-info-3.jpg"></p>
                            <h3>Hiệu ứng Bokeh tuyệt đẹp</h3>
                            <p>Nhờ khả năng ghi hình ở độ phân giải 4K, với độ sâu trường ảnh nông, hiệu ứng Bokeh càng trở nên tuyệt đẹp. Qua đó, người dùng sẽ có được những trải nghiệm điện ảnh thú vị, tự do sáng tác chỉ với cảm biến full-frame.</p>
                            <p><img alt="Sony FX3 - Nâng cao chất lượng bokeh" src="https://cdn.vjshop.vn/may-quay-phim/sony/sony-fx3/anh-bai-viet/sony-fx3-info-4.jpg"></p>
                            <h3>Công nghệ màu S-Cinetone</h3>
                            <p>S-Cinetone được phát triển cho chiếc FX9 của Sony, đây là kiểu màu mặc định trên Sony FX3. Nó đã được tinh chỉnh chính xác để đáp ứng những yêu cầu của người sáng tạo nội dung trong thời điểm hiện tại. Màu sắc phong phú, tông màu da tự nhiên phù hợp với các dòng máy quay Cinema khác mà không cần chỉnh sửa.</p>
                            <p><img alt="Sony FX3 - Màu S Cinetone phong phú" src="https://cdn.vjshop.vn/may-quay-phim/sony/sony-fx3/anh-bai-viet/sony-fx3-info-5.jpg"></p>
                            <h3>Video 4K 120fps lấy nét chuẩn từng khung hình</h3>
                            <p>Ngay cả khi quay video ở tốc độ cao, từng chi tiết trong khung hình 4K đều được ghi lại nhờ khả năng lấy nét tự động có độ chính xác cao và khả năng đọc cực nhanh của chiếc máy FX3 (ILME-FX3). Bên cạnh đó, chế độ Slow & Quick (S&Q) cho phép người dùng toàn quyền kiểm soát tốc độ khung hình, tạo ra video slow-motion với chuỗi chuyển động đẹp mắt ở tốc độ làm chậm lên đến 5x.</p>
                            <p><img alt="Sony FX3 - Lấy nét ngay cả khi quay video tốc độ cao" src="https://cdn.vjshop.vn/may-quay-phim/sony/sony-fx3/anh-bai-viet/sony-fx3-info-6.jpg"></p>
                            <p>&nbsp;</p>`,
        category: "camcorders"
    },
    {
        title: "Máy quay phim Canon XA55",
        imageSrc: "../img/products/Camcorder/canon-xa55-500x500.webp",
        price: "29.990.000₫",
        comparePrice: "",
        descriptionHTML: `<h3>Máy quay phim Canon XA55</h3>
                            <p>Máy quay phim Canon XA55 là máy quay phim gọn nhẹ, có thể quay UHD 4K. Thiết bị được đánh giá là dòng sản phẩm máy quay phim 4K trang bị hệ thống video hình ảnh chất lượng cao từ Canon. XA55 phù hợp sử dụng khi quay phim chuyên nghiệp và quay phim tài liệu hoặc đưa tin từ hiện trường,.....</p>
                            <p>Canon XA55 tích hợp màn hình LCD 3.0 inch cho phép người dùng có thể quan sát hình ảnh trong quá trình ghi hình. Bên cạnh đó, màn hình cũng trang bị các nút điều khiển giúp bạn có thể thao tác nhanh chóng.</p>
                            <p><img alt="Máy quay phim Canon XA55 tích hợp màn hình LCD" src="https://cdn.vjshop.vn/may-quay-phim/canon/canon-xa55/anh-mo-ta/canon-xa55-10.png"></p>
                            <h3>Trang bị cảm biến 1inch CMOS</h3>
                            <p>Cảm biến kích thước lớn 1 inch được trang bị trên máy quay phim XA55 giúp cho máy quay có thể quay 4K. Bên cạnh đó, cảm biến 1 inch còn giúp cải thiện hình ảnh ít nhiễu hơn trong các tình huống thiếu sáng. Bộ xử lý hình ảnh DiG! C DV 6 của máy quay giúp nâng cao độ nhạy và giảm tiếng ồn trong quá trình quay. Thành phần công nghệ của bộ xử lý cung cấp sức mạnh và tốc độ xử lý hình ảnh cho phép các tính năng như thu video 4K UHD, ổn định hình ảnh, ghi chuyển động chậm và nhanh và Dual Pixel CMOS AF hoạt động chính xác.</p>
                            <p><img alt="Bộ xử lý hình ảnh DiG! C DV 6 được tích hợp trên Canon XA55" src="https://cdn.vjshop.vn/may-quay-phim/canon/canon-xa55/anh-mo-ta/canon-xa55-8.png"></p>
                            <h3>Hệ thống quang học</h3>
                            <p>Máy quay phim chuyên nghiệp XA55 tích hợp ống kính zoom quang học 15x duy trì chất lượng 4K UHD trong toàn bộ dải zoom và cung cấp dải tiêu cự từ 25.5 đến 382.5 mm (tương đương phim 35mm). Để nâng cao tính linh hoạt và độ bền, ống kính có 9 lá khẩu, tạo ra các vùng bokeh nghệ thuật và đẹp mắt. Ngoài ra, máy quay phim cũng được trang bị bộ lọc ND filter với các mức 1/4, 1/16, 1/64 hỗ trợ máy quay khi làm việc trong điều kiện ánh sáng chói hoặc ánh sáng yếu.</p>
                            <h3>Khả năng quay phim</h3>
                            <p>Máy quay phim chuyên nghiệp XA55 có cảm biến hình ảnh Canon 4K UHD CMOS 1.0 inch có khả năng quay video 4K UHD ở tốc độ 30p. Điều này đã làm cho máy quay XA55 trở thành thiết bị phục vụ cho việc quay phim chuyên nghiệp. Canon XA55 còn hỗ trợ ghi chuyển động chậm và nhanh, đồng thời có thể ghi ở tốc độ khung hình khác với tốc độ phát lại để có hiệu ứng chuyển động khác nhau. Máy ảnh hỗ trợ quay chuyển động chậm lên đến 60 khung hình / giây ở Full HD và 30 khung hình / giây ở 4K UHD.</p>
                            <p><img alt="Khả năng quay phim của Canon XA55" src="https://cdn.vjshop.vn/may-quay-phim/canon/canon-xa55/anh-mo-ta/canon-xa55-11-1.png"></p>
                            <p>Để hỗ trợ âm thanh tốt nhất cho quá trình quay video, XA55 cũng tích hợp bốn kênh âm thanh LPCM với các mức ghi khác nhau cho âm thanh sắc nét, chất lượng.</p>
                            <h3>Khả năng lấy nét</h3>
                            <p>Công nghệ Dual Pixel CMOS AF bắt nét chính xác, nhanh chóng. Hệ thống lấy nét Dual Pixel CMOS AF được phát triển bởi Canon với toàn bộ pixel trên cảm biến đều tham gia vào quá trình lấy nét giúp bắt nét chính xác. Với máy quay phim Canon XA55, bạn có thể kiểm soát tốt nét của chủ thế, đặc biệt là lấy nét khuôn mặt cho phép bạn tạo ra những thước phim 4K đầy ấn tượng.</p>
                            <p><img alt="Canon XA55 trang bị công nghệ Dual Pixel CMOS AF" src="https://cdn.vjshop.vn/may-quay-phim/canon/canon-xa55/anh-mo-ta/canon-xa55-9.png"></p>
                            <h3>Tích hợp khe cắm thẻ nhớ</h3>
                            <p>Máy ảnh quay phim Canon XA55 ghi dữ liệu vào khe cắm thẻ SD kép và xuất ra cổng mini-HDMI và 3G-SDI. Các khe cắm thẻ SD kép cho phép chuyển đổi tự động từ thẻ này sang thẻ khác, cũng như ghi đồng thời vào cả hai thẻ.</p>`,
        category: "camcorders"
    },
    {
        title: "Máy Quay Phim Canon XF705",
        imageSrc: "../img/products/Camcorder/canon-xf705-01-500x500.webp",
        price: "32.500.000₫",
        comparePrice: "34.990.000₫",
        descriptionHTML: `<p>Máy quay phim Canon XF705 mang đến những thước phim sống động, hiện thực hóa những ý tưởng táo bạo của những người sáng tạo nội dung đầy đam mê. Hỗ trợ quay chụp nhiều thể loại khác nhau từ quay phim chuyên nghiệp, blog du lịch, thể thao đến các quay phim độc lập tài liệu.</p>
                            <p><img alt="Máy quay phim Canon XF705 Chính hãng " src="https://cdn.vjshop.vn/may-quay-phim/canon/may-quay-phim-canon-xf705/canon-xf705-06-1.jpg"></p>
                            <h3>Thiết kế gọn nhẹ</h3>
                            <p>Với kích thước 378 x 210 x 162 mm, cân năng 2710g canon XF705 thuộc dòng máy quay phim chuyên nghiệp gọn nhẹ phù hợp với các sản phẩm tài liệu di chuyển nhiều. Màn hình LCD cảm ứng 4inch có thể xoay và EVF OLED 0.46” giúp người dùng quan sát, điều chỉnh màu sắc, ánh sáng, bố cục khung hình… đồng thời thu phóng hình ảnh, kiểm soát khả năng lấy nét, cho chất lượng hình ảnh, video thu được tốt nhất.</p>
                            <h3>Canon XF705 trang bị cảm biến CMOS 1 inch và bộ xử lý DIGIC DV 6</h3>
                            <p>Máy quay phim XF705 có cảm biến CMOS 1 inch quay video UHD 4K lên đến 60 khung hình / giây và quay HD lên đến 120 khung hình / giây. Tích hợp cảm biến và hai bộ xử lý DIGIC DV 6, máy quay XF705 mang đến cho người dùng những hình ảnh với độ sây trường ảnh nông, độ nhạy cao và độ nhiễu thấp cho hình ảnh trông tự nhiên nhất.</p>
                            <p><img alt="Canon XF705 trang bị cảm biến CMOS 1 inch" src="https://cdn.vjshop.vn/may-quay-phim/canon/may-quay-phim-canon-xf705/canon-xf705-10.jpg"></p>
                            <h3>Khả năng ổn định hình ảnh với độ chính xác cao</h3>
                            <p>Với hệ thống chống rung quang học 5 trục giúp làm giảm sự xuất hiện của hiện tượng rung máy tới 5 stops khi lắp máy quay với bất kỳ ống kình nào, cho chất lượng hình ảnh thu được sắc nét, không bị mờ nhòe. Khả năng lấy nét tự động trên diện rộng cùng tính năng theo dõi thông minh phát hiện pha, duy trì liên tục trên gần như toàn bộ khung hình. Phiên bản nâng cấp Firmware 1.0.1.1 cải thiện phản ứng thu phóng ở cả chế độ vòng và chế độ điều chỉnh, tăng tốc độ lấy nét trong khi thu phóng và bổ sung chức năng bộ lọc dọc để giảm các hiện vật như moiré,...</p>
                            <p><img alt="Khả năng ổn định hình ảnh ccuar máy quay Canon 705" src="https://cdn.vjshop.vn/may-quay-phim/canon/may-quay-phim-canon-xf705/canon-xf705-11.jpg"></p>
                            <p>Canon XF705 kết hợp zoom quang học HD 15X với khả năng zoom nâng cao lên đến 30x nhưng vẫn mang lại khả năng lấy nét chính xác ngay cả khi ghi hình 1080 ở 120 khung hình mỗi giây. Thiết kế 9 lá khẩu cho hiệu ứng bokeh hấp dẫn càng trở nên tuyệt đẹp.</p>
                            <h3>Cổng Kết nối</h3>
                            <p>Máy quay phim canon XF705 với đầu vào XLR kép, đầu ra HDMI 2.0 và 12G-SDI các video RAW 16 bit có thể được xuất ra các đầu ghi bên ngoài tương thích. Wifi tích hợp cho phép người dùng điều khiển các chức năng của máy ảnh thông qua trình duyệt và chuyển các tệp proxy.</p>`,
        category: "camcorders"
    },
    {
        title: "Máy quay phim Canon EOS C70 (Body Only)",
        imageSrc: "../img/products/Camcorder/canon-c70-cinema-camera-rf-mount-1-500x500.webp",
        price: "29.990.000₫",
        comparePrice: "35.000.000₫",
        descriptionHTML: `<h3>Cảm biến đầu ra tăng cường kép Super35 DGO</h3>
                            <p><img alt="Máy quay phim Canon EOS C70" src="https://cdn.vjshop.vn/may-quay-phim/canon/canon-eos-c70/anh-mo-ta/canon-eos-c70-info-1.jpg"></p>
                            <p>Cảm biến Super35 DGO (Dual Gain Output) thế hệ tiếp theo của Canon, cung cấp dải Dynamic Range lên tới hơn 16-stops cùng công nghệ lấy nét tự động Dual Pixel CMOS độc quyền. Cảm biến này giúp duy trì mức độ nhiễu thấp bằng cách đọc hình ảnh với hai mức khuếch đại khác nhau. Mức cao để tối ưu hóa các chi tiết vùng tối, trong khi mức thấp sẽ thu được các chi tiết vùng sáng. Do đó, hình ảnh khi được kết hợp với nhau sẽ có độ chính xác cao, các chi tiết và chất lượng hình ảnh được duy trì trên cả vùng sáng cũng như vùng tối.</p>
                            <p><img alt="Canon EOS C70 - Cảm biến Super 35 DGO" src="https://cdn.vjshop.vn/may-quay-phim/canon/canon-eos-c70/anh-mo-ta/canon-eos-c70-info-3.jpg"></p>
                            <h3>Bộ xử lý hình ảnh DIGIC DV7</h3>
                            <p>Bộ xử lý hình ảnh DIGIC DV7 của Canon cho phép xử lý thông tin ảnh một cách nhanh chóng, cung cấp sức mạnh cho các tính năng như ghi hình với tốc độ khung hình cao, Dual pixel AF, video HDR (PQ), chống rung điện tử,…</p>
                            <p><img alt="Canon EOS C70 - Bộ xử lý hình ảnh DIGIC DV7" src="https://cdn.vjshop.vn/may-quay-phim/canon/canon-eos-c70/anh-mo-ta/canon-eos-c70-info-2.jpg"></p>
                            <h3>Canon Log 2 / 3, quay video chất lượng HLG và PQ</h3>
                            <p>Máy quay phim <b>EOS C70</b> hỗ trợ đầy đủ các định dạng video Canon Log 2 và 3, cho phép tái tạo màu chính xác trong quá trình hậu kỳ với dải Dynamic range phủ rộng. Các tính năng quay video HLG (Hybrid Log-Gamma) và PQ giúp ghi lại cảnh quay HDR ngay lập tức mà không cần thông qua chỉnh sửa.</p>
                            <h3>Khả năng thích nghi cao của Canon EOS C70</h3>
                            <h3>RF-Mount</h3>
                            <p>Nhờ sử dụng ngàm RF, <strong>Canon EOS C70</strong> tương thích với dòng ống kính RF hiệu suất cao. Với khoảng cách buồng tối ngắn, ngàm RF giúp giảm thiểu đáng kể kích thước thân máy, đem đến thiết kế nhỏ gọn hơn.</p>
                            <p><img alt="Canon EOS C70 - Hệ thống ngàm RF nhỏ gọn" src="https://cdn.vjshop.vn/may-quay-phim/canon/canon-eos-c70/anh-mo-ta/canon-eos-c70-info-4.jpg"></p>
                            <h3>Tương thích với ống kính EF thông qua Adapter</h3>
                            <p>Ngàm chuyển EF-EOS R 0.71x cho phép chuyển đổi <a href="https://vjshop.vn/ong-kinh">ống kính</a> định dạng full frame sang Super 35mm. Thiết bị này giúp truyền dữ liệu ống kính EF qua ngàm RF, cung cấp đầy đủ thông tin về thông số và khả năng lấy nét cho các ống kính được gắn trên máy.</p>
                            <p><img alt="Canon EOS C70 - Tương thích với lens EF" src="https://cdn.vjshop.vn/may-quay-phim/canon/canon-eos-c70/anh-mo-ta/canon-eos-c70-info-6.jpg"></p>
                            <h3>Màn hình cảm ứng</h3>
                            <p>Thông qua màn hình LCD 3.5 inch cảm ứng, Canon <strong>C70</strong> cho phép điều khiển trực tiếp, truy cập nhanh chóng và dễ dàng cài đặt cấu hình máy. Người dùng chỉ cần chạm vào màn hình để bắt đầu / kết thúc ghi hình, cài đặt ISO, khẩu độ, cân bằng trắng, và các chế độ quan trọng khác.</p>
                            <p><img alt="Canon EOS C70 - Màn hình cảm ứng" src="https://cdn.vjshop.vn/may-quay-phim/canon/canon-eos-c70/anh-mo-ta/canon-eos-c70-info-7.jpeg"></p>
                            <h3>Khung hình dọc 9x16</h3>
                            <p>Với việc bố trí lỗ ren 1/4 inch trên báng tay cầm cho phép định vị <strong>Canon EOS C70</strong> để sử dụng theo chiều dọc. Các video được tạo ra theo tỉ lệ này rất thích hợp để đăng tải lên các trang mạng xã hội, khi mà hiện nay ngày càng có nhiều người sử dụng smartphone đọc tin tức thay thế cho tivi truyền thống.</p>
                            <p><img alt="Canon EOS C70 - Chế độ khung hình dọc" src="https://cdn.vjshop.vn/may-quay-phim/canon/canon-eos-c70/anh-mo-ta/canon-eos-c70-info-8.jpg"></p>`,
        category: "camcorders"
    },
];

// Generate HTML files for each unique product
const uniqueProducts = Array.from(new Map(products.map(p => [p.title, p])).values());
uniqueProducts.forEach(product => {
    const { fileName, content } = generateProductDetailHTML(product);
    fs.writeFileSync(fileName, content, "utf8");
    console.log(`✅ Generated: ${fileName}`);
});

console.log(`✅ Completed generating ${uniqueProducts.length} HTML files!`);