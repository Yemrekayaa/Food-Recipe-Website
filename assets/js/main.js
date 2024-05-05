document.addEventListener("DOMContentLoaded", function () {
  let foodList = document.getElementById("foodList");
  let completedList = document.getElementById("completedList");

  let foods = JSON.parse(localStorage.getItem("foodList"));

  if (foods == null) {
    foods = [];
  }

  listFoods(foods);

  function listFoods(foods) {
    foodList.innerHTML = "";
    completedList.innerHTML = "";
    if (Array.isArray(foods) && foods.length > 0) {
      foods.forEach(function (food, index, array) {
        let isCompleted = food.isDone;
        let col = document.createElement("div");
        col.className = "col-md-6";

        let card = document.createElement("div");
        card.className = "card mt-2";
        col.appendChild(card);

        let cardHeader = document.createElement("h5");
        cardHeader.className = "card-header text-center";

        let strongElement = document.createElement("strong");
        strongElement.textContent = food.foodName;
        cardHeader.appendChild(strongElement);

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        let content = document.createElement("div");
        content.className = "content";
        cardBody.appendChild(content);

        let h5Element = document.createElement("h5");
        h5Element.textContent = "Ingredient";

        let ulElement = document.createElement("ul");
        ulElement.className = "ingredient-list";

        food.ingredient.forEach(function(product){
            let liElement = document.createElement("li");
            liElement.className = "d-flex justify-content-between";
            liElement.textContent = product.name;
            let spanElement = document.createElement("span");
            spanElement.textContent = product.quantity;
            liElement.appendChild(spanElement);

            ulElement.appendChild(liElement);
        });
        content.appendChild(h5Element);
        content.appendChild(ulElement);

        let recipe = document.createElement("div");
        recipe.className = "recipe";
        cardBody.appendChild(recipe);
        let h6Element = document.createElement("h6");
        h6Element.textContent = "Recipe:";
        let pElement = document.createElement("p");
        pElement.textContent = food.foodRecipe;
        recipe.appendChild(h6Element);
        recipe.appendChild(pElement);

        let cardFooter = document.createElement("div");
        cardFooter.className = "card-footer d-flex justify-content-between";
        let deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger col me-5";
        deleteButton.textContent = "Delete";
        cardFooter.appendChild(deleteButton);
        let doneButton = document.createElement("button");
        doneButton.className = "btn btn-success col";
        doneButton.textContent = "Done";
        cardFooter.appendChild(doneButton);
        deleteButton.addEventListener("click", function(){deleteFood(index)});
        doneButton.addEventListener("click", function(){toggleFood(index)});
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        if(isCompleted){
            completedList.appendChild(col);

            cardFooter.removeChild(deleteButton);
            doneButton.className = "btn btn-outline-info col";
            doneButton.textContent = "Undo";



        }else{
            foodList.appendChild(col);
        }
        

        // test area
        
      });
    }
  }

  function deleteFood(index){
    foods.splice(index,1);
    listFoods(foods);
    localStorage.setItem("foodList", JSON.stringify(foods));
  }

  function toggleFood(index){
    foods[index].isDone = !foods[index].isDone;
    listFoods(foods);
    localStorage.setItem("foodList", JSON.stringify(foods));
  }

});
