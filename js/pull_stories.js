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

    // function initMap() {
    //   // Create a map object and specify the DOM element for display.
    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: -34.397, lng: 150.644},
    //     scrollwheel: false,
    //     zoom: 8
    //   });
    // }

    $(JsonGetter.pullFile);
    var stories= [];

  });

  //capitalize a string
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  function storyObj(title, text, cityName, location) {
    this.title = title;
    this.text = text;
    this.cityName = cityName;
    this.location = location;
  }


  var JsonGetter = {

    //get json file
    pullFile: function() {
      $.getJSON("js/NPR_Output.json", function(json) {
        var data = json;
        JsonGetter.getData(data);
      });
    }

    ,
    getData: function(d) {
      var Npr_json = d;
      JsonGetter.pullText(Npr_json)
    }

    ,
    pullText: function(Npr_json) {
      var storyObjs;
      var storyTitle;
      stories = []
      var storyTxt;

      for (var i = 0; i < Npr_json.list.story.length; i++) {
        storyObjs = Npr_json.list.story[i].text.paragraph;
        storyTitle = Npr_json.list.story[i].title.$text; //set article title
        storyTxt = "";


        $.each(storyObjs, function(index, value) {
          storyTxt += value.$text; // set article text
        });

        // create array of objects with title story and city name properties.
        stories.push(new storyObj(storyTitle, storyTxt, ""));

      }

      StateFinder.stateLoop(stories)
    }


  }



  var StateFinder = {

    //states: ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Federated States of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Island", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
    usStates: [{
      name: 'ALABAMA',
      abbreviation: 'AL'
    }, {
      name: 'ALASKA',
      abbreviation: 'AK'
    }, {
      name: 'AMERICAN SAMOA',
      //abbreviation: 'AS' **picking up the word as..case sensititive
    }, {
      name: 'ARIZONA',
      abbreviation: 'AZ'
    }, {
      name: 'ARKANSAS',
      abbreviation: 'AR'
    }, {
      name: 'CALIFORNIA',
      abbreviation: 'CA'
    }, {
      name: 'COLORADO',
      abbreviation: 'CO'
    }, {
      name: 'CONNECTICUT',
      abbreviation: 'CT'
    }, {
      name: 'DELAWARE',
      abbreviation: 'DE'
    }, {
      name: 'DISTRICT OF COLUMBIA',
      abbreviation: 'DC'
    }, {
      name: 'FEDERATED STATES OF MICRONESIA',
      abbreviation: 'FM'
    }, {
      name: 'FLORIDA',
      abbreviation: 'FL'
    }, {
      name: 'GEORGIA',
      abbreviation: 'GA'
    }, {
      name: 'GUAM',
      abbreviation: 'GU'
    }, {
      name: 'HAWAII',
      abbreviation: 'HI'
    }, {
      name: 'IDAHO',
      abbreviation: 'ID'
    }, {
      name: 'ILLINOIS',
      abbreviation: 'IL'
    }, {
      name: 'INDIANA',
      abbreviation: 'IN'
    }, {
      name: 'IOWA',
      abbreviation: 'IA'
    }, {
      name: 'KANSAS',
      abbreviation: 'KS'
    }, {
      name: 'KENTUCKY',
      abbreviation: 'KY'
    }, {
      name: 'LOUISIANA',
      abbreviation: 'LA'
    }, {
      name: 'MAINE',
      abbreviation: 'ME'
    }, {
      name: 'MARSHALL ISLANDS',
      abbreviation: 'MH'
    }, {
      name: 'MARYLAND',
      abbreviation: 'MD'
    }, {
      name: 'MASSACHUSETTS',
      abbreviation: 'MA'
    }, {
      name: 'MICHIGAN',
      abbreviation: 'MI'
    }, {
      name: 'MINNESOTA',
      abbreviation: 'MN'
    }, {
      name: 'MISSISSIPPI',
      abbreviation: 'MS'
    }, {
      name: 'MISSOURI',
      abbreviation: 'MO'
    }, {
      name: 'MONTANA',
      abbreviation: 'MT'
    }, {
      name: 'NEBRASKA',
      abbreviation: 'NE'
    }, {
      name: 'NEVADA',
      abbreviation: 'NV'
    }, {
      name: 'NEW HAMPSHIRE',
      abbreviation: 'NH'
    }, {
      name: 'NEW JERSEY',
      abbreviation: 'NJ'
    }, {
      name: 'NEW MEXICO',
      abbreviation: 'NM'
    }, {
      name: 'NEW YORK',
      abbreviation: 'NY'
    }, {
      name: 'NORTH CAROLINA',
      abbreviation: 'NC'
    }, {
      name: 'NORTH DAKOTA',
      abbreviation: 'ND'
    }, {
      name: 'NORTHERN MARIANA ISLANDS',
      abbreviation: 'MP'
    }, {
      name: 'OHIO',
      abbreviation: 'OH'
    }, {
      name: 'OKLAHOMA',
      abbreviation: 'OK'
    }, {
      name: 'OREGON',
      abbreviation: 'OR'
    }, {
      name: 'PALAU',
      abbreviation: 'PW'
    }, {
      name: 'PENNSYLVANIA',
      abbreviation: 'PA'
    }, {
      name: 'PUERTO RICO',
      //abbreviation: 'PR' ***pr is being picked up by npr
    }, {
      name: 'RHODE ISLAND',
      abbreviation: 'RI'
    }, {
      name: 'SOUTH CAROLINA',
      abbreviation: 'SC'
    }, {
      name: 'SOUTH DAKOTA',
      abbreviation: 'SD'
    }, {
      name: 'TENNESSEE',
      abbreviation: 'TN'
    }, {
      name: 'TEXAS',
      abbreviation: 'TX'
    }, {
      name: 'UTAH',
      abbreviation: 'UT'
    }, {
      name: 'VERMONT',
      abbreviation: 'VT'
    }, {
      name: 'VIRGIN ISLANDS',
      abbreviation: 'VI'
    }, {
      name: 'VIRGINIA',
      abbreviation: 'VA'
    }, {
      name: 'WASHINGTON',
      abbreviation: 'WA'
    }, {
      name: 'WEST VIRGINIA',
      abbreviation: 'WV'
    }, {
      name: 'WISCONSIN',
      abbreviation: 'WI'
    }, {
      name: 'WYOMING',
      abbreviation: 'WY'
    }]

    ,
    stateLoop: function(stories) {

      for (i in stories) {

        console.log("*****" + stories[i].title + "*****")
        count = 0;
        highCountState = "";
        for (j in StateFinder.usStates) {

          stateNameCount = stories[i].text.split(StateFinder.usStates[j].name.toLowerCase().capitalize()).length - 1
          stateAbbrCount = stories[i].text.split(StateFinder.usStates[j].abbreviation).length - 1

          sum = 0;
          sum = stateAbbrCount + stateNameCount;

          if ((sum) > 0) {

            if (sum > count) // set first high state cout
            {
              highCountState = StateFinder.usStates[j].name;
              count = stateNameCount + stateAbbrCount;
            }

            console.log(highCountState + ": Found state name and abbreviation " + sum + " times.");
          }
        }

        if (highCountState == "") {
          console.log("no state found");
        }
        else {
          console.log(highCountState + " : " + count);
          stories[i].cityName = highCountState;
          
          //set location
          GetGeocode.Coordinates(highCountState, stories[i])
          
          //place marker
          GetGeocode.PlaceMarkers()
          
        
        }

      }
    }
  }

  var GetGeocode = {
   //add coordinates to stories objects. 
   
        Coordinates: function(city, story) {

        geocoder = new google.maps.Geocoder();
        
        GetGeocode.getCoordinates(city, function(coords){
          story.location = coords
          })
        
        
}
      
        ,getCoordinates:  function (city, callback){
        var coordinates;
        
            geocoder.geocode({
              'address': city
            }, function(results, status) {
              if (status === google.maps.GeocoderStatus.OK){
                coordinates = results[0].geometry.location;
                callback(coordinates);
              }
              else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });
          }
        
        ,PlaceMarkers: function (){
          
           // Loop through our array of markers & place each one on the map  
    for( i = 0; i < stories.length; i++ ) {
        var position = new google.maps.LatLng(stories[i].location.L, stories[i].location.H);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            //title: markers[i][0]
        });
        }
          // for markers ....
          //var map = new google.maps.Map(document.getElementById('map')
        }
  }
        //pass cityName back to storyObj along with long and lat for placement on map

      // add marker to map with long and lat, at text to marker with city name and story title.