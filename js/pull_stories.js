
$( document ).ready(function() {
    
   // console.log( "ready!" );

var nprUrl = "https://api.npr.org/query?fields=title,storyDate,titles&dateType=story&output=JSON&apiKey=MDE4OTM0NDk1MDE0Mjk3MDg1MDFhYjFiMg001"
$.getJSON( nprUrl, function( data ) {
  var items = [];
  $.each( data.list.title.$text, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "#StoriesArea" );
});
});