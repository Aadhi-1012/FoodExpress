let cart = [];

function addToCart(name, price) {

    let item = cart.find(product => product.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();
}

function displayCart() {

    let cartItems = document.getElementById("cart-items");
    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty</p>";
    }

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let div = document.createElement("div");
        div.className = "cart-item";

        let name = document.createElement("span");
        name.textContent =
            item.name + " - ₹" + item.price +
            " × " + item.quantity;

        let controls = document.createElement("div");

        let minus = document.createElement("button");
        minus.textContent = "-";
        minus.onclick = () => changeQuantity(index, -1);

        let plus = document.createElement("button");
        plus.textContent = "+";
        plus.onclick = () => changeQuantity(index, 1);

        let remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.onclick = () => removeItem(index);

        controls.append(minus, plus, remove);
        div.append(name, controls);

        cartItems.appendChild(div);
    });

    document.getElementById("total").textContent = total;
}

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    displayCart();
}

function removeItem(index) {

    cart.splice(index, 1);
    displayCart();
}

function openPayment() {

    if (cart.length === 0) {
        alert("Please add food items to your cart!");
        return;
    }

    document.getElementById("payment-box").style.display = "flex";
}

function closePayment() {

    document.getElementById("payment-box").style.display = "none";
}

function placeOrder() {

    let name = document.getElementById("customer-name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();
    let method = document.getElementById("payment-method").value;

    if (name === "" || phone === "" || address === "") {
        alert("Please fill all payment details!");
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10 digit phone number!");
        return;
    }

    let total = document.getElementById("total").textContent;

    alert(
        "Order Placed Successfully!\n" +
        "Customer: " + name +
        "\nTotal: ₹" + total +
        "\nPayment: " + method
    );

    cart = [];
    displayCart();
    closePayment();

    document.getElementById("customer-name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
}