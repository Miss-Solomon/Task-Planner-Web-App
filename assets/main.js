//variables
let submitButton = document.querySelector("#submitButton");
let taskCardsSection = document.querySelector('#taskCardsSection');

//temporary variable to add to task card section
let newTaskCard = document.createElement('h1');

//submit button listening function to activate on click
let submitButtonClick = (event) => {
    //temporary placeholder
    newTaskCard.innerHTML = "Test Card";
    taskCardsSection.appendChild(newTaskCard);

}

//submit button listening event on click
submitButton.addEventListener("click", submitButtonClick);