let currentIndex = 0;
const products = document.querySelectorAll('.product');
const totalProducts = products.length;
const visibleProducts = 5; // Số sản phẩm mỗi lần hiển thị
const productsContainer = document.querySelector('.products');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

function moveSlide(direction) {
    // Cập nhật currentIndex khi nhấn nút
    currentIndex += direction;

    // Kiểm tra nếu đã ở cuối danh sách sản phẩm hoặc đầu danh sách sản phẩm
    if (currentIndex >= totalProducts - visibleProducts + 1) {
        currentIndex = totalProducts - visibleProducts; // Đặt lại vị trí ở sản phẩm cuối
    } else if (currentIndex < 0) {
        currentIndex = 0; // Đặt lại vị trí ở sản phẩm đầu
    }

    // Cập nhật chuyển động của các sản phẩm (di chuyển 100% mỗi lần)
    const offset = -currentIndex * 100 / visibleProducts; 
    productsContainer.style.transform = `translateX(${offset}%)`;

    // Vô hiệu hóa nút Next khi đã đến sản phẩm cuối
    if (currentIndex === totalProducts - visibleProducts) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }

    // Vô hiệu hóa nút Prev khi đã đến sản phẩm đầu
    if (currentIndex === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }
}

// Gọi hàm để thiết lập trạng thái ban đầu (khi trang load)
moveSlide(0);

// Thêm sự kiện cho các nút Next và Prev
nextButton.addEventListener('click', () => moveSlide(1));
prevButton.addEventListener('click', () => moveSlide(-1));





