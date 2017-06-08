var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var map
var markers = []
function init(type) {
  console.log(type)
  var maptype = type;
  var map_icon;
  map_icon = (type == "Digital") ? "map-green.png" :"map-red.png"
  if(maptype == undefined){
    maptype ="Static";
  }

  var mapOptions = {
    zoom: 3,
    minZoom: 2,

    center: new google.maps.LatLng(40.6700, -73.9400),
    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-300},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
  };
  var mapElement = document.getElementById('map');
  var map = new google.maps.Map(mapElement, mapOptions);
  var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
  kumulos_init.call('mapviewfilter',{jwt_token:localStorage['ooh-jwt-token'],type:maptype},function(res){
   var locations = []
   console.log(res)
   for(i=0;i<res.length;i++){
    var location_element = {
      "type": "Feature",
      "properties": {
       "description":res[i].faceDescription,
       "icon":"images/"+map_icon,
       "iconSize": 1

     },
     "geometry": {
       "type": "Point",
       "coordinates": [res[i].faceDescription,res[i].latitude, res[i].latitude,res[i].longitude]
     }

   }
   var icon_ = (maptype == "Static") ? "http://maps.google.com/mapfiles/ms/micons/blue.png" : "http://maps.google.com/mapfiles/ms/micons/red.png"
   marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
                    title: res[i].faceDescription,
                    // label: (maptype == "Static")?"S":"D",
                    "icon":icon_,
                    position: new google.maps.LatLng(res[i].latitude, res[i].longitude)
                  });
   marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

 }
})




}
$(document).ready(function(){
  google.maps.event.addDomListener(window, 'load', init('Static'));
  $("#buttons input[type='radio']").on("change",function(){
    console.log($(this).val())
    google.maps.event.addDomListener(window, 'load', init($(this).val()));

  })


})

$("#show-static").on("click",function(){

})

$("#show-digital")










