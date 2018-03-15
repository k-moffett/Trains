$( document ).ready(function () {

let config = {
    apiKey: "AIzaSyAqCqntoJGH1crGl31JN8pFiWB_QbmHpGc",
    authDomain: "time-sheet-55702.firebaseapp.com",
    databaseURL: "https://time-sheet-55702.firebaseio.com",
    projectId: "time-sheet-55702",
    storageBucket: "",
    messagingSenderId: "723033960582"
  };
  firebase.initializeApp(config);
  let database =  firebase.database()
$("#submit").on("click", function() {
    event.preventDefault();
})
})
get_dataz()
function get_dataz(){
    database.ref().on("child_added", function(snapshot) {
        let all_users = snapshot.val()
        let users_array = Array.of(all_users)
       for (i=0; i<users_array.length; i++){
          $("#t-body").append(`<tr><td>`+users_array[i].employee_namez+`</td><td>`+users_array[i].employee_role+`</td><td>`+users_array[i].employee_start_date+`</td><td></td><td>`+users_array[i].employee_monthly_rate+`</td></tr>`)
       }
    }),
    function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      }
}
})