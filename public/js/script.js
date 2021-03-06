var menu = document.querySelector('#menu-bars');
var navbar = document.querySelector('.navbar');
var wrapper = document.getElementById('menu-options');
// declare variable to store cart items
var cartItems = [];
wrapper.addEventListener('click', function (event) {
    var isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    var itemPrice = parseFloat(event.target.parentElement.querySelector(".price").innerHTML.substring(1));
    var itemName = event.target.parentElement.querySelector("#itemName").innerHTML;
    addCart(itemName, itemPrice);
});
function addCart(itemName, itemPrice) {
    for (var i = 0; i < cartItems.length; i++) {
        var result = cartItems[i].includes(itemName);
        //if found item then add to the counter
        if (result) {
            cartItems[i][2] = cartItems[i][2] + 1;
            var itemWrapper = document.querySelector("#item_" + i);
            var itemCount = itemWrapper.querySelector(".count");
            itemCount.innerHTML = (parseInt(itemCount.innerHTML) + 1).toString();
            break;
        }
    }
    var cartStatus = document.querySelector("#cart-status");
    if (cartItems.length === 0) {
        cartStatus.classList.add("active");
    }
    if (!result) {
        var itemWrapper_1 = document.createElement('div');
        var itemCountTag_1 = document.createElement('p');
        var itemCountText = document.createTextNode('1');
        var itemNameTag = document.createElement('p');
        var itemNameText = document.createTextNode(itemName);
        var itemPriceTag = document.createElement('p');
        var itemPriceText = document.createTextNode("$" + itemPrice);
        var removeButtonTag = document.createElement('button');
        var removeButtonText = document.createTextNode('Remove');
        itemCountTag_1.appendChild(itemCountText);
        itemNameTag.appendChild(itemNameText);
        itemPriceTag.appendChild(itemPriceText);
        removeButtonTag.appendChild(removeButtonText);
        removeButtonTag.addEventListener('click', function (event) {
            removeCart(itemWrapper_1, itemName, itemPrice, itemCountTag_1);
        });
        removeButtonTag.setAttribute("class", "remove-btn");
        itemCountTag_1.setAttribute("class", "count");
        itemWrapper_1.setAttribute("id", "item_" + (cartItems.length));
        itemWrapper_1.appendChild(itemCountTag_1);
        itemWrapper_1.appendChild(itemNameTag);
        itemWrapper_1.appendChild(itemPriceTag);
        itemWrapper_1.appendChild(removeButtonTag);
        var element = document.querySelector(".cart-items");
        element.appendChild(itemWrapper_1);
        cartItems.push([itemName, itemPrice, 1]);
    }
    // calculate subTotal
    changeSubTotal(true, itemPrice);
    // increase counter for the icon
    changeItemCounter(true);
}
function removeCart(itemWrapper, itemName, itemPrice, itemCountTag) {
    for (var i = 0; i < cartItems.length; i++) {
        console.log(i);
        var result = cartItems[i].includes(itemName);
        if (result) {
            // reduce count if there is more than or equal to one item qty
            if (cartItems[i][2] > 1) {
                cartItems[i][2] = cartItems[i][2] - 1;
                itemCountTag.innerHTML = parseInt(itemCountTag.innerHTML) - 1;
                console.log(cartItems);
            }
            else {
                //remove element if there is only one left
                itemWrapper.parentElement.removeChild(itemWrapper);
                cartItems.splice(i, 1);
                console.log(cartItems[i]);
                var cartStatus = document.querySelector("#cart-status");
                if (cartItems.length === 0) {
                    cartStatus.classList.remove("active");
                }
            }
            // calculate subTotal
            changeSubTotal(false, itemPrice);
            // decrease counter for the icon
            changeItemCounter(false);
            break;
        }
    }
}
function changeSubTotal(sign, itemPrice) {
    var subTotal = document.querySelector(".sub-total #value");
    if (sign)
        subTotal.innerHTML = "$" + (parseFloat(subTotal.innerHTML.substring(1)) + itemPrice).toFixed(2);
    else
        subTotal.innerHTML = "$" + (parseFloat(subTotal.innerHTML.substring(1)) - itemPrice).toFixed(2);
}
function changeItemCounter(sign) {
    var iconItemCounter = document.querySelector(".order-counter");
    if (sign)
        iconItemCounter.innerHTML = (parseInt(iconItemCounter.innerHTML) + 1).toString();
    else
        iconItemCounter.innerHTML = (parseInt(iconItemCounter.innerHTML) - 1).toString();
}
menu.onclick = function () {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};
var section = document.querySelectorAll('section');
var navLinks = document.querySelectorAll('header .navbar a');
window.onscroll = function () {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    section.forEach(function (sec) {
        var top = window.scrollY;
        var height = sec.offsetHeight;
        var offset = sec.offsetTop - 150;
        var id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            navLinks.forEach(function (links) {
                links.classList.remove('active');
                document.querySelector('header .navbar a[href*=' + id + ']').classList.add('active');
            });
        }
        ;
    });
};
var loginIcon = document.querySelector('#login-icon');
if (loginIcon) {
    loginIcon.onclick = function () {
        document.querySelector('#login-form').classList.toggle('active');
    };
}
var userIcon = document.querySelector('#user-icon');
if (userIcon) {
    userIcon.onclick = function () {
        document.querySelector('#profile-form').classList.toggle('active');
    };
}
var editAddress = document.querySelector('#edit-address');
if (editAddress) {
    editAddress.onclick = function () {
        document.querySelector('#address-form').classList.toggle('active');
    };
}
var editPhoneNumber = document.querySelector('#edit-phoneNumber');
if (editPhoneNumber) {
    editPhoneNumber.onclick = function () {
        console.log('clicked');
        document.querySelector('#phoneNumber-form').classList.toggle('active');
    };
}
// Close Button for Login Form
var closeLoginBtn = document.querySelector('#close-login');
closeLoginBtn.onclick = function () {
    document.querySelector('#login-form').classList.remove('active');
};
// Close Button for Profile Form
var closeProfileBtn = document.querySelector('#close-profile');
closeProfileBtn.onclick = function () {
    document.querySelector('#profile-form').classList.remove('active');
};
// Close Button for Change Address Form
var closeAddressBtn = document.querySelector('#close-address');
closeAddressBtn.onclick = function () {
    document.querySelector('#address-form').classList.remove('active');
};
// Close Button for Change Phone Number Form
var closePhoneNumberBtn = document.querySelector('#close-phoneNumber');
closePhoneNumberBtn.onclick = function () {
    document.querySelector('#phoneNumber-form').classList.remove('active');
};
// Close Button for Error message window
var closeErrorBtn = document.querySelector('#close-phoneNumber');
closeErrorBtn.onclick = function () {
    document.querySelector('#login-error').classList.remove('active');
};
// Toggle Button for Cart Window
var toggleCartBtn = document.querySelector('#cart-icon');
toggleCartBtn.onclick = function () {
    document.querySelector('.cart').classList.toggle('active');
};
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});
var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false
    },
    loop: true,
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        640: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}
function loadCategory(menu) {
    var myNodeList = [document.querySelectorAll('.box')];
    Array.from(myNodeList).forEach(function (menuList) {
        for (var i = 0; i < menuList.length; i++) {
            if (menuList[i].id == menu)
                menuList[i].classList.add('show');
            else
                menuList[i].classList.remove('show');
        }
    });
}
function fadeOut() {
    setInterval(loader, 3000);
}
window.onload = fadeOut;
window.addEventListener('load', function (event) {
    var firstMenu = document.querySelector('.menu-list button');
    loadCategory(firstMenu.id);
});
