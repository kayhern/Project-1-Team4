var button = document.createElement("stay");
button.innerHTML = "stay";

var body = document.getElementsByTagName("stay")[0];
body.appendChild(button);

button.addEventListener ("click", function() {
  alert("stay");
});

