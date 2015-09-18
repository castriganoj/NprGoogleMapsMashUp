  /*var nprUrl = "https://api.npr.org/query?fields=title,storyDate,text,listText&dateType=story&output=JSON&apiKey=MDE4OTM0NDk1MDE0Mjk3MDg1MDFhYjFiMg001"

  //$.getJSON( nprUrl, function( data ) {

  var items = [];
  $.each(data.list.story, function(key, val) {
    items.push(
      "<li id='" + key + "'>" + "<ul>" +
      "<li> Title: " +
      val.title.$text +
      "</li>" +
      "<li> Text: " +
      val.text.paragraph[0].$text +
      "</li>" +
      "<li> Link: " +
      val.link[0].$text +
      "</li>" +
      "<li> Date: " +
      val.storyDate.$text +
      "</li>" +
      "</ul>" +
      "</li>" +
      "");
  });

  $("<ol/>", {
    "class": "my-new-list",
    html: items.join("")
  }).appendTo("#StoriesArea");

});
*/
 
 $(document).ready(function() {
   console.log('hey');
   $(JsonGetter.pullFile)
  
 });

function storyObj(title,text, cityName) {
        this.title = title;
        this.text = text;
        this.cityName = cityName;
    }


 var JsonGetter = {
     
   //get json file
   pullFile: function() {
     $.getJSON("js/NPR_Output.json", function(json) {
       var data = json;
       JsonGetter.getData(data);
     });
   }

   ,getData: function(d) {
     var Npr_json = d;
     JsonGetter.pullText(Npr_json)
   }

   ,pullText: function(Npr_json) {
       var storyObjs;
       var storyTitle;
       var stories = []
       var storyTxt;

        for (var i = 0; i < Npr_json.list.story.length; i++) {
            storyObjs = Npr_json.list.story[i].text.paragraph;
            storyTitle = Npr_json.list.story[i].title.$text;
            storyTxt = "";
            
 
            $.each(storyObjs, function( index, value ) {
                storyTxt += value.$text;
            });
            
                                                            // create array of objects with title story and city name properties.
            stories.push(new storyObj(storyTitle, storyTxt,""));
            
        }
     // will like need to loop inside loop
   }
 }
 
  
// set up story object for check and delivery
//need object constrictor


//pass each word in text to geocode until cityNameis found

//pass cityName back to storyObj along with long and lat for placement on map

// add marker to map with long and lat, at text to marker with city name and story title. 