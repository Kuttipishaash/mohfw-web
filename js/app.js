// Initialize Firebase
var config = {
    apiKey: "AIzaSyAei6hzCpgbFJ3-lVHT7eCzneWUnbmTfhA",
    authDomain: "mohfw-d9732.firebaseapp.com",
    databaseURL: "https://mohfw-d9732.firebaseio.com",
    projectId: "mohfw-d9732",
    storageBucket: "mohfw-d9732.appspot.com",
    messagingSenderId: "369205083350"
};
firebase.initializeApp(config);

let dbReportsRef = firebase.database().ref().child('reports');
let dbUserRef = firebase.database().ref().child('users');

//Login screen
let loginScreen = document.querySelector('#login-screen');
let loginButton = document.querySelector('#btn-login');
let usernameField = document.querySelector('#input-username');
let passwordField = document.querySelector('#input-password');
let loggedIn = false;

loginButton.addEventListener('click', function () {
    dbUserRef.on('child_added', snap => {
        if (usernameField.value === snap.val().name) {
            if (passwordField.value === snap.val().password) {
                M.toast({
                    html: 'Logged in successfully',
                    classes: 'rounded'
                });
                loggedIn = true;
                addClass(loginScreen, 'move-up');
            }
        }
    });
});

//Report submission screen
let viewScreen = document.querySelector('#view-report-screen');
let submitButton = document.querySelector('#btn-submit');
let titleField = document.querySelector('#input-title')
let programNameField = document.querySelector('#input-program-name');
let descField = document.querySelector('#input-desc');

submitButton.addEventListener('click', function () {
    if (loggedIn) {
        dbReportsRef.push().set({
            desc: descField.value,
            progName: programNameField.value,
            title: titleField.value
        });
        M.toast({
            html: 'Report entered',
            classes: 'rounded'
        });
        descField.value = '';
        programNameField.value = '';
        titleField.value = '';
    }
});


//utility functions

function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}