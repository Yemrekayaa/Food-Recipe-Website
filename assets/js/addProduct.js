document.addEventListener("DOMContentLoaded", function () {
  console.log("Sayfa Yüklendi");

  let btnAddProduct = document.getElementById("btnAddProduct");

  let products = JSON.parse(localStorage.getItem("products"));


  if (products == null) {
    products = [];
  }

  listProduct(products);

  btnAddProduct.addEventListener("click", function () {
    let inputProductName = document.getElementById("productName");
    let productName = inputProductName.value;
    productName = productName.trim();
    let isAdded = products.includes(productName);

    if (isAdded) {
      alert("This product has been added before!");
    } else {
      products.unshift(productName);
      localStorage.setItem("products", JSON.stringify(products));
      inputProductName.value = "";
    }

    listProduct(products);
  });

  function listProduct(products) {
    productList.innerHTML = "";
    if (Array.isArray(products) && products.length > 0) {
      products.forEach(function (product, index, array) {
        let iElement = document.createElement("i");
        iElement.className = "bi bi-trash float-end delete-product";
        iElement.id = index;

        let liElement = document.createElement("li");
        liElement.className = "list-group-item";
        liElement.textContent = product;
        liElement.appendChild(iElement);

        let productList = document.getElementById("productList");
        productList.appendChild(liElement);
      });
    } else {
      let liElement = document.createElement("li");
      liElement.className = "list-group-item bg-warning text-white";
      liElement.textContent = "There is no product on the list yet.";

      let productList = document.getElementById("productList");
      productList.appendChild(liElement);
    }
  }

  let searchInput = document.getElementById("search");
  searchInput.addEventListener("input", function() {
    let searchValue = this.value.toLowerCase();

    let filteredProducts = products.filter(function(product, index, array){
        return product.toLowerCase().includes(searchValue);
    });

    listProduct(filteredProducts);
  });

  document.getElementById("productList").addEventListener("click", function(e){
    let element = e.target;
    let elementIsDeleteIcon = element.className.includes('delete-product');
    if(elementIsDeleteIcon){
        let index = element.id;
        products.splice(index,1);
        localStorage.setItem("products", JSON.stringify(products))
        listProduct(products);
    }
  });

});
