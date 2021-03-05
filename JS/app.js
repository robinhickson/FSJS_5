/* Treehouse FSJS Techdegree
 * Project 5 - Public API Requests
 * app.js */

 /*jshint esversion: 8*/


// Global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=us,gb,ie`
const body = document.querySelector("body");
const header = document.querySelector("header");

const employeesNames = [];
let index;

//Create HTML elements
const search = document.createElement("input");
search.setAttribute("class", "searchBox");
search.setAttribute("type", "text");
search.setAttribute("id", "search");
search.setAttribute("placeholder", "Search for employees");

header.insertAdjacentElement('beforeend', search);

const gridContainer = document.createElement("main");
gridContainer.setAttribute("class", "grid-container");
body.insertAdjacentElement(`beforeend`, gridContainer);

const overlay = document.createElement("div");
overlay.setAttribute("class", "overlay hidden");
body.insertAdjacentElement(`beforeend`, overlay);

const modal = document.createElement("div");
modal.setAttribute("class", "modal");
overlay.insertAdjacentElement('beforeend', modal);

const modalClose = document.createElement("button");
modalClose.setAttribute("class", "modal-close");
modalClose.textContent = "X";

const modalPrevious = document.createElement("button");
modalPrevious.setAttribute("class", "modal-previous");
modalPrevious.textContent = "<";

const modalNext = document.createElement("button");
modalNext.setAttribute("class", "modal-next");
modalNext.textContent = ">";

const modalContent = document.createElement("div");
modalContent.setAttribute("class", "modal-content");

modal.appendChild(modalClose);
modal.appendChild(modalPrevious);
modal.appendChild(modalContent);
modal.appendChild(modalNext);


//Fetch data from randomuser.me and parse results into function to create employee card
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));


function displayEmployees(employeeData) {

    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        employeesNames.push(name.first + ' ' + name.last); //Create a new array to track names only for search function       
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        employeeHTML += `
            <div class="card" id="${index}" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            </div>
            </div>
            `
    });
    gridContainer.insertAdjacentHTML('beforeend', employeeHTML);

}

//create the modal view (same logic)
function displayModal(index) {
    let {
        name,
        dob,
        phone,
        email,
        location,
        picture
    } = employees[index];

    let date = new Date(dob.date);
    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name-modal">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${location.city}</p>
            <p class="address">${location.country}</p>
            <br/><hr/>
            <p class="address">${phone}</p>
            <p class="address">${location.street.number} ${location.street.name} ${location.city} ${location.postcode}</p>

            <p>Birthday:
            ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</p>
        </div>
        `;
    overlay.classList.remove("hidden");
    overlay.classList.add("show");
    modalContent.innerHTML = modalHTML;

}

//  get selections for search or modal
body.addEventListener('click', e => {
    const card = e.target.closest(".card");
    if (e.target === search) {
        search.addEventListener('keyup', e => {
            let searchValue = search.value.toLowerCase();
            searchKeywords(searchValue);
        })
    } else if (card) {
        // select the card element based on its proximity to actual element  
        index = parseInt(card.getAttribute('data-index'));
        displayModal(index);
    } else if (e.target === modalClose) {
        overlay.classList.add("hidden");
        overlay.classList.remove("show");
    } else if (e.target === modalNext) {
        if ((index + 1) < employees.length) {
            index += 1;
            displayModal(index);
        }
    } else if (e.target === modalPrevious) {
        if ((index - 1) >= 0)
            index -= 1;
        displayModal(index);
    }

});


///search functionality
function searchKeywords(value) {
    const displayMatches = [];
    let cardsOff = document.querySelectorAll('.card');
    let container = document.querySelector('main');
    if (value !== '' && value !== undefined) {
        cardsOff.forEach(card => {
            card.style.backgroundColor = "black";
            card.style.opacity = "0.3"
        });
    } else {
        cardsOff.forEach(card => card.style.backgroundColor = "white");
    }

    // iterate through employee names to check for user input text match
    employeesNames.forEach((match, index) => {
        if (match.toLowerCase().includes(value)) {
            displayMatches.push(employees[index]);
            displayMatches.forEach(cardOn => {
                cardOn = document.getElementById(`${index}`);
                container.prepend(cardOn);
                cardOn.style.backgroundColor = "white";
                cardOn.style.opacity = "1";
            });

        }
    });

}