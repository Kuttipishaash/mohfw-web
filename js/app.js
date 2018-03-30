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

let dbRef = firebase.database().ref().child('reports');

let loginButton = document.querySelector('#btn-submit');
let titleField = document.querySelector('#input-title')
let programNameField = document.querySelector('#input-program-name');
let descField = document.querySelector('#input-desc');

loginButton.addEventListener('click', function() {
    dbRef.push().set({
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
});