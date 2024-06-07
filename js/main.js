// Importing fetchAPIData function from fetchData.js
import { fetchAPIData} from "./productAPI.js";

// HTML loader spinner
let loader = `<div class="loader"></div>`;

// DOM elements
const productSection = document.querySelector(".productsSection");
const countResult = document.querySelector(".results-text");
const productOnDemand = document.getElementById("load-more");
const sortByPrice = document.querySelector("#sort-by-price");
const producSearch = document.querySelector("#search-products");
const chkcCategory = document.querySelectorAll(".category");
// Product data variables
let products = []; // Fetched products from API
let filteredProducts = [];
let displayedProducts = 0; // Number of products displayed initially
const productsPerPage = 10; // Number of products to load per click

/**
 * Function to process API data: Fetches data from API, updates product data, and displays products.
 */
async function processAPIData() {
  try {
    productSection.innerHTML = loader;
    const data = await fetchAPIData();
    products = [...data];
    filteredProducts = [...data];
    productSection.innerHTML = "";
    displayProductsToWeb(filteredProducts);   
     localStorage.setItem("productData",JSON.stringify(data))
     
  } catch (error) {
    productSection.innerHTML = "<h2>Oops! Something went wrong</h2>";
    console.error("Error processing data:", error);
  }
}

processAPIData();
/**
 *  Sort the products by price.
 */
sortByPrice.addEventListener("change", (e) => {
  if (filteredProducts.length > 0) {
    const val = sortByPrice.options[sortByPrice.selectedIndex].value;
    productSection.innerHTML = "";
    const sortedProducts = filteredProducts.sort((a, b) =>
      val === "l2h" ? a.price - b.price : b.price - a.price
    );
    displayedProducts = 0;
    productSection.innerHTML = "";
    displayProductsToWeb(sortedProducts);
  }
});

/**
 * Search products by name and description.
 */
producSearch.addEventListener("change", () => {
  if (navigator.onLine && filteredProducts.length > 0) {
    let searchValue = producSearch.value;
    if (searchValue) {
      const searchedItems = filteredProducts.filter((product) => {
        if (
          product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          product.description.toLowerCase().includes(searchValue.toLowerCase())
        ) {
          return product;
        }
      });
      displayedProducts = 0;
      productSection.innerHTML = "";
      displayProductsToWeb(searchedItems);
    } else {
      displayedProducts = 0;
      productSection.innerHTML = "";
      filteredProducts = [...products];
      filterByCategory(products);
      displayProductsToWeb(filteredProducts);
    }
  } else {
    productSection.innerHTML =
      "<h2>No Internet, Please check the internet and try again</h2>";
  }
});

/**
 * Filter products by category.
 */
function filterByCategory() {
  if (navigator.onLine) {
    const checkedCategories = [];
    for (let i = 0; i < chkcCategory.length; i++) {
      if (chkcCategory[i].checked) {
        checkedCategories.push(chkcCategory[i].value);
      }
    }
    console.log("checkedCategories", checkedCategories);
    const filteredProds = products.filter((product) => {
      if (checkedCategories.includes(product.category.toLowerCase())) {
        return product;
      }
    });
    const filteredItems = filteredProds.length > 0 ? filteredProds : products;
    filteredProducts = [...filteredItems];

    displayedProducts = 0;
    productSection.innerHTML = "";
    displayProductsToWeb(filteredProducts);
  } else {
    productSection.innerHTML =
      "<h2>No Internet, Please check the internet and try again</h2>";
  }
}

/**
 * Display products on the web page.
 * @param {Array} items - Array of products to display.
 */
function displayProductsToWeb(items) {
   
  if (items.length > 0) {
   
    countResult.innerHTML = `<span>'&nbsp;' ${items.length } Results</span>`;

    for (
      let i = displayedProducts;
      i < Math.min(displayedProducts + productsPerPage, items.length);
      i++
    ) {
      productSection.insertAdjacentHTML(
        "beforeend",
        `        
            <div class="product" >
                <div class="product-img">
                    <img  src=${items[i].image} alt="Product 1" id="${items[i].id}">
                </div>
                <div class="product-info">
                    <h3>${items[i].title}</h3>
                    <p>$${items[i].price}</p>
                    <i class="far fa-heart" aria-hidden></i>                    
                </div>
            </div>
        `
      );
    }

    displayedProducts += productsPerPage;

    // product lazy loading pagination
    if (displayedProducts >= items.length) {
      productOnDemand.style.display = "none";
    } else {
      productOnDemand.style.display = "block";
    }
  } else {
    countResult.innerHTML = "";
    productSection.innerHTML = "<h2>No results found</h2>";
  }
   var productLength=document.querySelectorAll(".product-img").length
  document.querySelectorAll(".results-text span")[0].innerText=productLength + " Results"
}


productOnDemand.addEventListener("click", function () {  
  productSection.innerHTML = loader;
  setTimeout(()=>{
    productSection.innerHTML = "";    
    displayProductsToWeb(filteredProducts);
    window.scrollTo({ left: 0, top:700,  behavior: "smooth" });
    
  },600)  
});

// filter
for (let i = 0; i < chkcCategory.length; i++) {
  chkcCategory[i].addEventListener("click", filterByCategory);
}

document.querySelector('body').addEventListener('click', function(event) {
  var productLength=document.querySelectorAll(".product-img").length
  document.querySelectorAll(".results-text span")[0].innerText=productLength+ "Results"
  
  if (event.target.tagName.toLowerCase() === 'img') {   
    let id =event.target.attributes.id.value   
    window.localStorage.setItem("id",id)
    window.location.href = "Product_details.html"  
  }
});