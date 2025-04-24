    // Số sản phẩm trên mỗi trang
    const productsPerPage = 12;
    // Trang hiện tại (mặc định là trang 1)
    let currentPage = 1;

    // Hàm tạo các nút phân trang động
    function createPaginationButtons(totalPages, idContainer, listProducts) {
        const pageContainer = document.querySelector('.page');
        pageContainer.innerHTML = ''; // Xóa các nút cũ

        // Thêm nút "<"
        const prevButton = document.createElement('div');
        prevButton.className = 'circle';
        prevButton.id = 'prevpage';
        prevButton.textContent = '<';
        pageContainer.appendChild(prevButton);

        // Thêm các nút số trang
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('div');
            pageButton.className = 'circle' + (i === 1 ? ' circle-active' : '');
            pageButton.textContent = i;
            pageContainer.appendChild(pageButton);
        }

        // Thêm nút ">"
        const nextButton = document.createElement('div');
        nextButton.className = 'circle';
        nextButton.id = 'nextpage';
        nextButton.textContent = '>';
        pageContainer.appendChild(nextButton);

        // Gắn sự kiện cho các nút
        attachPaginationEvents(idContainer, listProducts);
    }

    // Hàm hiển thị sản phẩm theo trang
    function displayProducts(page, idContainer, listProducts) {
        const productContainer = document.getElementById(idContainer);
        productContainer.innerHTML = '';

        const startIndex = (page - 1) * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, listProducts.length);

        for (const product of listProducts.slice(startIndex, endIndex)) {
            try {
                createProductItem(productContainer, product);
            } catch (error) {
                console.error('Lỗi khi tạo sản phẩm:', error);
            }
        }

        updatePagination(page, listProducts);
    }

    // Hàm cập nhật trạng thái các nút phân trang
    function updatePagination(page, listProducts) {
        const circles = document.querySelectorAll('.circle:not(#prevpage):not(#nextpage)');
        circles.forEach(circle => circle.classList.remove('circle-active'));

        const activeCircle = document.querySelector(`.circle:nth-child(${page + 1})`);
        if (activeCircle) {
            activeCircle.classList.add('circle-active');
        }

        // Ẩn/hiện nút "<" và ">" dựa trên trang hiện tại
        const totalPages = Math.ceil(listProducts.length / productsPerPage);
        document.getElementById('prevpage').style.display = page === 1 ? 'none' : 'block';
        document.getElementById('nextpage').style.display = page === totalPages ? 'none' : 'block';
    }

    // Hàm gắn sự kiện cho các nút phân trang
    function attachPaginationEvents(idContainer, listProducts) {
        document.querySelectorAll('.circle:not(#prevpage):not(#nextpage)').forEach((circle, index) => {
            circle.addEventListener('click', () => {
                currentPage = index + 1;
                displayProducts(currentPage, idContainer, listProducts);
            });
        });

        document.getElementById('nextpage').addEventListener('click', () => {
            const totalPages = Math.ceil(listProducts.length / productsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayProducts(currentPage, idContainer, listProducts);
            }
        });

        document.getElementById('prevpage').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayProducts(currentPage, idContainer, listProducts);
            }
        });
    }

