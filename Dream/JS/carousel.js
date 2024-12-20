const productItems = document.querySelectorAll('.product-item');
const productDetail = document.getElementById('productDetail');

const productData = {
    1: { img: "Dream/Images/Sách/Sách điện tử/Văn học/Việt Nam/vh-vhvn-tvh-211.jpg", title: "Vợ Nhặt", views: 1, likes: 0, category: "Văn học Việt Nam", format: "Sách điện tử",link: "" },
    2: { img: "Dream/Images/Sách/Sách điện tử/Văn học/Nước ngoài/nxbtre_thumb_02462024_034622.jpg", title: "Jonas Jonas son", views: 5, likes: 2, category: "Văn học nước ngoài", format: "Sách điện tử",link: "Trang_chu.html" },
    3: { img: "Dream/Images/Sách/Sách điện tử/Tiểu thuyết/ypmq0b2unkytumpmtmvel4kw41k3l9bu (1).jpeg", title: "Kẻ truy sát", views: 2, likes: 5, category: "Văn học nước ngoài", format: "Sách điện tử" ,link: ""},
    4: { img: "Dream/Images/Sách/Sách điện tử/Gia đình và tình mẫu tử/Nước ngoài/burnt-sugar-6-5224-1596025215.jpg", title: "Burnt suger", views: 19, likes: 12, category: "Gia đình và tình mẫu tử", format: "Sách điện tử" ,link: ""},
    5: { img: "Dream/Images/Sách/Sách giấy/Tiêu thuyết/Nước ngoài/Kiêu hãnh và Định kiến - Jane Austen.jpg", title: "Kiêu hãnh và định kiến", views: 1, likes: 2, category: "Tiểu thuyết", format: "Sách điện tử" ,link: ""},
    6: { img: "Dream/Images/Sách/Sách giấy/Tự truyện và hồi ký/Nước ngoài/Con đường đi đến tự do - Nelson Mandela.jpg", title: "Con đường đi tới ước mơ", views: 0, likes: 0, category: "Gia đình và tình mẫu tử", format: "Sách điện tử" ,link: ""},
    7: { img:"Dream/Images/Sách/Sách giấy/Khoa học viễn tưởng/Nước ngoài/Thế giới mới (Brave New World) - Aldous Huxley.jpg", title: "Thế giới mới", views: 3, likes: 2, category: "Gia đình và tình mẫu tử", format: "Sách điện tử" ,link: ""},
    8: { img: "Dream/Images/Sách/Sách điện tử/Văn học/Nước ngoài/ag8xkdvs0i20xhax9pz8eveu2wwipr2w.jpeg", title: "Hàn phi tử", views: 5, likes: 2, category: "Tiểu thuyết", format: "Sách điện tử" ,link: ""},
};

productItems.forEach(item => {
    // Hover để hiển thị thông tin sản phẩm
    item.addEventListener('mouseover', () => {
        const index = item.getAttribute('data-index');
        updateProductDetail(index);
    });

    // Click để cố định thông tin sản phẩm
    item.addEventListener('click', () => {
        const index = item.getAttribute('data-index');
        updateProductDetail(index);
    });
});

function updateProductDetail(index) {
    const product = productData[index];
    productDetail.querySelector('img').src = product.img;
    productDetail.querySelector('h3').textContent = product.title;
    productDetail.querySelector('#views').innerHTML = `<i class="fa fa-eye" aria-hidden="true"></i> ${product.views} lượt xem`;
    productDetail.querySelector('#likes').innerHTML = `<i class="fa fa-heart-o" aria-hidden="true"></i> ${product.likes} lượt thích`;
    productDetail.querySelector('#category').textContent = `Thể loại: ${product.category}`;
    productDetail.querySelector('#format').textContent = `Hình thức: ${product.format}`;
    productDetail.querySelector('.btn-success').parentElement.href = product.link;
}



