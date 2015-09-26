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
    $(JsonGetter.pullFile);

    var geocoder = new google.maps.Geocoder();

    /* ****Under Construction
          var x = "john jay high school";
          loop: for (var i = 0; i < x.length; i++) {
              geocoder.geocode({   
                "address": x,
                'componentRestrictions': {
                  'country': "US",
                }
              }, function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                      console.log(results);
                  }
                  else {
                      console.log("fail");
                  }
              });
          }
          
          var map;
          
          function initialize() {
            map = new google.maps.Map(document.getElementById('map-canvas'), {
                zoom: 12,
                center: {
                    lat: -34.397,
                    lng: 150.644
                }
            });
          }
    */
  });

  //capitalize a string
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  function storyObj(title, text, cityName) {
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

    ,
    getData: function(d) {
      var Npr_json = d;
      JsonGetter.pullText(Npr_json)
    }

    ,
    pullText: function(Npr_json) {
      var storyObjs;
      var storyTitle;
      var stories = []
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
      abbreviation: 'AS'
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
      abbreviation: 'PR'
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
        for (j in StateFinder.usStates) {

          stateNameCount = stories[i].text.split(StateFinder.usStates[j].name.toLowerCase().capitalize()).length - 1
          stateAbbrCount = stories[i].text.split(StateFinder.usStates[j].abbreviation).length - 1

          if ((stateNameCount + stateAbbrCount) > 0) {

            if (stateNameCount + stateAbbrCount > count)
            {
              highCountState = StateFinder.usStates[j].name;
              count = stateNameCount + stateAbbrCount;
            }

            console.log(StateFinder.usStates[j].name + ": Found state name and abbreviation " + stateNameCount + stateAbbrCount + " times.");
          }
        }

        console.log(highCountState + " : " + count);
      }
    }
  }



  //pass cityName back to storyObj along with long and lat for placement on map

  // add marker to map with long and lat, at text to marker with city name and story title.