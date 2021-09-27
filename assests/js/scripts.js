
// Doubt: after loading cart page ,on changing quantity we are not able to updateprice
// OPEN PAGE FUNCTION NOT WORKING
const products = [{
    "image": "./assests/imgs/top-1-image.jpg",
    "name": "Canary yellow seahorse blazer",
    "price": "18000",
    "description": "here is the description of thr product"
},
{
    "image": "./assests/imgs/top-2image.jpg",
    "name": "seahorse blazer",
    "price": "18000",
    "description": "here is the description of thr product"
},
{
    "image": "./assests/imgs/top-3image.jpg",
    "name": "The quasimodo sleeve bodysuit",

    "price": " 12000",
    "description": "here is the description of thr product"
}, {
    "image": "./assests/imgs/top-6image.jpg",
    "name": "sleeve bodysuit",

    "price": " 12000",
    "description": "here is the description of thr product"
},
{
    "image": "./assests/imgs/top-4image.jpg",
    "name": "Sagrada familia rubber printed costume",

    "price": "10000",
    "description": "here is the description of thr product"
},
{
    "image": "./assests/imgs/top-5image.jpg",
    "name": "Starburst crop top",


    "price": "89000",
    "description": "here is the description of the product"
}
];

const menus = [
    {
        menuName: 'Home',
        link: './home.html'
    },
    {
        menuName: 'About',
        link: './about.html'
    },
    {
        menuName: 'Services',
        link: './service.html'
    },
    {
        menuName: 'Contact',
        link: './contact.html'
    },
    {
        menuName: 'Shop',
        dropdown: true,
        submenus:
            [
                {
                    menuName: 'Product page',
                    link: './products1.html'
                },
                {
                    menuName: 'Showcase',
                    link: './'
                },
                {
                    menuName:'My Orders',
                    link: './orders.html'
                }
            ]
    }

];
const sizeList = ['XS', 'S', 'M', 'L', 'XL'];
let selectedsize = "";
let notificationcontainer = document.getElementById("notification-container")
let notificationInfocontainer = document.getElementById("info-container")
let pageContentContainer = document.getElementById("page-content-container");
let onload = false;
let modal = new bootstrap.Modal(document.getElementById('myModal'));
let shippingformfieds = [
    {
        name: 'first Name',
        key: 'first Name',
        type: 'text'
    },
    {
        name: 'last Name',
        key: 'last Name',
        type: 'text'
    },
    {
        name: 'Email',
        key: 'email',
        type: 'email'
    },

    {
        name: 'Pincode',
        key: 'pincode',
        type: 'number'
    }
]
let Billingformfieds = [
    {
        name: 'first Name',
        type: 'text'
    },

    {
        name: 'Last Name',
        type: 'text'
    },
    {
        name: 'Email',
        key: 'email',
        type: 'email'
    },

    {
        name: 'Pincode',
        key: 'pincode',
        type: 'number'
    }

]

let placeOrder=false;

function generatesubmenu(submenuItem) {
    var elem = '';
    for (const submenu of submenuItem) {

        elem += `<li><a class="dropdown-item" href="${submenu.link}">${submenu.menuName}</a></li>`;


        
    }
    return elem;

}
function generateMenus() {

    let menucontainer = document.getElementById("menu-container")
    let elem = '';
    let i = 0;
    for (const menu of menus) {
        if (menu.dropdown) {
            elem += ` <li class="nav-item dropdown">`
            elem += `  <a href="${menu.link}" class="nav-link dropdown-toggle m-4"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${menu.menuName}`
            elem += ` </a>`
            elem += ` <ul class="dropdown-menu" aria-labelledby="navbarDropdown">`
            elem += generatesubmenu(menu.submenus);
            elem += ` </ul>`
            elem += `</li>`
        }
        else {
            elem += `<li class="nav-item m-4" ${i == 0 ? 'active' : ''}>`
            elem += ` <a href="${menu.link}" class="nav-link active" aria-current="page">${menu.menuName}</a>`
            elem += ` </li>`

        }
        i++;
    }
    menucontainer.innerHTML = elem;
}
// function openpage(pagename){
//     if(pagename){
//         $(pageContentContainer).stop().animate({
//                 opacity:'0'
//         },500,function(){
//             $(this).load(`${pagename}.html`).stop().animate({
//                 opacity:'1'
//             },500)
//         })
//     }else{
//         $(pageContentContainer).load('home.html')
//     }
// }

// generate size boxes dynamically into productdetail1.html
function generateSizeListBoxes(sizeName) {
    let sizeboxesContainer = document.getElementById("size-boxes-container");

    let elem = '';
    for (const size of sizeList) {
        elem += `<div class="boxes ${sizeName && sizeName.trim() == size.trim() ? 'highlight' : ''}" onclick="togglesizeclass(this)">${size}</div>`

    }
    // console.log(elem);
    sizeboxesContainer.innerHTML = elem;
}
//  FUNCTIONALITY FOR PRODUCTDETAIL.HTML PAGE ONLY

function addToCart() {

    const { productname, productimage, productprice, productdescription } = getproductdetailsfromsessionstorage();

    //  qunatity selected by user
    const quantity = document.getElementById('quantity').value;
    //    create an object of all details and add them to cart array
    if (quantity > 0 && selectedsize != "") {
        const productDetail = {
            productname,
            productprice,
            productimage,
            productdescription,
            quantity,
            selectedsize

        };

        let cart = [];
        let previouscart = getcartitems();
        if (previouscart.length > 0) {
            let productIndex = getproductindexfromcart(previouscart, productname);
            if (productIndex == -1) {

                cart = [...previouscart, productDetail];
            } else {
                cart = [...previouscart]
            }
        }
        else {
            cart = [productDetail];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        // window.location = './cart.html';
        shownotification(productname, 'has been added to cart', true);
        getTotalcartItemNumber(true);

    }
    else {
        alert("please select the size and quantity");
    }
}


// doubt what we are doing in togglesizeclass

function togglesizeclass(box) {
    //  console.log(box);
    // box.classList.toggle("highlight");
    selectedsize = box.innerHTML;
    generateSizeListBoxes(box.innerHTML)
}
//   FINCTIONALITY FOR ONLY PRODUCT1.HTML PAGE
//  produce the dynamic data into product1.html page

function generateProducts() {
    onload = true
    getTotalcartItemNumber();

    let productContainer = document.getElementById("products-container");
    let elem = '';

    products.forEach((product, index) => {
        const { image, name, price, description } = product;

        elem += `<div class="col col-md-4 col-xl-4" id="product-${index}" >`
        elem += `<div class="col product-container">`
        elem += `<div class="overlay transition"></div>`
        elem += `<div class="icons-container d-flex flex-column transition">`
        elem += ` <i class="far fa-eye eyeIcon p-3" onclick="saveproducts('${name}','${price}','${image}','${description}')"></i>`
        elem += `<i class="fas fa-heart heartIcon p-3 ${(inWishlist(name) != -1) ? 'like-btn-active' : ''}" onclick="addTowishlist('${name}','${price}','${image}','${description}',true)" ></i>`
        elem += `</div>`
        elem += `<img src="${image}" alt="">`

        elem += `<div class="col text-content d-flex flex-column align-items-center pt-2">`
        elem += `<p>${name}</p>`
        elem += ` <p> ${price}</p>`
        elem += `</div>`
        elem += `</div>`

        elem += `</div>`
    });
    productContainer.innerHTML = elem;

}
// wishlistfunction
function checkwishlist(name) {

    const { productname, productimage, productprice, productdescription } = getproductdetailsfromsessionstorage();
    let wishlisticon = document.getElementById("icon-container-heart")
    if (inWishlist(name) != -1) {
        if (wishlisticon)
            wishlisticon.innerHTML = ` <i class="fas fa-heart fs-5 "  onclick="addTowishlist('${productname}','${productprice}','${productimage}','${productdescription}',false)" style="color:#f00";cursor:pointer"></i>`;
        if (onload) {
            shownotification(name, "has been added from wishlist", true)

        } else {
            onload = true;

        }

    } else {
        // debugger;
        if (onload) {
            shownotification(name, "has been removed from wishlist", false)

        } else {
            onload = true;
        }
        if (wishlisticon)
            wishlisticon.innerHTML = ` <i class="fas fa-heart fs-5 " style="cursor:pointer" onclick="addTowishlist('${productname}','${productprice}','${productimage}','${productdescription}',false)"></i>`

    }
}
function inWishlist(name) {
    let wishlist = getwishlistitems();
    return getproductindexfromwishlist(wishlist, name)



}
function addTowishlist(name, price, image, description, listProducts) {


    let productIndex = inWishlist(name);
    let wishlist = getwishlistitems()
    const productDetail = {
        productname: name,
        productprice: price,
        productimage: image,
        productdescription: description,


    };
    if (productIndex == -1) {
        wishlist = [...wishlist, productDetail]
    } else {
        wishlist.splice(productIndex, 1)
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    // debugger;
    checkwishlist(name);

    if (listProducts)
        generateProducts();



}
function shownotification(name, message, success, error, warning) {

    notificationInfocontainer.innerHTML = `<strong>${name}</strong> ${message}`;
    notificationInfocontainer.style.color = success ? "#28a745" : "#f00"
    notificationcontainer.style.opacity = '1';
    setTimeout(() => {
        closenotification();
    }, 5000);

}
function closenotification() {
    notificationcontainer.style.opacity = '0';
}
function setwishlisttolocalstorage(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
function getproductindexfromwishlist(wishlist, productname) {
    return wishlist.findIndex((wl) => {
        return wl.productname === productname
    })
}
function getwishlistitems() {

    let wishlist = localStorage?.getItem('wishlist');
    if (wishlist) {
        return JSON.parse(wishlist);
    }
    return [];
}
//  wushlist functionality ends here
//  FUNCTIONALITY FOR PRODUCT.HTML AND PRODUCTDETAIL.HTML PAGE
//  save the data into local storage from product1.html page for showing on productdetail1.html page


function saveproducts(name, price, image, description) {
    localStorage.setItem('productname', name);
    localStorage.setItem('productprice', price);
    localStorage.setItem('productimage', image);
    localStorage.setItem('productdescription', description);

    window.location = "./productdetails1.html"

}
//    FUNCTIONALITY FOR PRODUCTDETAILS PAGE
// get the content from local storage and set into productdetails1.html page
function loadproductdetails() {

    generateSizeListBoxes();
    getTotalcartItemNumber();
    // reterive the data from local storage

    const productname = localStorage?.getItem("productname");
    const productprice = localStorage?.getItem("productprice");
    const productimage = localStorage?.getItem("productimage");
    const productdescription = localStorage?.getItem("productdescription");
    // set the data into productdetails1.html page
    if (productname && productprice && productimage && productdescription) {
        let productNamecontainer = document.getElementById("product-name");
        let productpricecontainer = document.getElementById("product-price");
        let productimagecontainers = document.getElementsByClassName("product-image");
        let productdescriptioncontainer = document.getElementById("product-description");
        productNamecontainer.innerHTML = productname;
        productpricecontainer.innerHTML = '₹' + productprice;
        productdescriptioncontainer.innerHTML = productname;
        // why foreach loop not work here
        // for(let i=0;i<productimagecontainers.length;i++){
        //     productimagecontainers[i].src=productimage
        // }
        for (const productimagecontainer of productimagecontainers) {
            productimagecontainer.src = productimage
        }
        checkwishlist(productname);
    } else {
        window.location = "./products1.html"
    }


}

// extract the details from sessionstorage
function getproductdetailsfromsessionstorage() {
    const productname = localStorage.getItem("productname")
    const productimage = localStorage.getItem("productimage");
    const productprice = localStorage.getItem("productprice");
    const productdescription = localStorage.getItem("productdescription");
    return {
        productname,
        productimage,
        productprice,
        productdescription
    };
}


//   FUNCTIONALITY FOR CART PAGE

// get details into cart page
// function getdetails(){

//     let productimageofcart=document.getElementById("productimagecontainerofcart");
//     let productnameofcart=document.getElementById("productnamecontainerofcart");
//     let productpriceofcart=document.getElementById("priceContainerofcart");
//     let inputcontainer=document.getElementById("inputcontainer");
//     let cart=localStorage.getItem('cart');
//     cart=JSON.parse(cart);
//     // console.log(cart.productname);
//     productimageofcart.src=cart.productimage;
//     productnameofcart.innerHTML= cart.productname       ;
//     productpriceofcart.innerHTML=cart.productprice;
//     inputcontainer.value=cart.quantity;

// }



// function incrementclickerevent(){
//     let increamentcontainer=document.getElementById("increamentcontainer");
//     let inputcontainer=document.getElementById("inputcontainer");
//     // let decrementcontainer=document.getElementById("decrementcontainer");
//    let value=  inputcontainer.value++;
//    localStorage.setItem()

// }
//  FUCNCTION TO GETTHE TOTAOL NUMBEROF ITEM IN CART TO POPULATE ON CART ICON OF EVERY PAGE
function getTotalcartItemNumber(onlycartnumber) {
    // openpage();
    if (!onlycartnumber)
        generateMenus();

    let cart = localStorage.getItem('cart');

    if (cart) {
        cart = JSON.parse(cart);
        // console.log(cart.length)
        document.getElementById("cart-item-total").innerHTML = cart.length;
    }
}


//  FUNCTION TO POPULATE ITEMS ON CART PAGE
function populatecart() {
    getTotalcartItemNumber();
    populateAddress();

    let cart = getcartitems();
    let cartDetailcontainer = document.getElementById("cart-details")
    let totalamountcontainer = document.getElementById("total-amount")
    let subtotalamountcontainer = document.getElementById("subtotal-amount")
    

    
    
       let[total,elem]=renderDesign(0,true,cart)
        
        if (cart.length > 0) {
            
            subtotalamountcontainer.innerHTML = total;
            totalamountcontainer.innerHTML = total;
            cartDetailcontainer.innerHTML = elem;
            // if(currenselection)
            // document.getElementById(currenselection).focus();
        }

        else {
            window.location = './products1.html';
        }
    
}
function renderDesign(total,cart,arr){

   
    let elem='';
    for (const product of arr) {
        // console.log(product);
        let subtotal = +product.productprice * product.quantity;
        total = total + subtotal;
        elem += `<div class="row pt-1 pb-1">`
        elem += `<div class="col-6">`
        elem += `<div class="row align-items-center">`
        if(cart)
             elem += ` <div class="col-1 pt-2" onclick ="deleteitemfromcart('${product.productname}')">X</div>`
        elem += `<div class="col-2">`
        elem+=` <img src="${product.productimage}"width="50%">`
        elem += `</div>`
        elem += `<div class="col-9 text-left">`
        elem += `${product.productname}`
        elem += ` </div>`
        elem += `</div>`
        elem += ` </div>`
        elem += `<div class="col-6">`
        elem += ` <div class="row justify-content-start align-items-center align-items-center">`
        elem += `<div class="col-4">${product.productprice}</div>`
        elem += `<div class="col-4 d-flex justify-content-start align-items-center">`
        if(cart)
           elem += `<input type="number" id="${product.productname}"   onkeyup="updatequnatity(event,this,'${product.productname}','${product.quantity}','${product.productprice}')" value="${product.quantity}" class="cart-quantity-box">`
        else
           elem+=product.quantity;   
        elem += ` </div>`
        elem += `<div class="col-4 text-center">₹ ${subtotal}</div>`
        elem += ` </div>`
        elem += ` </div>`

        elem += ` </div>`
        elem += `<hr>`
    }
    return [total,elem];

}

//  FUNCTION TO DELETE ITEM FROM A CART PAGE
function deleteitemfromcart(productname) {
    console.log("productname")
    // let cart=localStorage.getItem(cart);
    // let productIndex= cart.findIndex((ct)=>{
    //     return ct.productname===productname;
    // });
    // cart.splice(productIndex,1);
    // localStorage.setItem('cart',JSON.stringify(cart));
    // populatecart();
}
// debugger;
// diubts from here
function getproductindexfromcart(cart, productname) {
    return cart.findIndex((ct) => {
        return ct.productname === productname
    });
}
function getcartitems() {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(cart);
    }
    return [];
}


function updatequnatity(event,box, productname, quantity, productprice) {
    // console.log(event);
    if (event.keyCode == 13) {
        if (box.value != "" && box.value != quantity) {
            let cart = getcartitems();
            if (cart.length > 0) {
                let productIndex = getproductindexfromcart(cart, productname);
                cart[productIndex].quantity = box.value;
                setcarttolocalstorage(cart);
                // currenselection=box.id;
                populatecart();
                // currenselection.style.width="200px";
            }
        }
    }
}
function setcarttolocalstorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
}
function deleteitemfromcart(productname) {

    let cart = getcartitems();

    let productIndex = getproductindexfromcart(cart, productname);
    cart.splice(productIndex, 1);
    setcarttolocalstorage(cart);
    populatecart();


}




//  adreess mangaing section
function generateFormFieldID(shipping, key) {
    
    return shipping ? `shipping-${key}` : `billing-${key}`;
}
function getform(shipping) {
    
    let elem = '';
    let fieldsData = [];
    let addressdetails=[];
    if (shipping){
        fieldsData = shippingformfieds.slice();
       addressdetails = getAddressfromlocalstorage("shipping");
        
    }

    else{
        fieldsData = Billingformfieds.slice();
        addressdetails=getAddressfromlocalstorage('billing');


    }
            addressdetails=JSON.parse(addressdetails);
    for (const fieldobject of fieldsData) {
        elem += `<div class="row pt-2 pb-2 bottom-border">`
        elem += `<div class="col-6 border-right">${fieldobject.name}</div>`
        elem += `<div class="col-6">`;
        elem += `<input type="${fieldobject.type}" value="${rendervalue(fieldobject.key,addressdetails)}" id="${generateFormFieldID(shipping, fieldobject.key)}"/>`;
        elem += `</div>`
        elem += `</div>`;

    }

    return elem;
}
function rendervalue(key,addressdetails){
    
    
    if(addressdetails)
      return addressdetails[key];

      return '';
}

function populateaddresssection(shipping,paymentpage) {
    
            
    let modalTitle = document.getElementById('modal-title');
    let modalbodycontainer = document.getElementById('modal-body');
    let modalsavebuttoncontainer = document.getElementById("save-button");
    
    if(paymentpage){
        // debugger;
          $.get("./payment-page.html",function(res){
            modalTitle.innerHTML = 'Enter Card Details';
            modalbodycontainer.innerHTML = res;
            modalsavebuttoncontainer.innerHTML = "Place Order";
            placeOrder = true;
            // console.log(res);
          });
    }else{
        if (shipping) {
            modalTitle.innerHTML = 'Shipping Address';
            modalbodycontainer.innerHTML = getform(true);
            modalsavebuttoncontainer.innerHTML = "Save Shipping Address";
        } else {
            let addresscopycontainer = `<span><input type="checkbox"id="uncheckbox" onchange="copyshippingaddress(this)"/>Same as Billing Address</span>`
            modalTitle.innerHTML = 'Billing Address `'
            modalbodycontainer.innerHTML = getform();
            modalsavebuttoncontainer.innerHTML = "Save Billing Address";
        }
    }
    modal.show();
    
}
// save shipping address toloaclstorage
function saveAddresstolocalstorage(key, value) {
;
    localStorage.setItem(key, value);
}

function getAddressfromlocalstorage(key) {
;
    return localStorage.getItem(key);
}

function saveinfo() {
    //;
    let modalsavebuttoncontainer = document.getElementById("save-button");
    if(modalsavebuttoncontainer.innerHTML=="Place Order"){
        let cardnumbercontainer=document.getElementById("CardNumber")
        let cardExpirycontainer=document.getElementById("cardexpiry")
        let cardCVVcontainer=document.getElementById("CVV")
        let cardobject={
            cardnumber:  cardnumbercontainer.value,
            cardexpiry:cardExpirycontainer.value,
            cardCVV:cardCVVcontainer.value
        }
        savecardinfo(cardobject);
       saveorder();
    }
   else if (modalsavebuttoncontainer.innerHTML == "Save shipping Address") {
        let fields = shippingformfieds.slice();

        let shippingobject = {};
        for (const field of fields) {
            shippingobject[field.key] = document.getElementById(`shipping-${field.key}`).value;
        }

        modal.hide();
        saveAddresstolocalstorage('shipping', JSON.stringify(shippingobject))

    }
    else {
        debugger;
        let fields = shippingformfieds.slice();
        let billingobject = {};
        for (const field of fields) {
            console.log(field.key)
            billingobject[field.key] = document.getElementById(`billing-${field.key}`).value
        }
        // console.log(shippingobject);
        modal.hide();
        saveAddresstolocalstorage('billing', JSON.stringify(billingobject))

    }
    populateAddress();
}
function savecardinfo(cardobject){
    localStorage.setItem('card',JSON.stringify(cardobject));
}
function saveorder(){
    let cart = getcartitems();
    let orders = getOrders();
    let products = [];
    if (orders.products && orders.products.length > 0) {
        products = [...orders.products, ...cart];
    } else {
        products = [...cart];
    }
    orders = {
        "products": products,
        "billingAddress": getAddressfromlocalstorage('billing'),
        "shippingAddress": getAddressfromlocalstorage('shipping')
    };
    localStorage.clear();
    saveordertoLocalstorage(orders);
    window.location = './orders.html';
}




function openpaymentcart(){
 modal.show();   
 
}

function copyshippingaddress(box) {

    if (box.checked) {
        let shippingAddress = getAddressfromlocalstorage('shipping');
        if (shippingAddress) {
            let billingAddress = JSON.parse(shippingAddress);
            saveAddresstolocalstorage('billing', shippingAddress);
        }
    } else {
        removeAddressfromlocalstorage('billing')
    }
    // box.checked=false;
    populateAddress();
}
function removeAddressfromlocalstorage(key) {

    localStorage.removeItem(key);

}

// populate addresses on screen
function getAddresslayout(obj, containername, addressname) {
    let addresstype=containername.split('-')[0];

    let addresscontainer = document.getElementById(containername);
    
    let elem = '';
    if (obj) {
        let addressobject = JSON.parse(obj);
        

        for (const addresskey of Object.keys(addressobject)) {
            elem += `<div class="col-6 d-flex justify-content-start align-items-center p-1">${getNameForKey(addresskey)}</div>`;
            elem += `<div class="col-6 d-flex justify-content-start align-items-center p-1">${addressobject[addresskey]}</div>`;
            
        }
        
    } else {
        elem += `<h2>No address added yet.</h2>`;
    }
    elem+=`<div class="col d-flex justify-content-end id="edit-button">`
        elem+=`<button type="button"class="btn btn-primary" onclick="populateaddresssection(${addresstype=="shipping"?true: false})" >Edit Address</button>`
         elem+=   `</div>`
    addresscontainer.innerHTML = elem;
}
function getNameForKey(addresskey) {

    let addressField = shippingformfieds.find((shipAddress) => shipAddress.key === addresskey);
    return addressField.name;
}

function populateAddress() {

    
    let shippingAddress = getAddressfromlocalstorage('shipping');
    let billingAddress = getAddressfromlocalstorage('billing');
    getAddresslayout(shippingAddress, 'shipping-table');
    getAddresslayout(billingAddress, 'billing-table');
//     if (billingAddress) {
//    document.getElementById("billing-address-checkbox").setAttribute('checked',true)
//     }
}


// order page
function getOrders() {
    let orders = localStorage.getItem('orders');
    if (orders)
        return JSON.parse(orders);
    return {};
}
function saveordertoLocalstorage(orders){
   localStorage.setItem('orders',JSON.stringify(orders))
}
function fetchOrders() {
    console.log("heyy")
    generateMenus();
    getTotalcartItemNumber();
    const orders = getOrders() ;
    // let cartDetailContainer = document.getElementById("cart-details");
    // let totalAmountContainer = document.getElementById("total-amount");
    // let subTotalAmountContainer = document.getElementById("subtotal-amount");
    console.log(orders.products);
    let ordersContainer = document.getElementById('orders-container');
    let totalAmount = document.getElementById("totalAmount");
    if (orders.products &&orders.products.length > 0) {
        let [total, elem] = renderDesign(0, false, orders.products);
        totalAmount.innerHTML = total;
        ordersContainer.innerHTML = elem;
    }
}