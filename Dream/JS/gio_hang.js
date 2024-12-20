// Khôi phục giỏ hàng từ sessionStorage (nếu có)
var giohang = JSON.parse(sessionStorage.getItem("giohang")) || [];

// Hàm thêm sản phẩm vào giỏ hàng và chuyển đến trang giỏ hàng
function themvaogiohang(x) {
    const sachDiv = x.closest('.sach');
    const hinh = sachDiv.querySelector('img').src;
    const tensp = sachDiv.querySelector('h1').innerText;
    const tacgia = sachDiv.querySelector('.sach_ct .fa-regular.fa-user').parentElement.innerText.replace("Tác giả: ", "").trim();
    const theloai = sachDiv.querySelector('.sach_ct .fa-regular.fa-user').parentElement.nextElementSibling.innerText.replace("Nhà xuất bản: ", "").trim();

    let soluong = 1;

    const sp = [hinh, tensp, tacgia, theloai, soluong];
    let kt = 0;

    for (let i = 0; i < giohang.length; i++) {
        if (giohang[i][1] === tensp) {
            kt = 1;
            soluong += parseInt(giohang[i][4], 10);
            giohang[i][4] = soluong;
        }
    }

    if (kt === 0) {
        giohang.push(sp);
    }

    sessionStorage.setItem("giohang", JSON.stringify(giohang));
    window.location.href = 'Gio_hang.html';
    showcountsp();
    showmycart();
}


// Hàm hiển thị tổng số sản phẩm trong giỏ hàng
function showcountsp() {
    const totalBooks = giohang.reduce((sum, item) => sum + parseInt(item[4], 10), 0);  // Tổng số sách
    const countElement = document.querySelector(".gh-right span");
    if (countElement) {
        countElement.innerText = totalBooks;
    }
}

// Hàm hiển thị giỏ hàng
function showmycart() {
    let ttgh = "";
    let tongsoLuong = 0;
    let selectedCount = 0;
    if (giohang.length === 0) {
        // Nếu giỏ hàng trống, ẩn giỏ hàng và hiển thị thông báo
        document.getElementById("cartRow").style.display = "none";  // Ẩn giỏ hàng
        document.getElementById("emptyCartMessage").style.display = "block";  // Hiển thị thông báo
    } else {
        // Nếu giỏ hàng có sản phẩm, hiển thị giỏ hàng và ẩn thông báo
        document.getElementById("cartRow").style.display = "block";  // Hiển thị giỏ hàng
        document.getElementById("emptyCartMessage").style.display = "none";
        // Duyệt qua giỏ hàng và hiển thị các sản phẩm
        for (let i = 0; i < giohang.length; i++) {
            tongsoLuong += parseInt(giohang[i][4], 10);

            ttgh += `<div class="row  gh-left-sp">
                    <div class="col-sm-1">
                            <!-- Checkbox để chọn sản phẩm -->
                              <input type="checkbox" class="productCheckbox" data-index="${i}" onchange="updateProductSelection()">
                    </div>
                    <div class="col-sm-7">
                        <div class="row">
                            <div class="col-sm-4">
                                <img src="${giohang[i][0]}" alt="">
                            </div>
                            <div class="col-sm-8">
                                <p>${giohang[i][1]}</p>
                                <span><span>Tác giả: </span>${giohang[i][2]}</span>
                                <span><span>Nhà xuất bản: </span>${giohang[i][3]}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="col-sm-6">
                            <button onclick="handleMinus(${i})"><i class="fa-solid fa-minus"></i></button>
<input type="text" name="amount" value="${giohang[i][4]}" readonly>
                            <button onclick="handlePluss(${i})"><i class="fa-solid fa-plus"></i></button>
                        </div>
                         <div class="col-sm-5">
                                <p>Thành tiền</p>
                            </div>
                        <div class="col-sm-1">
                            <button onclick="xoasp(${i})"><i class="fa-regular fa-trash-can"></i></button>
                        </div>
                    </div>
                </div>`;
        }
    }

    const showCartElement = document.getElementById("showcart");
    if (showCartElement) {
        showCartElement.innerHTML = ttgh;
    }

    const countElement = document.getElementById("totalBooks");
    if (countElement) {
        countElement.innerText = tongsoLuong;
    }

    updateTotal();
}

// Hàm chọn/deselect tất cả sản phẩm
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll(".productCheckbox");
    checkboxes.forEach((box) => {
        box.checked = checkbox.checked;
    });
    updateTotal();
}


// Hàm cập nhật tổng số sách và nút "Thuê"
function updateTotal() {
    let selectedCount = 0;
    let totalBooks = 0;
    let totalPrice = 0;
    const checkboxes = document.querySelectorAll(".productCheckbox");

    checkboxes.forEach((checkbox, index) => {
        const quantityInput = document.querySelector(`#showcart .gh-left-sp:nth-child(${index + 1}) input[name="amount"]`);
        const quantity = parseInt(quantityInput.value);
        const price = parseFloat(giohang[index][5]);

        if (checkbox.checked) {
            // Nếu checkbox được chọn
            selectedCount++;
            totalBooks += quantity;
            totalPrice += quantity * price;
        }
    });

    // Cập nhật tổng số sách và tổng tiền
    const totalBooksElement = document.getElementById("totalBooks");
    if (totalBooksElement) {
        totalBooksElement.innerText = totalBooks;
    }

    const totalPriceElement = document.getElementById("totalPrice");
    if (totalPriceElement) {
        totalPriceElement.innerText = totalPrice.toFixed(2);
    }

    // Cập nhật trạng thái nút "Thuê"
    const thueButton = document.getElementById("thueButton");
    if (thueButton) {
        if (selectedCount === 0) {
            thueButton.disabled = true;
            thueButton.style.opacity = "0.5";
            thueButton.style.pointerEvents = "none";
        } else {
            thueButton.disabled = false;
            thueButton.style.opacity = "1";
            thueButton.style.pointerEvents = "auto";
        }
    }
}





window.onload = showmycart;


// Hàm xóa sản phẩm khỏi giỏ hàng
function xoasp(index) {
    giohang.splice(index, 1);
    sessionStorage.setItem("giohang", JSON.stringify(giohang));
    showmycart();
    showcountsp();


}


// Hàm giảm số lượng sản phẩm
function handleMinus(index) {
    if (giohang[index][4] > 1) {
        giohang[index][4]--;
        const quantityInput = document.querySelector(`#showcart .gh-left-sp:nth-child(${index + 1}) input[name="amount"]`);
        if (quantityInput) {
            quantityInput.value = giohang[index][4];
        }
        sessionStorage.setItem("giohang", JSON.stringify(giohang));
        updateTotal();
    }
}


// Hàm tăng số lượng sản phẩm
function handlePluss(index) {
    giohang[index][4]++;
    const quantityInput = document.querySelector(`#showcart .gh-left-sp:nth-child(${index + 1}) input[name="amount"]`);
    if (quantityInput) {
        quantityInput.value = giohang[index][4];
    }

    sessionStorage.setItem("giohang", JSON.stringify(giohang));
    updateTotal();
}


// Hàm chọn hoặc bỏ chọn sản phẩm
function updateProductSelection() {
    updateTotal();
}

// Hàm chọn tất cả sản phẩm
function selectAllProducts() {
    const selectAllCheckbox = document.getElementById("selectAll");
    const checkboxes = document.querySelectorAll(".productCheckbox");

    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckbox.checked;
    });
    updateTotal();
}

function handleRent() {
    const thueButton = document.getElementById("thueButton");

    if (thueButton.disabled) {
        return;
    }
    window.location.href = 'ThueTC.html';
}



function showmycart_thue() {
    let ttgh = "";
    let tongsoLuong = 0;
    for (let i = 0; i < giohang.length; i++) {
        tongsoLuong += parseInt(giohang[i][4], 10);

        ttgh += `<div class="row  ">
                    <div class="col-sm-7">
                        <div class="row">
                            <div class="col-sm-4">
                                <img src="${giohang[i][0]}" alt="">
                            </div>
                            <div class="col-sm-8">
                                <p>${giohang[i][1]}</p>
                                <span><span>Tác giả: </span>${giohang[i][2]}</span>
                                <span><span>Nhà xuất bản: </span>${giohang[i][3]}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-5">
                        <div class="col-sm-5">
                            ${giohang[i][4]}
                        </div>
                        <div class="col-sm-5">
                            <p>Thành tiền</p>
                        </div>
                    </div>
                </div>`;
    }

    const showCartElement = document.getElementById("showcart_tt");
    if (showCartElement) {
        showCartElement.innerHTML = ttgh;
    }

    const countElement = document.getElementById("totalBooks");
    if (countElement) {
        countElement.innerText = tongsoLuong;
    }


}
document.addEventListener("DOMContentLoaded", showmycart_thue);
