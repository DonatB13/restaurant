let menu = document.querySelector('#menu-bars') as HTMLElement;
let navbar = document.querySelector('.navbar') as HTMLElement;
const wrapper = document.getElementById('menu-options') as HTMLElement;

// declare variable to store cart items
var cartItems = [];


wrapper.addEventListener('click', (event) => {
  const isButton = (<HTMLInputElement>event.target).nodeName === 'BUTTON';
  if (!isButton) 
  {
    return;
  }

  const itemPrice = parseFloat((<HTMLInputElement>event.target).parentElement.querySelector(".price").innerHTML.substring(1));
  const itemName = (<HTMLInputElement>event.target).parentElement.querySelector("#itemName").innerHTML;

  addCart(itemName, itemPrice);
})

function addCart(itemName: string, itemPrice: number)
{
  for (let i = 0; i < cartItems.length; i++) {
    var result: boolean = cartItems[i].includes(itemName);

    //if found item then add to the counter
    if(result)
    {
      cartItems[i][2] = cartItems[i][2] + 1;
      const itemWrapper = document.querySelector("#item_" + i);
      const itemCount = itemWrapper.querySelector(".count");
      itemCount.innerHTML = (parseInt(itemCount.innerHTML) + 1).toString();
      break;
    }
  }

  const cartStatus = document.querySelector("#cart-status");

  if(cartItems.length === 0)
  {
    cartStatus.classList.add("active");
  }

  if(!result)
  {
    const itemWrapper = document.createElement('div');
    const itemCountTag = document.createElement('p');
    const itemCountText = document.createTextNode('1');
    const itemNameTag = document.createElement('p');
    const itemNameText = document.createTextNode(itemName);
    const itemPriceTag = document.createElement('p');
    const itemPriceText = document.createTextNode("$"+ itemPrice);
    const removeButtonTag = document.createElement('button');
    const removeButtonText = document.createTextNode('Remove');

    itemCountTag.appendChild(itemCountText);
    itemNameTag.appendChild(itemNameText);
    itemPriceTag.appendChild(itemPriceText);  
    removeButtonTag.appendChild(removeButtonText);

    removeButtonTag.addEventListener('click', (event) => {
      removeCart(itemWrapper, itemName, itemPrice, itemCountTag);
    });

    removeButtonTag.setAttribute("class", "remove-btn");
    itemCountTag.setAttribute("class", "count");
    itemWrapper.setAttribute("id", "item_" + (cartItems.length))

    itemWrapper.appendChild(itemCountTag);
    itemWrapper.appendChild(itemNameTag);
    itemWrapper.appendChild(itemPriceTag);
    itemWrapper.appendChild(removeButtonTag);

    const element = document.querySelector(".cart-items");

    element.appendChild(itemWrapper);

    cartItems.push([itemName, itemPrice, 1]);
  }

    // calculate subTotal

    changeSubTotal(true, itemPrice);

    // increase counter for the icon
    changeItemCounter(true);
}

function removeCart(itemWrapper: any, itemName: string, itemPrice: number, itemCountTag: any) {
  for (var i = 0; i < cartItems.length; i++) {
    console.log(i);
    var result = cartItems[i].includes(itemName);

    if(result)
    {
      // reduce count if there is more than or equal to one item qty
      if(cartItems[i][2] > 1)
      {
        cartItems[i][2] = cartItems[i][2] - 1;
        itemCountTag.innerHTML = parseInt(itemCountTag.innerHTML) - 1;
        console.log(cartItems);
      }
      else
      {
        //remove element if there is only one left
        itemWrapper.parentElement.removeChild(itemWrapper);
        cartItems.splice(i, 1);
        console.log(cartItems[i]);

        const cartStatus = document.querySelector("#cart-status");

        if(cartItems.length === 0)
        {
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

function changeSubTotal(sign: boolean, itemPrice: number)
{
  const subTotal = document.querySelector(".sub-total #value");

  if(sign)
    subTotal.innerHTML = "$" + (parseFloat(subTotal.innerHTML.substring(1)) + itemPrice).toFixed(2);
  else
    subTotal.innerHTML = "$" + (parseFloat(subTotal.innerHTML.substring(1)) - itemPrice).toFixed(2);

}

function changeItemCounter(sign: boolean)
{
  const iconItemCounter = document.querySelector(".order-counter");

  if(sign)
    iconItemCounter.innerHTML = (parseInt(iconItemCounter.innerHTML) + 1).toString();
  else
    iconItemCounter.innerHTML = (parseInt(iconItemCounter.innerHTML) - 1).toString();
}
menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec =>{

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){
      navLinks.forEach(links =>{
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
      });
    };

  });

}

const loginIcon: HTMLElement = document.querySelector('#login-icon')
if (loginIcon) {
  loginIcon.onclick = () =>{
    document.querySelector('#login-form').classList.toggle('active');
  }
}

const userIcon: HTMLElement = document.querySelector('#user-icon')

if (userIcon) {
  userIcon.onclick = () => {
    document.querySelector('#profile-form').classList.toggle('active');
  }
}

const editAddress: HTMLElement = document.querySelector('#edit-address')

if(editAddress) {
  editAddress.onclick = () => {
    document.querySelector('#address-form').classList.toggle('active');
  }
}

const editPhoneNumber: HTMLElement = document.querySelector('#edit-phoneNumber')

if(editPhoneNumber) {
  editPhoneNumber.onclick = () => {
    console.log('clicked')
    document.querySelector('#phoneNumber-form').classList.toggle('active');
  }
}

// Close Button for Login Form
const closeLoginBtn: HTMLButtonElement = document.querySelector('#close-login');
closeLoginBtn.onclick = () =>{
  document.querySelector('#login-form').classList.remove('active');
}

// Close Button for Profile Form
const closeProfileBtn: HTMLButtonElement = document.querySelector('#close-profile');

closeProfileBtn.onclick = () =>{
  document.querySelector('#profile-form').classList.remove('active');
}

// Close Button for Change Address Form
const closeAddressBtn: HTMLButtonElement = document.querySelector('#close-address');

closeAddressBtn.onclick = () =>{
  document.querySelector('#address-form').classList.remove('active');
}

// Close Button for Change Phone Number Form
const closePhoneNumberBtn: HTMLButtonElement = document.querySelector('#close-phoneNumber');

closePhoneNumberBtn.onclick = () =>{
  document.querySelector('#phoneNumber-form').classList.remove('active');
}

// Close Button for Error message window
const closeErrorBtn: HTMLButtonElement = document.querySelector('#close-phoneNumber');

closeErrorBtn.onclick = () =>{
  document.querySelector('#login-error').classList.remove('active');
}

// Toggle Button for Cart Window
const toggleCartBtn: HTMLButtonElement = document.querySelector('#cart-icon');
toggleCartBtn.onclick = () =>{
  document.querySelector('.cart').classList.toggle('active');
}


var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop:true,
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function loadCategory(menu: String)
{
  const myNodeList = [document.querySelectorAll('.box')];

  Array.from(myNodeList).forEach(function(menuList) 
  {
    for (let i = 0; i < menuList.length; i++) {
      if(menuList[i].id == menu)
        menuList[i].classList.add('show')
      else
        menuList[i].classList.remove('show')
    }
  });
}

function fadeOut(){
  setInterval(loader, 3000);
}

window.onload = fadeOut;

window.addEventListener('load', (event) => {
  const firstMenu = document.querySelector('.menu-list button')
  loadCategory(firstMenu.id);
});