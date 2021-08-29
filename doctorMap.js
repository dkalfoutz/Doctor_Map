/*

  LOCAL Server needs to be installed, otherwise Cross-Origin Resource Sharing (CORS) error occurs, 
  , while trying to import the local JSON file (doctors.json) via AJAX Request.
  
  Installing XAMPP, though, seems to resolve the above issue.
  
  Then, the app runns at: 127.0.0.1/.../doctorMap.html

*/


(function() {

  window.onload = function() {


    // Ajax request to retrieve JSON file data
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        var myDoctors = JSON.parse(this.responseText);
        
        myDocs = myDoctors;
        //console.log(myDocs);

        var myDocsResults =  myDocs.results;  //results is an array of objects
                                              //myDocsResults is an array of objects.
       
        // for testing purposes...
        console.log(myDocs.count);
        console.log(myDocs.results[1].id);
        console.log(myDocs);
        // end testing purposes...

        // for testing purposes...
        console.log("Doctors' Results are!:" + myDocsResults);

        console.log("Doctors' infos are following!! ")
        console.log("doctor 0, id is:!! " + myDocsResults[0].id);
        console.log("doctor 0, latitude is: " + myDocsResults[0].latitude);
        console.log("doctor 0, longitude is: " + myDocsResults[0].longitude);

        console.log("doctor 1, id is:!! " + myDocsResults[1].id);
        console.log("doctor 1, latitude is: " + myDocsResults[1].latitude);
        console.log("doctor 1, longitude is: " + myDocsResults[1].longitude);


        console.log("doctor 2, id is:!! " + myDocsResults[2].id);
        console.log("doctor 2, latitude is: " + myDocsResults[2].latitude);
        console.log("doctor 2, longitude is: " + myDocsResults[2].longitude);
        console.log(myDocsResults.length);
        // end testing purposes...


        // Creating a new map
        var map = new google.maps.Map(document.getElementById("map"), {
          //center: new google.maps.LatLng(37.98, 23.73),
          center: new google.maps.LatLng(myDocsResults[0].latitude, myDocsResults[0].longitude),
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP  //sets the kind of map type.
        });


        // Creating an infoWindow object. All markers (each one of them) will use this infowindow object. 
        var infoWindow = new google.maps.InfoWindow();


        // Parsing the LOCAL!! JSON data
        for (var i = 0, length = myDocsResults.length; i < length; i++) {
              var eachDoc = myDocsResults[i];
              var latLng = new google.maps.LatLng(eachDoc.latitude, eachDoc.longitude); // each Doctor's LAT and LONG.
          

              // Creating a marker and putting it on the map
              // Actually, all these doctors attributes are not needed..
              var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                last_name: eachDoc.last_name,
                first_name: eachDoc.first,
                last_name: eachDoc.last_name,
                street_address: eachDoc.street_address,
                city: eachDoc.city,
                zip_code: eachDoc.zip_code,
                country: eachDoc.country,
                latitude: eachDoc.latitude,
                longitude: eachDoc.longitude,
                languages: eachDoc.languages,
                date_of_birth: eachDoc.date_of_birth,
                practice_start_date: eachDoc.practice_start_date
              });


              // Creating a closure to retain the correct data and (marker, data) are passed inside the closure.
              // Immediately Invoked function expression: marker and eachDoc are used inside the IIFE,
              // , nevertheless marker and eachDoc are available outside IIFE's scope.
              (function(marker, eachDoc) {
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(event) {
                      infoWindow.setContent(eachDoc.last_name + " " + eachDoc.first_name + "<br>" + eachDoc.street_address + ", " + eachDoc.city + ", " + eachDoc.zip_code + "<br>" + eachDoc.languages);
                      infoWindow.open(map, marker);
                  });

              })(marker, eachDoc);

        } // end for

        // marker is the Marker object we need to center on. Nevertheless, only marker that correspods to
        // doctor with id = 1 is needed.
        //var latLng = marker.getPosition(); // returns LatLng object
        //map.setCenter(latLng); // setCenter takes a LatLng object


      } // end if
    };
    xmlhttp.open("GET", "data/doctors.json", true);
    xmlhttp.send(null);

    

  }

})();