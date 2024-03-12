// Global const from html
const SearchDrinkBTN = document.querySelector("#submit-drinks");
const ingreientInputE2 = document.querySelector("#search-bar");
const drinkInfoSec = document.querySelector("#drink-result");
const nodrinkInfo = document.querySelector("#no-meals");

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
const SearchDrink = () => {
    const drinkInput = ingreientInputE1.value.trim()
    console.log(drinkInput);
    if(drinkInput) {
        // clears past items
        noMealInfo.innerText = ``;
        mealInfoSec.innerText = ``;
        // fetch the url for data
        const urlAPI = `www.thecocktaildb.com/api/json/v1/1/search.php?i=${mealInput}`;
        fetch(urlAPI).then(res => res.json()).then(data => {
            showMealInfo(data);
            console.log(data); // see what info is being pulled in console
        }) 
    } else {
        noMealInfo.innerText = `You haven't entered a valid item`;
    }
}
//event listeners
SearchDrinkBTN.addEventListener("click", SearchDrink);