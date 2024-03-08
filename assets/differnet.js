const ingredientInputE1 = document.querySelector(".input");
const searchBTN = document.querySelector(".search-btn");

const createRecipieCard = (RecipieInfo) => {
    return `<div class="container">
                <div class="img"></div>
                 <div class="content-container">
                 <h1 class="title">Food Name</h1>
                <p class="info">
                    ${RecipieInfo.meals[0].strInstructions}
        </p>`;
}
const showMealDetailsDiv = data => {
    const meal = data.meals[0];
    const mealIMG = meal.strMealThumb;
    const MealName = meal.strMeal;
    console.log(MealName);
}

const GetRecipie = () => {
    const UserIngredient = ingredientInputE1.value.trim();
    if(!UserIngredient) return;
    
    console.log(UserIngredient); // test to see that user input is used as the value

    // Url to for the api using user input
    const MealAPI = `https://www.themealdb.com/api/json/v1/1/search.php?s=${UserIngredient}`;

    fetch(MealAPI).then(res => res.json()).then(data => {
        console.log(data);
        const uniqueRecipieInfo = [];
        const RecipieInfo = data.list(meals => { // Want this to add the recipieinfo
            const recipieIngredient = new value(meals.strIngredient1).getValue();
            if(!uniqueRecipieInfo.includes(recipieIngredient)) {
                return uniqueRecipieInfo.push(recipieIngredient);
            }
        });
        console.log(RecipieInfo);
    })
}

searchBTN.addEventListener("click", GetRecipie);
