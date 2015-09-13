
$( document ).ready(function() {
    
  var nprUrl = "https://api.npr.org/query?fields=title,storyDate,text,listText&dateType=story&output=JSON&apiKey=MDE4OTM0NDk1MDE0Mjk3MDg1MDFhYjFiMg001"
  
  $.getJSON( nprUrl, function( data ) {
    
    var items = [];
    $.each( data.list.story, function( key, val ) {
      items.push( 
        "<li id='" + key + "'>"
        + "<ul>" +
            "<li> Title: "+ 
              val.title.$text +
            "</li>" +
            "<li> Text: "+
              val.text.paragraph[0].$text +
            "</li>" +
            "<li> Link: "+
              val.link[0].$text +
            "</li>" +
            "<li> Date: "+
              val.storyDate.$text +
            "</li>" +
          "</ul>" +
        "</li>" +
      "");
    });
   
    $( "<ol/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "#StoriesArea" );
    
  });
  
});
