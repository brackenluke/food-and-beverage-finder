// Global const from html
const SearchMealBTN = document.querySelector("#submit-meals");
const ingreientInputE1 = document.querySelector("#search-bar");
const mealInfoSec = document.querySelector("#result");
const noMealInfo = document.querySelector("#no-meals");
const RecipieDetailSection = document.querySelector("#recipies-information");

// Creates the actual div card to be placed onto the html
const creatMealInfoDiv = (meal, mealInput) => {
    const thumbnail = meal.strMealThumb;
    const mealName = meal.strMeal;
    const mealInfo = `
        <a href="#meal-details-section" style="text-decoration: none; color: black;">
            <div onclick="getMealDetails(${meal.idMeal})" class="card border-0 shadow cursor" style="width: 18rem; border-radius: 10px">
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
    const mealInput = ingreientInputE1.value.trim()
    console.log(mealInput);
    if(mealInput) {
        // clears past items
        noMealInfo.innerText = ``;
        mealInfoSec.innerText = ``;
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
        <div id="recipie-details" class="card px-0 pb-1 border-0 shadow col-xm-12 col-sm-12 col-md-6" style="border-radius: 10px;">
            <img src="${mealPhoto}" class="card-img-top" style="border-radius: 10px 10px 0 0;" alt=" ...">
            <div class="card-body">
                <h2 class="card-title text-center my-3">${mealName}</h2>
                <hr>
                <h5 class="card-title mt-4">Meal Ingredients</h5>
                <div id="recipie-ingredients"></div>
                <p>${instructions}
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
//event listeners
SearchMealBTN.addEventListener("click", SearchMeal);