const NOMOR_WA = "6281237595133";

const products = [{
        id: 1,
        name: "Puma speedcat-Black",
        category: "Lifestyle",
        price: 1250000,
        image: "gambar/Puma-black.jpg",
        description: "Puma Speedcat warna hitam memiliki desain minimalis dan ramping dengan tampilan yang elegan serta mudah dipadukan dengan berbagai jenis pakaian. Warna hitam memberikan kesan klasik dan fleksibel untuk berbagai gaya, mulai dari celana jeans hingga outfit streetwear. Sepatu ini cocok untuk penggunaan sehari-hari, kuliah, berjalan-jalan, dan kegiatan santai. Desainnya terinspirasi dari sepatu balap, tetapi versi lifestyle lebih ditujukan untuk penggunaan kasual daripada olahraga intensif.",
        sizes: ["39", "40", "41", "42", "43", "44"]
    },
    {
        id: 2,
        name: "Puma Speedcat-Blue",
        category: "Lifestyle",
        price: 1300000,
        image: "gambar/Puma-Blue2.jpg",
        description: "Puma Speedcat warna biru menawarkan tampilan sporty dan modern dengan warna yang memberikan kesan segar serta unik. Desainnya yang ramping dan siluet rendah membuat sepatu ini cocok untuk gaya kasual, streetwear, hangout, dan aktivitas sehari-hari. Warna biru juga mudah dipadukan dengan pakaian berwarna putih, hitam, abu-abu, atau denim. Seperti varian lainnya, model Speedcat terinspirasi dari dunia motorsport dan memiliki ciri khas sol yang relatif tipis.",
        sizes: ["38", "39", "40", "41", "42", "43"]
    },
    {
        id: 3,
        name: "Puma Speedcat-Red",
        category: "Lifestyle",
        price: 1450000,
        image: "gambar/Puma-Red.jpg",
        description: "Puma Speedcat warna merah merupakan sepatu bergaya sporty dengan desain ramping yang terinspirasi dari sepatu balap mobil. Warna merah memberikan kesan berani, energik, dan mencolok. Sepatu ini cocok digunakan untuk aktivitas sehari-hari, berjalan-jalan, hangout, serta melengkapi outfit kasual dan streetwear. Solnya yang relatif tipis dan desainnya yang mengikuti bentuk kaki menjadi ciri khas seri Speedcat.",
        sizes: ["39", "40", "41", "42", "43", "44", "45"]
    },
    {
        id: 4,
        name: "Puma MB.05",
        category: "Basketball",
        price: 1999000,
        image: "gambar/MB05.jpg",
        description: "PUMA MB.05 memiliki tampilan sporty dan futuristik dengan desain yang terinspirasi dari karakter serta gaya bermain LaMelo Ball. Bagian atas sepatu menggunakan material mesh yang membantu sirkulasi udara, sedangkan desain solnya dirancang untuk memberikan kenyamanan, responsivitas, dan dukungan saat bermain basket. Sepatu ini juga memiliki ciri khas desain unik seperti logo alien dan detail yang terinspirasi dari tato LaMelo Ball. Sepatu ini cocok untuk pemain basket yang menginginkan performa tinggi dan gaya yang mencolok di lapangan.",
        sizes: ["38", "39", "40", "41", "42", "43"]
    }
];

function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

function renderProducts() {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <span class="product-price">${formatRupiah(product.price)}</span>
                <button class="product-btn" data-id="${product.id}">Lihat Detail</button>
            </div>
        </div>
    `).join("");

    grid.querySelectorAll(".product-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            openModal(Number(btn.dataset.id));
        });
    });

    grid.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", () => {
            openModal(Number(card.dataset.id));
        });
    });
}

function openModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const modal = document.getElementById("product-modal");
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
        <div class="modal-product">
            <img src="${product.image}" alt="${product.name}" class="modal-product-image">
            <div class="modal-product-details">
                <span class="modal-category">${product.category}</span>
                <h2>${product.name}</h2>
                <span class="modal-price">${formatRupiah(product.price)}</span>
                <p class="modal-description">${product.description}</p>
                <div>
                    <strong>Pilih Ukuran:</strong>
                    <div class="modal-sizes" id="size-selector">
                        ${product.sizes.map(s => `
                            <button class="size-badge" data-size="${s}">${s}</button>
                        `).join("")}
                    </div>
                </div>
                <button class="modal-buy-btn" id="buy-btn" disabled>
                    Pilih Ukuran Dulu
                </button>
            </div>
        </div>
    `;

    const sizeButtons = modalBody.querySelectorAll(".size-badge");
    const buyBtn = modalBody.querySelector("#buy-btn");
    let selectedSize = null;

    sizeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            sizeButtons.forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selectedSize = btn.dataset.size;
            buyBtn.disabled = false;
            buyBtn.textContent = `Beli Ukuran ${selectedSize} via WhatsApp`;
        });
    });

    buyBtn.addEventListener("click", () => {
        if (!selectedSize) return;
        orderViaWhatsApp(product, selectedSize);
    });

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function orderViaWhatsApp(product, size) {
    const pesan =
        `Halo REGSHOES!\n\n` +
        `Saya ingin memesan sepatu ini:\n\n` +
        `Nama Produk : ${product.name}\n` +
        `Kategori    : ${product.category}\n` +
        `Ukuran      : ${size}\n` +
        `Harga       : ${formatRupiah(product.price)}\n\n` +
        `Apakah stoknya masih tersedia? Terima kasih.`;

    const url = `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
}

function closeModal() {
    const modal = document.getElementById("product-modal");
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

function setupMobileMenu() {
    const openBtn = document.getElementById("menu-open-button");
    const closeBtn = document.getElementById("menu-close-button");
    const navLinks = document.querySelectorAll(".nav-link");

    if (openBtn) {
        openBtn.addEventListener("click", () => {
            document.body.classList.add("show-mobile-menu");
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            document.body.classList.remove("show-mobile-menu");
        });
    }
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            document.body.classList.remove("show-mobile-menu");
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    setupMobileMenu();

    const closeBtn = document.getElementById("close-modal");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    const modal = document.getElementById("product-modal");
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
});