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



function new_arrival(frequency, arrival_minutes){
total_minutes = (frequency*1)+(arrival_minutes*1)

return total_minutes

}
function get_minutes(array){
minutes_of_hours = (array[0]*1)
minutes = (array[1]*1)
return (minutes_of_hours*1)+(minutes*1)
}
function greater_get_minutes(h1,m1,h2,m2 ){
    total_first_min = (h1*60)+(m1*1)
    total_current_time_min = (h2*60)+(m2*1)
    minute_difference = (total_first_min*1) - (total_current_time_min*1)
    return (minute_difference*1)
}
function lesser_get_minutes(h1,m1,h2,m2 ){
    total_first_min = (h1*60)+(m1*1)
    total_current_time_min = (h2*60)+(m2*1)
    minute_difference = (total_current_time_min*1) - (total_first_min*1)
    total_minutes_left = 1440 - (minute_difference*1)
    return (total_minutes_left*1)
}
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
        let response = snapshot.val()
        let next_arrival = response.first_time
        let minutes_left;
        starting_time = response.first_time.toString().replace(":","")
        string_time = current_time.toString().replace(":","")

        math_time = current_time.toString().split(":")
        math_response = response.first_time.toString().split(":")

        string_arrival = next_arrival.toString().replace(":","")
        next_arrival_minutes = get_minutes(string_arrival)

        if (starting_time > string_time){
        minutes_left = greater_get_minutes(math_response[0],math_response[1],math_time[0],math_time[1])
        } else if (starting_time < string_time){
        minutes_left = lesser_get_minutes(math_response[0],math_response[1],math_time[0],math_time[1])
        }
//when the current time === next arrival, update that trains next arrival by adding its frequency
        if (next_arrival === current_time) {
            next_arrival = new_arrival(response.frequency, next_arrival_minutes)
        }


        $("#display-schedule").append(`<tr> <td class="col">`+response.name+`</td> <td class="col">`+response.destination+`</td> <td class="col">`+response.frequency+`</td> <td class="col">`+next_arrival+`</td> <td class="col">`+minutes_left+`</td> </tr>`)
        })
    }
get_timez()
get_dataz()
//
})
