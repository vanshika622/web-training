
const products = [{
    "image": "./assests/imgs/top-1-image.jpg",
    "name": "Canary yellow seahorse blazer",
    "price": "18000",
    "description": "here is the description of thr product"
},
{
    "image": "./assests/imgs/top-2image.jpg",
    "name": "Canary yellow seahorse blazer",
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
    "name": "The quasimodo sleeve bodysuit",

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
        link: './bootstrapito.html'
    },
    {
        menuName: 'About',
        link: './'
    },
    {
        menuName: 'Services',
        link: './'
    },
    {
        menuName: 'Contact',
        link: './'
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
                }
            ]
    }

]
function generatesubmenu(submenuItem) {
    var elem = '';
    for (const submenu of submenuItem) {
       
        elem += `  <li><a class="dropdown-item" href="${submenu.link}">${submenu.menuName}</a></li>`
        
        
        elem += ` </li>`
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
            elem += `  <a class="nav-link dropdown-toggle m-4" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${menu.menuName}`
            elem += ` </a>`
            elem += ` <ul class="dropdown-menu" aria-labelledby="navbarDropdown">`
            elem += generatesubmenu(menu.submenus);
            elem += ` </ul>`
            elem += `</li>`
        }
        else {
            elem += `<li class="nav-item m-4" ${i == 0 ? 'active' : ''}>`
            elem += ` <a class="nav-link active" aria-current="page" href="${menu.link}">${menu.menuName}</a>`
            elem += ` </li>`

        }
        i++;
    }
    menucontainer.innerHTML = elem;
}
const sizeList = ['XS', 'S', 'M', 'L', 'XL'];
let selectedsize = "";
// generate size boxes dynamically into productdetail1.html
function generateSizeListBoxes(sizeName) {
    let sizeboxesContainer = document.getElementById("size-boxes-container");

    let elem = '';
    for (const size of sizeList) {
        elem += `<div class="boxes ${sizeName && sizeName == size ? 'highlight' : ''}" onclick="togglesizeclass(this)">${size}</div>`

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
        if (previouscart.length>0) {
            let productIndex=getproductindexfromcart(previouscart,productname);
            if(productIndex==-1){
           
            cart = [...previouscart, productDetail];
            }else{
                cart=[...previouscart]
            }
        }
        else {
            cart = [productDetail];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location = './cart.html';
    
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
        elem += `<i class="fas fa-heart heartIcon p-3 ${(inWishlist(name) != -1) ? 'like-btn-active' : ''}" onclick="addTowishlist('${name}','${price}','${image}','${description}')" ></i>`
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
function checkwishlist(name){
    
    const { productname, productimage, productprice, productdescription } = getproductdetailsfromsessionstorage();
    let wishlisticon=document.getElementById("icon-container-heart")
    if(inWishlist(name)!=-1){
       
        wishlisticon.innerHTML=` <i class="fas fa-heart fs-5 " style="color: #f00" onclick="addTowishlist('${productname}','${productprice}','${productimage}','${productdescription}')"></i>`
    }else{
        wishlisticon.innerHTML=` <i class="fas fa-heart fs-5 " style="color: #f00" onclick="addTowishlist('${productname}'${productprice}','${productimage}','${productdescription}')"></i>`
      
    }
}
function inWishlist(name){
    let wishlist=getwishlistitems();
    return getproductindexfromwishlist(wishlist,name)
    


}
function addTowishlist(name,price, image, description){
    
    
    let productIndex=inWishlist(name);
    let wishlist=getwishlistitems()
    const productDetail = {
        productname:name,
        productprice:price,
        productimage:image,
        productdescription:description,
      

    };
    if(productIndex==-1){
    wishlist=[...wishlist,productDetail]
    }else{
           wishlist.splice(productIndex,1)
    }
    localStorage.setItem('wishlist',JSON.stringify(wishlist));
    generateProducts();
    
    
    
}
function setwishlisttolocalstorage(wishlist){
    localStorage.setItem('wishlist',JSON.stringify(wishlist));
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
function getTotalcartItemNumber() {
    
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

    let cart = localStorage?.getItem('cart');
    let cartDetailcontainer = document.getElementById("cart-details")
    let totalamountcontainer = document.getElementById("total-amount")
    let subtotalamountcontainer = document.getElementById("subtotal-amount")
    let total = 0;

    let elem = "";
    if (cart) {

        cart = JSON.parse(cart);
        if (cart.length > 0) {
            for (const product of cart) {
                // console.log(product);
                let subtotal = +product.productprice * product.quantity;
                total = total + subtotal;
                elem += `<div class="row pt-1 pb-1">`
                elem += `<div class="col-6">`
                elem += `<div class="row align-items-center">`
                elem += ` <div class="col-1 pt-2" onclick ="deleteitemfromcart('${product.productname}')">X</div>`
                elem += `<div class="col-2"> <img src="${product.productimage}" alt=""width="50%" class="img-responsive">`
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
                elem += `<input type="number" id="${product.productname}"   onkeydown="updatequnatity(event,this,'${product.productname}','${product.quantity}','${product.productprice}')" value="${product.quantity}" class="cart-quantity-box">`
                elem += ` </div>`
                elem += `<div class="col-4">${subtotal}</div>`
                elem += ` </div>`
                elem += ` </div>`

                elem += ` </div>`
                elem += `<hr>`
            }
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
//  DOUBT :NEED OF THIS FUNCTION

function updatequnatity(event,box, productname, quantity, productprice) {
    // console.log(event);
    if(event.keyCode==13){
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
function setcarttolocalstorage(cart){
    localStorage.setItem('cart',JSON.stringify(cart))
}
function deleteitemfromcart(productname){
    
 let cart= getcartitems();
 
  let productIndex=getproductindexfromcart(cart,productname);
  cart.splice(productIndex,1);
  setcarttolocalstorage(cart);
  populatecart();


}


// ERRORS
// CLICKING ON HEART ICON ON PRODUCTDETAIL PAGE THEN SYNTAXERROR IS COMING
// GETTOTALITEMCART FUCTION CALLED IN GENERATEPRODUCT FUNCTION GIVE THE TYPEERROR