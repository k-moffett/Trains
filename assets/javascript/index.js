$( document ).ready(function () {

let config = {
    apiKey: "AIzaSyAaZ2r7nPtR3amCUPeYi7DuF7Z0yBVYV6E",
    authDomain: "trains-9f9f1.firebaseapp.com",
    databaseURL: "https://trains-9f9f1.firebaseio.com",
    projectId: "trains-9f9f1",
    storageBucket: "",
    messagingSenderId: "735348772785"
  };
  firebase.initializeApp(config);
  let database =  firebase.database()
  let current_time = moment().format("HH:mm")

$("#submit").on("click", function() {
    event.preventDefault();
    let name = $("#train-name").val().trim()
    let destination = $("#destination").val().trim()
    let train_time = $("#train-time").val().trim()
    let frequency = $("#frequency").val().trim()
    let first_time = $("#train-time").val().trim()
    database.ref().push({
        name: name,
        destination: destination,
        time: train_time,
        frequency: frequency,
        first_time: first_time,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
    })
    $("#train-name").val("")
    $("#destination").val("")
    $("#train-time").val("")
    $("#frequency").val("")
})













function get_timez(){
    let interval_id = setInterval(time, 1000)
}
function time(){
    let moment_time = moment().format("HH:mm")
    console.log(current_time)
    current_time = moment_time
}
function get_dataz(){
    database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
        console.log(snapshot.val())
        let response = snapshot.val()  
        $("#display-schedule").append(`<tr> <td class="col">`+response.name+`</td> <td class="col">`+response.destination+`</td> <td class="col">`+response.frequency+`</td> <td class="col"></td> <td class="col"></td> </tr>`)
        })
    }

get_timez()
get_dataz()
//
})
