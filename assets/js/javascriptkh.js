console.log("JavaScript loaded");

// everything the zip code functionality is doing should go here
// Setup onClick function for that button
// Pull the zipcode value from there and do something
$(document).ready(function () {

    $("#stay").on("click", function () {
        //API information for recipes should go here or Calvin's javascript file

    });

    $("#go").on("click", function () {
        //API information for going should go here or Achille's javascript file
    });

    $("#random").on("click", function () {
        //source for random number: https://medium.com/@josephcardillo/using-math-random-in-javascript-c49eff920b11
        let choice = Math.round(Math.random() * 1);
        console.log(choice);
        if (choice === 1) {
            //put in function for staying in
        } else if (choice === 0) {
            //put in function for going out
        };
    });

    $("#button").on("click", function () {
        let zipCode = $("#inputZip").val();
        console.log(zipCode);
    });

});