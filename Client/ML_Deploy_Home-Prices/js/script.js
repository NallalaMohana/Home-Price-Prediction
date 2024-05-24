
function getBHKValue() {
   var uiBHK = document.getElementsByName("maximum");
   for(var i in uiBHK) {
      if(uiBHK[i].checked) {
         return parseInt(i)+1;
      }
   }
   return -1; // Invalid Value
   }

function getBathValue() {
   var uiBathrooms = document.getElementsByName("bathrooms");
   for(var i in uiBathrooms) {
     if(uiBathrooms[i].checked) {
         return parseInt(i)+4;
     }
   }
   return -1; // Invalid Value
 }
/*

function getBathValue() {
   var uiBathrooms = document.querySelector('select[name="bathrooms"]');
   return uiBathrooms.value;
}
*/

 function onClickedEstimatePrice() {
   console.log("Estimate price button clicked");
   var sqft = document.getElementById("uiSqft").value;
   const bhk=getBHKValue();
   var bathrooms = getBathValue();
   var location = document.getElementById("uiLocations").value;
   var estPrice = document.getElementById("uiEstimatedPrice");
 
   var url = "http://127.0.0.1:5000/predict_home_price"; 

   
   $.post(url, {
       total_sqft: parseFloat(sqft),
       bhk: bhk,
       bath: bathrooms,
       location: location
   },function(data, status) {
      console.log(data); // Check the structure of data in the console
      // Update the innerHTML of estPrice with the estimated price
      if (data && data.estimated_price) {
          estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      } else {
          estPrice.innerHTML = "<h2>No estimated price found.</h2>";
      }
      console.log(status);
   }).fail(function(xhr, status, error) {
      estPrice.innerHTML = "<h2>Enter correct details to estimate...</h2>";
  });
 }
 
 function onPageLoad() {
   console.log( "document loaded" );
  var url = "http://127.0.0.1:5000/get_location_names";
   $.get(url,function(data, status) {
       console.log("got response for get_location_names request");
       if(data) {
           var locations = data.locations;
           var uiLocations = document.getElementById("uiLocations");
           $('#uiLocations').empty();
           for(var i in locations) {
               var opt = new Option(locations[i]);
               $('#uiLocations').append(opt);
           }
       }
   });
 }
 
 window.onload = onPageLoad;



let menu = document.querySelector('.header .menu');

document.querySelector('#menu-btn').onclick = () =>{
   menu.classList.toggle('active');
}

window.onscroll = () =>{
   menu.classList.remove('active');
}

document.querySelectorAll('input[type="number"]').forEach(inputNumber => {
   inputNumber.oninput = () =>{
      if(inputNumber.value.length > inputNumber.maxLength) inputNumber.value = inputNumber.value.slice(0, inputNumber.maxLength);
   };
});

document.querySelectorAll('.view-property .details .thumb .small-images img').forEach(images =>{
   images.onclick = () =>{
      src = images.getAttribute('src');
      document.querySelector('.view-property .details .thumb .big-image img').src = src;
   }
});

document.querySelectorAll('.faq .box-container .box h3').forEach(headings =>{
   headings.onclick = () =>{
      headings.parentElement.classList.toggle('active');
   }
});


