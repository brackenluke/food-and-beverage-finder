// Global const from html
const SearchMealBTN = document.querySelector("#submit-meals");
const SearchDrinkBTN = document.querySelector("#submit-drinks");
const ingredientInputE1 = document.querySelector("#search-bar");
const mealInfoSec = document.querySelector("#result");
const noMealInfo = document.querySelector("#no-meals");
const RecipieDetailSection = document.querySelector("#recipies-information");

// Creates the actual div card to be placed onto the html
const creatMealInfoDiv = (meal) => {
    const thumbnail = meal.strMealThumb;
    const mealName = meal.strMeal;
    const mealInfo = `
        <a href="#meal-details-section" style="text-decoration: none; color: black;">
            <div onclick="getMealDetails(${meal.idMeal})" class="card border-0 shadow-lg cursor bg-green-500 hover:bg-blue-700 font-bold" style="width: 18rem; border-radius: 10px">
                <img src="${thumbnail}" class="card-img-top" style="width: 18rem; border-radius: 10px 10px 0 0" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-center">${mealName}</h5>
                </div>
            </div>
        </a>
    `;

    const mealInfoDiv = document.createElement('div');
    // Add style to the div card here -> 
    mealInfoDiv.className = '';
    // Dictates what is going onto the html
    mealInfoDiv.innerHTML = mealInfo;
    // Places the info onto the html
    mealInfoSec.appendChild(mealInfoDiv);
}

const showMealInfo = (data, mealInput) => {
    const meal = data.meals;

    if (meal) {
        meal.forEach(element => {
            creatMealInfoDiv(element, mealInput);
        });
    }else{
        noMealInfo.innerText = `No Meal info for ${mealInput} please serach again.`;
    }
}

// Fetches the api for the info
const SearchMeal = () => {
    const mealInput = ingredientInputE1.value.trim()
    console.log(mealInput);
    if(mealInput) {
        // clears past items
        noMealInfo.innerText = ``;
        mealInfoSec.innerHTML = ``;
        RecipieDetailSection.innerHTML =``;
        // fetch the url for data
        const urlAPI = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${mealInput}`;
        fetch(urlAPI).then(res => res.json()).then(data => {
            showMealInfo(data);
            console.log(data); // see what info is being pulled in console
        }) 
    } else {
        noMealInfo.innerText = `You haven't entered a valid item`;
    }
}

// Create div for actual recipie info
const showMealDetailsDiv = data => {
    const meal = data.meals[0];
    const mealPhoto = meal.strMealThumb;
    const mealName = meal.strMeal;
    const instructions = meal.strInstructions;

    // Set Meal Details Div Structure
    RecipieDetailSection.innerHTML = `
        <div id="recipie-details" class="card p-4 border-0 shadow col-xm-12 col-sm-12 col-md-6 bg-green-500 font-bold" style="border-radius: 10px;">
            <img src="${mealPhoto}" class="card-img-top" style="border-radius: 10px 10px 0 0;" alt=" ...">
            <div class="card-body">
                <h2 class="card-title text-center my-3 p-2">${mealName}</h2>
                <hr>
                <h5 class="card-title text-center mt-4 p-2">Meal Ingredients</h5>
                <div id="recipie-ingredients"></div>
                <p>Instructions: ${instructions}
                <div> 
            </div>
        </div>
    `
    // this element is created in the created div structure
    const recipieIngredients = document.getElementById('recipie-ingredients');

    // Set Contents of Each Paragraph Inside Meal Details Div Structure
    for(let i = 1; meal[`strIngredient${i}`]; i++){
        const ingredients = `
        ✔ ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
        `
        const recipieDetailsP = document.createElement('p');
        recipieDetailsP.className = 'card-text';
        recipieDetailsP.innerText = ingredients;
        recipieIngredients.appendChild(recipieDetailsP);
    }
}

// calls api to get info for the actual recipie details
const getMealDetails = mealID => {
    // Clear the Meal Details Section For Every Single New Search
    RecipieDetailSection.innerHTML = ``;

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    fetch(url).then(res => res.json()).then(data => 
        showMealDetailsDiv(data));
}
///-------------------------- Section for Drinks -------------------------------////
const createDrinkInfoDiv = (drink) => {
    const DrinkThumbnail = drink.strDrinkThumb;
    const DrinkName = drink.strDrink;
    const drinkInfo = `
    <a href="#meal-details-section" style="text-decoration: none; color: black;">
        <div onclick="getDrinkDetails(${drink.idDrink})" class="card border-0 shadow-lg cursor bg-green-500 hover:bg-blue-700 font-bold" style="width: 18rem; border-radius: 10px">
            <img src="${DrinkThumbnail}" class="card-img-top" style="width: 18rem; border-radius: 10px 10px 0 0" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${DrinkName}</h5>
            </div>
        </div>
    </a>
`;
    console.log(DrinkName);

    const drinkInfoDiv = document.createElement('div');
    // Add style to the div card here -> 
    drinkInfoDiv.className = '';
    // Dictates what is going onto the html
    drinkInfoDiv.innerHTML = drinkInfo;
    // Places the info onto the html
    mealInfoSec.appendChild(drinkInfoDiv);
}


const showDrinkInfo = (data, DrinkInput) => {
    const drink = data.drinks;

    if (drink) {
        drink.forEach(element => {
            createDrinkInfoDiv(element, DrinkInput);
            console.log(element);
        });
    }else{
        noMealInfo.innerText =`No Info for ${DrinkInput} please search again`;
    }
}

// Fetches the api for the info
const SearchDrink = () => {
    const DrinkInput = ingredientInputE1.value.trim()
    console.log(DrinkInput); // Checks if user input is being used
    if(DrinkInput) {
        // clears past items
        noMealInfo.innerText = ``;
        mealInfoSec.innerHTML = ``;
        RecipieDetailSection.innerHTML =``;
        // fetch the url for data
        const urlDrinkAPI = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${DrinkInput}`;
        fetch(urlDrinkAPI).then(res => res.json()).then(data => {
            showDrinkInfo(data);
            console.log(data); // see what info is being pulled in console
        }) 
    } else {
        noMealInfo.innerText = `You haven't entered a valid item`;
    }
}

// Creates the div for the Drink info
const ShowDrinkRecipieDiv = data => {
   const drink = data.drinks[0];
   const drinkPhoto = drink.strDrinkThumb;
   const drinkName = drink.strDrink;
   const drinkInstructions = drink.strInstructions;
   const glass = drink.strGlass;

   RecipieDetailSection.innerHTML = `
   <div id="recipie-details" class="card p-4 border-0 shadow col-xm-12 col-sm-12 col-md-6 bg-green-500 font-bold" style="border-radius: 10px;">
       <img src="${drinkPhoto}" class="card-img-top" style="border-radius: 10px 10px 0 0;" alt=" ...">
       <div class="card-body">
           <h2 class="card-title text-center my-3 p-2">${drinkName}</h2>
           <hr>
           <h5 class="card-title text-center mt-4 p-2">Meal Ingredients</h5>
           <div id="recipie-ingredients"></div>
           <p>Instructions: ${drinkInstructions}
           <p>Glass: ${glass}
           <div> 
       </div>
   </div>
`

const recipieIngredients = document.getElementById('recipie-ingredients');

// Set Contents of Each Paragraph Inside Meal Details Div Structure
    for(let i = 1; drink[`strIngredient${i}`]; i++){
        const ingredients = `
        ✔ ${drink[`strMeasure${i}`]} ${drink[`strIngredient${i}`]}
    `
        const recipieDetailsP = document.createElement('p');
        recipieDetailsP.className = 'card-text';
        recipieDetailsP.innerText = ingredients;
        recipieIngredients.appendChild(recipieDetailsP);
    }
}

const getDrinkDetails = idDrink => {
    RecipieDetailSection.innerHTML = ``;

    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
    fetch(apiUrl).then(res => res.json()).then(data =>
        ShowDrinkRecipieDiv(data));
        console.log(data);
}

//event listeners
SearchMealBTN.addEventListener("click", SearchMeal);
SearchDrinkBTN.addEventListener("click", SearchDrink);