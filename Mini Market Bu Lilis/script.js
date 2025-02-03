// Daftar Produk
const products = [
    { name: "Produk 1", price: 10000 },
    { name: "Produk 2", price: 20000 },
    { name: "Produk 3", price: 15000 }
];

let cart = []; // Keranjang Belanja

// Menambahkan produk ke keranjang
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.product');
        const productName = productElement.getAttribute('data-name');
        const productPrice = parseInt(productElement.getAttribute('data-price'));
        const quantity = parseInt(productElement.querySelector('.quantity').value) || 1;

        // Cek apakah produk sudah ada di keranjang
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ name: productName, price: productPrice, quantity });
        }

        updateCart();
    });
});

// Memperbarui tampilan keranjang
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElem = document.getElementById('total-price');
    let cartHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        cartHTML += `<li>${item.name} - Rp ${item.price} x ${item.quantity}</li>`;
        totalPrice += item.price * item.quantity;
    });

    cartItemsList.innerHTML = cartHTML;
    totalPriceElem.innerHTML = `Total: Rp ${totalPrice}`;
}

// Menghitung uang kembali
function calculateChange() {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const payment = parseInt(document.getElementById('payment').value) || 0;
    const change = payment - totalPrice;

    if (change < 0) {
        document.getElementById('change').innerText = "Uang tidak cukup!";
    } else {
        document.getElementById('change').innerText = `Uang Kembali: Rp ${change}`;
    }
}

// Event listener untuk menghitung kembaliannya
document.getElementById('calculate-change').addEventListener('click', calculateChange);

// Proses checkout
document.getElementById('checkout').addEventListener('click', () => {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const payment = parseInt(document.getElementById('payment').value) || 0;

    if (payment < totalPrice) {
        alert('Uang tidak cukup untuk melakukan pembayaran.');
    } else {
        alert(`Terima kasih telah berbelanja! Total: Rp ${totalPrice}, Pembayaran: Rp ${payment}, Uang Kembali: Rp ${payment - totalPrice}`);
        cart = [];
        updateCart();
        document.getElementById('payment').value = '';
        document.getElementById('change').innerText = 'Uang Kembali: Rp 0';
    }
});
