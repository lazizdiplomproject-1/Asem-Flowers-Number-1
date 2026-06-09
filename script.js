let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   🛒 КОРЗИНА
========================= */

// ➕ добавить товар
function addToCart(name, price){

    cart.push({name, price});
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    renderCartUI();

    showToast(name + " қосылды 🛒");
}

// 🧠 счётчик корзины
function updateCartCount(){

    let count = document.getElementById("cartCount");

    if(count){
        count.innerText = cart.length;
    }
}

// ❌ удалить товар
function removeItem(index){

    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    renderCartUI();

    showToast("Өшірілді 🗑️");
}

// 🗑️ очистить корзину
function clearCart(){

    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    renderCartUI();

    showToast("Себет тазартылды 🗑️");
}

// 🛒 показать корзину
function renderCartUI(){

    let container = document.getElementById("cart-items");
    let totalText = document.getElementById("total");
    let emptyText = document.getElementById("emptyText");

    if(!container || !totalText) return;

    container.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        if(emptyText){
            emptyText.style.display = "block";
        }

        totalText.innerText = "Жалпы: 0 ₸";
        return;
    }

    if(emptyText){
        emptyText.style.display = "none";
    }

    cart.forEach((item, index)=>{

        total += item.price;

        container.innerHTML += `
        <div class="card">
            <h3>${item.name}</h3>
            <p>${item.price} ₸</p>
            <button onclick="removeItem(${index})">Өшіру</button>
        </div>
        `;
    });

    totalText.innerText = "Жалпы: " + total + " ₸";
}

/* =========================
   🔔 TOAST
========================= */

function showToast(message){

    let toast = document.getElementById("toast");

    if(!toast) return;

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    }, 2000);
}

/* =========================
   🚀 INIT
========================= */

document.addEventListener("DOMContentLoaded", ()=>{

    updateCartCount();
    renderCartUI();
});

/* =========================
   🔍 ПОИСК
========================= */

function searchFlowers(){

    let input = document.getElementById("searchInput");
    if(!input) return;

    let value = input.value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        let text = card.innerText.toLowerCase();

        card.style.display = text.includes(value) ? "block" : "none";
    });
}

/* =========================
   🎯 ФИЛЬТР
========================= */

function filterFlowers(type){

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        let cardType = card.getAttribute("data-type");

        if(type === "all" || cardType === type){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

/* =========================
   💖 ИЗБРАННОЕ
========================= */

function toggleFav(el){

    if(el.innerText === "♡"){
        el.innerText = "❤️";
    } else {
        el.innerText = "♡";
    }
}
function placeOrder(event){

    event.preventDefault();

    let name = document.querySelector('input[placeholder="Атыңыз"]').value;
    let phone = document.querySelector('input[placeholder="Телефон нөмірі"]').value;
    let address = document.querySelector('input[placeholder="Жеткізу мекенжайы"]').value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
        alert("Себет бос!");
        return;
    }

    let order = {
        name: name,
        phone: phone,
        address: address,
        items: cart,
        time: new Date().toLocaleString()
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));

    localStorage.removeItem("cart");

    alert("Тапсырыс қабылданды ✅");

    window.location.href = "index.html";
}
let favorites = JSON.parse(localStorage.getItem("fav")) || [];

function toggleFav(name, price){

    let index = favorites.findIndex(f => f.name === name);

    if(index === -1){
        favorites.push({name, price});
        showToast("❤️ Қосылды избранноеға");
    } else {
        favorites.splice(index, 1);
        showToast("💔 Өшірілді избранноедан");
    }

    localStorage.setItem("fav", JSON.stringify(favorites));
}
function getCart(){
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}
function checkoutWhatsApp(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
        alert("Себет бос!");
        return;
    }

    let message = "🌸 Asem Flowers тапсырыс:%0A%0A";

    let total = 0;

    cart.forEach((item, i) => {
        message += `${i+1}. ${item.name} - ${item.price} ₸%0A`;
        total += item.price;
    });

    message += `%0AЖалпы: ${total} ₸`;

    let phone = "87718828853";

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}
function saveOrder(order){

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));
}
let selectedProduct = null;

// OPEN MODAL
function openModal(name, price, img){

    selectedProduct = {name, price};

    document.getElementById("productModal").style.display = "flex";

    document.getElementById("modalTitle").innerText = name;
    document.getElementById("modalPrice").innerText = price + " ₸";
    document.getElementById("modalImg").src = img;

    document.getElementById("modalAddBtn").onclick = function(){
        addToCart(name, price);
        closeModal();
    };
}

// CLOSE MODAL
function closeModal(){
    document.getElementById("productModal").style.display = "none";
}

// CLICK OUTSIDE CLOSE
window.onclick = function(event){
    let modal = document.getElementById("productModal");
    if(event.target === modal){
        closeModal();
    }
};
