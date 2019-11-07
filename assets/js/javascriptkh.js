
let x =0;

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
        $("#stay").attr();
    });

    $("#go").on("click", function () {
        //API information for going should go here or Achille's javascript file
        decision = "go";
        console.log(decision)
        $("#go").html();
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

// $("#button").on("click", function () {
//     let zipcode = $("#inputZip");
//     console.log('zip code:', zipcode)
// });

    $("#button").on("click", function () {
        event.preventDefault();
        let zipCode = $("#inputZip").val();
        console.log(zipCode);
        wheelSubmitted();
        // console.log("console log in button click" + foodnum);
    
    });
});
