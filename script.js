var header = document.getElementById("siteHeader");
var topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {

    var scrollPosition = window.scrollY;

        if (scrollPosition > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    
    if (scrollPosition > 400) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }

        var sections = document.querySelectorAll(".section");
    var currentSection = "";

    sections.forEach(function (section) {
        if (scrollPosition >= section.offsetTop - 120) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(function (link) {
        if (link.getAttribute("href") == "#" + currentSection) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});

topBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});




var filterButtons = document.querySelectorAll(".filter-btn");
var menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove active from all buttons
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Add active to clicked button
        button.classList.add("active");

        var selectedCategory = button.getAttribute("data-filter");

        // Show or hide menu items
        menuItems.forEach(function (item) {

            var itemCategory = item.getAttribute("data-category");

            if (selectedCategory == "all" ||
                selectedCategory == itemCategory) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    });
});



var cart = [];


try {
    var oldCart = localStorage.getItem("kadal-cart");

    if (oldCart) {
        cart = JSON.parse(oldCart);
    }
} catch (error) {
    cart = [];
}

var cartBtn = document.getElementById("cartBtn");
var cartPanel = document.getElementById("cartPanel");
var cartCount = document.getElementById("cartCount");
var cartLines = document.getElementById("cartLines");
var cartTotalRow = document.getElementById("cartTotalRow");
var cartTotal = document.getElementById("cartTotal");



function saveCart() {
    try {
        localStorage.setItem("kadal-cart", JSON.stringify(cart));
    } catch (error) {
        // Cart will still work until the page is closed
    }
}


function displayCart() {

    cartCount.textContent = cart.length;

    // If cart is empty
    if (cart.length == 0) {
        cartLines.innerHTML = '<p class="cart-empty">No items yet.</p>';
        cartTotalRow.style.display = "none";
        return;
    }

    cartLines.innerHTML = "";
    var total = 0;

   
    cart.forEach(function (item, index) {

        total = total + item.price;

        var line = document.createElement("div");
        line.className = "cart-line";

        var itemText = document.createElement("span");
        itemText.textContent = item.name + " — ₹" + item.price;

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function () {
            cart.splice(index, 1);
            saveCart();
            displayCart();
        });

        line.appendChild(itemText);
        line.appendChild(removeButton);
        cartLines.appendChild(line);
    });

    cartTotalRow.style.display = "flex";
    cartTotal.textContent = "₹" + total;
}



var addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        var item = button.closest(".menu-item");

        var itemName = item.getAttribute("data-name");
        var itemPrice = parseInt(item.getAttribute("data-price"));

        cart.push({
            name: itemName,
            price: itemPrice
        });

        saveCart();
        displayCart();

        // Open cart
        cartPanel.classList.add("open");
    });
});



cartBtn.addEventListener("click", function () {
    cartPanel.classList.toggle("open");
});



displayCart();


var form = document.getElementById("reserveForm");
var resMsg = document.getElementById("resMsg");

// Allow only today and future dates
var today = new Date();
var year = today.getFullYear();
var month = String(today.getMonth() + 1).padStart(2, "0");
var day = String(today.getDate()).padStart(2, "0");
document.getElementById("resDate").min = year + "-" + month + "-" + day;

form.addEventListener("submit", function (event) {

    event.preventDefault();

    var name = document.getElementById("resName").value.trim();
    var phone = document.getElementById("resPhone").value.trim();
    var date = document.getElementById("resDate").value;
    var guests = document.getElementById("resGuests").value;

 
    if (name == "") {
        document.getElementById("errName").style.display = "block";
    } else {
        document.getElementById("errName").style.display = "none";
    }


    if (/^[0-9]{10}$/.test(phone)) {
        document.getElementById("errPhone").style.display = "none";
    } else {
        document.getElementById("errPhone").style.display = "block";
    }


    if (date == "") {
        document.getElementById("errDate").style.display = "block";
    } else {
        document.getElementById("errDate").style.display = "none";
    }

        if (guests == "") {
        document.getElementById("errGuests").style.display = "block";
    } else {
        document.getElementById("errGuests").style.display = "none";
    }


    if (name != "" &&
        /^[0-9]{10}$/.test(phone) &&
        date != "" &&
        guests != "") {

        resMsg.textContent =
            "Thanks, " + name +
            "! Your table for " + guests +
            " on " + date + " is noted.";

        resMsg.className = "form-msg success";

        form.reset();

    } else {
        resMsg.className = "form-msg";
    }
});