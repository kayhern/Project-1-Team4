let theWheel;
let submittedWheel;
let indicatedSegment;
let food;


$(document).ready(function () {



    // Create new wheel object specifying the parameters at creation time.
    theWheel = new Winwheel({
        'numSegments': 9, // Specify number of segments.
        'outerRadius': 212, // Set outer radius so wheel fits inside the background.
        'textFontSize': 28, // Set font size as desired.
        'segments': // Define segments including colour and text.
            [{
                'fillStyle': '#7de6ef',
                'text': 'Italian'
            },
            {

                'fillStyle': '#89f26e',
                'text': 'Mexican'
            },
            {
                'fillStyle': '#7de6ef',
                'text': 'Burgers'
            },
            {
                'fillStyle': '#e7706f',
                'text': 'Pizza'
            },
            {
                'fillStyle': '#eae56f',
                'text': 'Thai'
            },
            {
                'fillStyle': '#89f26e',
                'text': 'Vietnamese'
            },
            {
                'fillStyle': '#7de6ef',
                'text': 'Seafood'
            },
            {
                'fillStyle': '#e7706f',
                'text': 'Wings'
            },
            {
                'fillStyle': '#eae56f',
                'text': 'French'
            }
            ],
        'pins': true,
        'animation': // Specify the animation to use.
        {
            'type': 'spinToStop',
            'duration': 5, // Duration in seconds.
            'spins': 8, // Number of complete spins.
            // 'callbackFinished': alertPrize
            // To do something after the animation has finished specify callback function.
            'callbackFinished': 'winAnimation()',

            // During the animation need to call function to re-draw triangle.
            'callbackAfter': 'drawColourTriangle()'
        }
    });

    console.log(foodList);


}); // end of document.on(ready)



// Vars used by the code in this page to do power controls.
let wheelPower = 0;
let wheelSpinning = false;

// alert(wheelSpinning);
// -------------------------------------------------------
// Function to handle the onClick on the power buttons.
// -------------------------------------------------------
function powerSelected(powerLevel) {
    // Ensure that power can't be changed while wheel is spinning.
    if (wheelSpinning == false) {
        // Reset all to grey incase this is not the first time the user has selected the power.
        document.getElementById('pw1').className = "";
        document.getElementById('pw2').className = "";
        document.getElementById('pw3').className = "";

        // Now light up all cells below-and-including the one selected by changing the class.
        if (powerLevel >= 1) {
            document.getElementById('pw1').className = "pw1";
        }

        if (powerLevel >= 2) {
            document.getElementById('pw2').className = "pw2";
        }

        if (powerLevel >= 3) {
            document.getElementById('pw3').className = "pw3";
        }

        // Set wheelPower var used when spin button is clicked.
        wheelPower = powerLevel;

        // Light up the spin button by changing it's source image and adding a clickable class to it.
        document.getElementById('spin_button').src = "spin_on.png";
        document.getElementById('spin_button').className = "clickable";
    }
}

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin() {
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false) {
        // Based on the power level selected adjust the number of spins for the wheel, the more times is has
        // to rotate with the duration of the animation the quicker the wheel spins.
        if (wheelPower == 1) {
            // theWheel.animation.spins = 3;
            submittedWheel.animation.spins = 3;
        } else if (wheelPower == 2) {
            // theWheel.animation.spins = 8;
            submittedWheel.animation.spins = 8;
        } else if (wheelPower == 3) {
            // theWheel.animation.spins = 15;
            submittedWheel.animation.spins = 15;
        }

        // Disable the spin button so can't click again while wheel is spinning.
        document.getElementById('spin_button').src = "spin_off.png";
        document.getElementById('spin_button').className = "";

        // Begin the spin animation by calling startAnimation on the wheel object.
        // theWheel.startAnimation();
        submittedWheel.startAnimation();

        // Set to true so that power can't be changed and spin button re-enabled during
        // the current animation. The user will have to reset before spinning again.
        wheelSpinning = true;
    }
}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel() {
    theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
    theWheel.draw(); // Call draw to render changes to the wheel.

    // submittedWheel = theWheel;

    // submittedWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
    // submittedWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
    // submittedWheel.draw(); // Call draw to render changes to the wheel.


    document.getElementById('pw1').className = ""; // Remove all colours from the power level indicators.
    document.getElementById('pw2').className = "";
    document.getElementById('pw3').className = "";



    wheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
}

// This function called after the spin animation has stopped.
function winAnimation() {


    // Get the number of the winning segment.
    let winningSegmentNumber = submittedWheel.getIndicatedSegmentNumber();

    // Loop and set fillStyle of all segments to gray.
    for (let x = 1; x < submittedWheel.segments.length; x++) {
        submittedWheel.segments[x].fillStyle = 'gray';
    }

    // Make the winning one yellow.
    submittedWheel.segments[winningSegmentNumber].fillStyle = 'yellow';

    // Call draw function to render changes.
    submittedWheel.draw();

}



// Draw pointer on canvas, this time on the right.
function drawColourTriangle() {
    // Get context used by the wheel.
    let ctx = submittedWheel.ctx;

    ctx.strokeStyle = 'navy';  // Set line colour.
    ctx.fillStyle = 'aqua';  // Set fill colour.
    ctx.lineWidth = 2;
    ctx.beginPath();           // Begin path.

    ctx.moveTo(390, 174);      // Move to initial position.
    ctx.lineTo(390, 226);      // Draw lines to make the shape.
    ctx.lineTo(360, 200);
    ctx.lineTo(390, 175);
    ctx.stroke();              // Complete the path by stroking (draw lines).
    ctx.fill();
}



function search_api(search_term) {
    // THe search term argument gets passed to the API
}




// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters
// note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
// -------------------------------------------------------

function alertPrize(indicatedSegment) {
    // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
    alert("You have won " + indicatedSegment.text);
    search_api(indicatedSegment.text)

}

// created new function which is implemented when we click the submit button 
// alert("You have won " + indicatedSegment.text);

// console log food chosen by the wheel
food = indicatedSegment.text
console.log(food);



// created new function which is implemented when we click the submit button 

function wheelSubmitted() {

    submittedWheel = new Winwheel({
        'numSegments': foodList.length, // Specify number of segments.
        'outerRadius': 212, // Set outer radius so wheel fits inside the background.
        'textFontSize': 28, // Set font size as desired.
        'segments': // Define segments including colour and text.
            [{
                'fillStyle': '#7de6ef',
                'text': foodList[0]
            },
            {
                'fillStyle': '#89f26e',
                'text': foodList[1]
            },
            {
                'fillStyle': '#e7706f',
                'text': foodList[2]
            },
            {
                'fillStyle': '#89f26e',
                'text': foodList[3]
            },
            {
                'fillStyle': '#eae56f',
                'text': foodList[4]
            },
            {
                'fillStyle': '#89f26e',
                'text': foodList[5]
            },
            {
                'fillStyle': '#7de6ef',
                'text': foodList[6]
            },
            {
                'fillStyle': '#e7706f',
                'text': foodList[7]
            },
            {
                'fillStyle': '#eae56f',
                'text': foodList[8]
            }
            ],
        'pins': true,
        'pointerGuide':        // Turn pointer guide on.
        {
            'display': true,
            'strokeStyle': 'red',
            'lineWidth': 3
        },

        'animation': // Specify the animation to use.
        {
            'type': 'spinToStop',
            'duration': 5, // Duration in seconds.
            'spins': 8, // Number of complete spins.
            // To do something after the animation has finished specify callback function.
            'callbackFinished': 'winAnimation()',

            // During the animation need to call function to re-draw triangle.
            // 'callbackAfter': 'drawColourTriangle()'
        }
    });
    // drawColourTriangle();

}