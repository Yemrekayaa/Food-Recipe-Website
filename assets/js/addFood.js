document.addEventListener("DOMContentLoaded", function () {
  let foodName = document.getElementById("foodName");
  let foodRecipe = document.getElementById("foodRecipe");
  let foodTitle = document.getElementById("foodTitle");
  let recipeContent = document.getElementById("recipeContent");
  let productList = document.getElementById("productList");
  let searchInput = document.getElementById("search");
  let ingredientList = document.getElementById("ingredientList");
  let btnSave = document.getElementById("btnSave");
  let food = {
    foodName: "",
    foodRecipe: "",
    ingredient: [],
  };

  let ingredient = [];

  let products = JSON.parse(localStorage.getItem("products"));

  if (products == null) {
    products = [];
  }

 


   let foodList = JSON.parse(localStorage.getItem("foodList"));

   if (foodList == null) {
    foodList = [];
  }



  listProduct(products);

  foodName.addEventListener("input", function (e) {
    let name = this.value;

    foodTitle.textContent = name.length ? name : "Food Title";
    food.foodName = foodTitle.textContent;
  });

  foodRecipe.addEventListener("input", function (e) {
    let recipe = this.value;

    recipeContent.textContent = recipe.length ? recipe : "Food Recipe";
    food.foodRecipe = recipeContent.textContent;
  });

  searchInput.addEventListener("input", function () {
    let searchValue = this.value.toLowerCase();

    let filteredProducts = products.filter(function (product, index, array) {
      return product.toLowerCase().includes(searchValue);
    });

    listProduct(filteredProducts);
  });

  productList.addEventListener("click", function (e) {
    let target = e.target;
    let isTargetAddProduct = target.className.includes("add-product");
    if (isTargetAddProduct) {
      let index = target.id;

      let product = {
        id: index,
        name: products[index],
        quantity: "",
      };

      ingredient.push(product);
      listProduct(products);
      listIngredient(ingredient);
    }
  });

  ingredientList.addEventListener("click", function (e) {
    let target = e.target;
    let isTargetDelete = target.className.includes("delete-ingredient");
    if (isTargetDelete) {
      let index = target.id;
      ingredient.splice(index, 1);
      listIngredient(ingredient);
      listProduct(products);
    }
  });

  btnSave.addEventListener("click",function(e){
    console.log(food);
    foodList.push(food);
    localStorage.setItem("foodList", JSON.stringify(foodList));
    location.reload();
  });

  function listProduct(products) {
    productList.innerHTML = "";
    if (Array.isArray(products) && products.length > 0) {
      products.forEach(function (product, index, array) {
        if (!ingredient.map((p) => p.name).includes(product)) {
          let iElement = document.createElement("i");
          iElement.className = "bi bi-plus-lg float-end add-product";
          iElement.id = index;

          let liElement = document.createElement("li");
          liElement.className = "list-group-item";
          liElement.textContent = product;
          liElement.appendChild(iElement);

          let productList = document.getElementById("productList");
          productList.appendChild(liElement);
        }
      });
    } else {
      let liElement = document.createElement("li");
      liElement.className = "list-group-item bg-warning text-white";
      liElement.textContent = "There is no product on the list yet.";

      let productList = document.getElementById("productList");
      productList.appendChild(liElement);
    }
  }

  function listIngredient(ingredient) {
    ingredientList.innerHTML = "";
    if (Array.isArray(ingredient) && ingredient.length > 0) {
      ingredient.forEach(function (ingredient, index, array) {
        let liElement = document.createElement("li");
        liElement.className = "d-flex justify-content-between";

        let spanElement = document.createElement("span");

        let iElement = document.createElement("i");
        iElement.className = "bi bi-trash delete-ingredient";
        iElement.id = index;
        spanElement.appendChild(iElement);

        let labelElement = document.createElement("label");
        labelElement.htmlFor = "quantity-" + ingredient.id;
        labelElement.textContent = ingredient.name;
        labelElement.className = "ms-2";
        spanElement.appendChild(labelElement);

        liElement.appendChild(spanElement);

        let inputElement = document.createElement("input");
        inputElement.placeholder = "Quantity";
        inputElement.type = "text";
        inputElement.name = "quantity";
        inputElement.id = "quantity-" + ingredient.id;
        inputElement.value = ingredient.quantity;
        inputElement.className =
          "float-end border-0 border-bottom border-black";
        liElement.appendChild(inputElement);

        inputElement.addEventListener("input", function(e){
            let quantity = this.value;
            ingredient.quantity = quantity;
            
        });

        let ingredientList = document.getElementById("ingredientList");
        ingredientList.appendChild(liElement);
      });
      food.ingredient = ingredient;

    } else {
      let liElement = document.createElement("li");
      liElement.className = "list-group-item bg-warning text-white";
      liElement.textContent = "There is no product on the list yet.";

      let productList = document.getElementById("ingredientList");
      productList.appendChild(liElement);
    }
  }
});
