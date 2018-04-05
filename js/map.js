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

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 9.9312,
            lng: 76.2673
        },
        zoom: 16
    });

    var bounds = new google.maps.LatLngBounds();
    var dbRef = firebase.database().ref().child('locations');

    var locations = [];

    dbRef.on('child_added', snap => {
        locations.push(snap.val());

        console.log(snap.val());
        
        var marker = new google.maps.Marker({
            position: snap.val(),
            title: 'test'
        });

        marker.setMap(map);
        bounds.extend(marker.position);
        map.fitBounds(bounds);
    });
}
