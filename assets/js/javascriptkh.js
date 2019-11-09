
// define an empty array to which to append foods
var foodList = [];

// Setup onClick function for that button
// Pull the zipcode value from there and do something
$(document).ready(function () {



    let decision = "";



    $("#stay").on("click", function () {
        //if the user clicks on this one it stays on this box
        //if the user clicks on this one the other two disappear
        decision = "stay";
        console.log(decision)
        $("div").remove("#go");
        $("div").remove("#random")
    });

    $("#go").on("click", function () {
        //API information for going should go here or Achille's javascript file
        decision = "go";
        console.log(decision)
        $("div").remove("#stay");
        $("div").remove("#random")
    });

    $("#random").on("click", function () {
        //source for random number: https://medium.com/@josephcardillo/using-math-random-in-javascript-c49eff920b11
        let choice = Math.round(Math.random() * 1);
        console.log(choice);
        if (choice === 1) {
            decision = "stay";
        } else if (choice === 0) {
            decision = "go";
        };
        console.log(decision)
        $("div").remove("#stay");
        $("div").remove("#go");
    });

    // define an empty array to which to append foods
    // let foodList = []
    // add event listener for clicks on checkboxes 
    $(".form-check-input").on("click", function () {
        // evaluate the "cheked" attribute of the box clicked
        // if the box is checked and the value of the box is not contained in the food array 
        // append the value of the box tot he food awway 
        if (this.checked && !foodList.includes($(this).val())) {
            // obtained the value of the box clicked AKA: the food type
            let newFood = $(this).val();
            // push food into the array 
            foodList.push(newFood)
            // console log the array
            console.log(foodList)
            // check if the the box is unchecked
        } else if (!this.checked) {
            // loop over the array until the value of the 
            // unchecked box if found
            for (var i = 0; i < foodList.length; i++) {
                if (foodList[i] === $(this).val()) {
                    // remove this food from the array 
                    foodList.splice(i, 1);
                }
            }
            // console log the new array 
            console.log(foodList)
        }
    });

    //needed for restaurant option
    $("#button").on("click", function () {
        event.preventDefault();
        let zipCode = $("#inputZip").val();
        console.log(zipCode);
        wheelSubmitted();
        // console.log("console log in button click" + foodnum);

    });
    // get a result from the wheel
    let food = 'wings'

    $("#button2").on("click", function () {
        if (decision === "stay") {
            // define variables for information you want to extract from the API
            let label = ''
            let ingredients = ''
            let recipe_url = ''
            let portions = 0
            // place API request with parameter passed from the wheel
            let queryURL = "https://api.edamam.com/search?q=" + food + "&app_id=e3e6dc48&app_key=f6d299f05c0df33f37fb61c4ecf135ed&from=0&to=5"
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                // console log query link
                console.log('queryURL: ' + queryURL)
                // store response in a variable
                let result = response.hits
                // verify number of responses
                console.log('number of results: ' + result.length)
                // extract information from each recipe in the response:
                for (let i = 0; i < result.length; i++) {
                    // console log response
                    // console.log(result)
                    // obtain the recipe label
                    label = response.hits[i].recipe.label
                    console.log('Label: ' + label)
                    // obtain recipe yield (Number of servings)
                    portions = response.hits[i].recipe.yield
                    console.log('Portions: ' + portions)
                    // obtain ingredients 
                    ingredients = response.hits[i].recipe.ingredientLines
                    console.log(ingredients)
                    // obtain recipe url 
                    recipe_url = response.hits[i].recipe.url
                    console.log('url: ' + recipe_url)
                }
            });

        } else if (decision === "go") {
            console.log("I went out")
        }
    });





});