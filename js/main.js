'use strict';

//list of elements to use

const username = document.querySelector('#username');
const button = document.querySelector('.btn');
const list = document.querySelector('.list');

//function to take username and search in GitHub
const getName = () => {
    const userName = username.value;
    if (userName !== '') {
        return fetch(`https://api.github.com/users/${userName}`)
        .then(userResponse => userResponse.json())
        .then(userData => {
            console.log(JSON.stringify(userData));
            return userData;
        })
    } else {
        list.innerHTML = `<li class="error">Please enter a valid username!</li>`;
    }
};

//function to get name from details and print name as a list
const getFirstName = (info) => {
    const name = info.name;
    let firstName = '';
    if (name !== null) {
        const nameSplit = info.name.split(" ");
        firstName = nameSplit[0];
        console.log(firstName);
        printName(firstName);
    }
    else {
        console.log('Error - no first name!');
        list.innerHTML = `<li class="error">${info.login} does not have a first name saved!</li>`;
    }
}

//function to print name as a list
const printName = (name) => {
    let nameContent = '';
    for (const letter of name) {
        nameContent += `<ul class="list-item">${letter}</ul>`;
    }
    list.innerHTML = nameContent;
}

//function to call other functions
const searchAndSetName = () => {
    getName()
        .then(userData => {
            if (userData) {
            getFirstName(userData);
            }
        })
    .catch(error => {
        console.error(error);
    })
}

//add listener to button

button.addEventListener('click', searchAndSetName);
username.addEventListener('keyup',function(e){
    if (e.keyCode === 13) {
    searchAndSetName();
  }
});