/* TODO: 
 1. dispable style for submit button
 2. DONE red highlight if an item is not filled
 3. DONE cousor for buttons
 4. DONE styles for buttons
 5. make actual sending
 6. get adjectives from the db! 
 */

var UserName="";
var UserRoom="";
var UserRoomDefault="1234";

// Option
// "Cold", [very, slightly], 0
var Option = function(title, intensity, positiveness){
    this.title = title;
    this.intensity = intensity;
    this.selectedIntensity = -1;
    if (positiveness == undefined){
        this.positiveness = 0;
    }
    else{
        this.positiveness = positiveness;
    }
}

Option.prototype.getInWords = function(){
    if (this.selectedIntensity >= 0){
        return this.intensity[this.selectedIntensity] + " " + this.title;
    }
    else{
        return this.title;
    }
}

// Category (has options inside)
// Temperature, [["Cold", [very, slightly], 0], [...]]
var Category = function(title, options){
    this.title = title;
    this.options = options;
}

Category.prototype.getOptions = function(){
    var i;
    for(i = 0; i < this.options.length; i+=1){
    }
}

// Item
// "What?","The actual feeling", "I feel", [[Categoy, options],[..]], false, [option1, option2], iddd, true  
//TODO: remove idInIHTM
var Item = function(question, title, prefix, categories, showCategories, selectedOptions, idInHTML, isRequired, isOnlyOneSelected){
    this.question = question;
    this.title = title;
    this.prefix = prefix;
    this.categories = categories;
    this.showCategories = showCategories;
    ////// !!!!!!!!!!!!!!!!!!!!!!!!
    this.selectedOptions = selectedOptions;
    this.idInHTML = idInHTML;
    this.isRequired = isRequired;
    this.isOnlyOneSelected = isOnlyOneSelected;
}

Item.prototype.getInWords = function(){
    var resultingString = "";
    var j;
    for(j = 0; j < this.selectedOptions.length; j+=1){
        if (j==0){
            // The first item in the list
            resultingString += " " + this.selectedOptions[j].getInWords();
        }
        else {
            if  (j == this.selectedOptions.length-1){
                // last one; and needed
                resultingString += " and " + this.selectedOptions[j].getInWords();
            }
            else {
                // It is not the last one
                // comma needed
                resultingString += ", " + this.selectedOptions[j].getInWords();
            }
      }
    }
    // if (this.selectedOptions.length == 0) {
    //     // no selected options
    //     resultingString = resultingString + " ..."
    // }
    return resultingString;
    
}

//
Item.prototype.isFilledAsSupposed = function(){
    if (this.isRequired){
        if (this.selectedOptions.length > 0){
            // No problems, there is a value
            return true;
        }
        else{
            // Value is required, but not selected
            return false;
        }
    }
    else {
        return true;
    }
}

Item.prototype.selectedOptionsToArray = function(){
    var resultingArray = [];
    var i;
    for(i = 0; i < this.selectedOptions.length; i+=1){
      resultingArray.push(this.selectedOptions[i].title);
    }
    // Make it not empty! 
    if (resultingArray.length ==0){
      resultingArray.push("");
    }
    return resultingArray;

}
//320, 460
var designWidth = 360; // zoom to fit this ratio
var designHeight = 500; // not 800 b/c top bar is 38 pixels tall
var scaleChange = 1; // % change in scale from above #s

function zoomScreen() {
  var docWidth = window.outerWidth;
  var docHeight = window.outerHeight;


  if (docWidth > 1000){
    // This is considered to be a big zoomScreen
    // do nothing
  }
  else if (docWidth > designWidth+50 || docWidth < designWidth-50) {
    var scaleX = docWidth / designWidth;
    var scaleY = docHeight / designHeight;
    if (scaleX < scaleY) {
      $('body').css('zoom', scaleX);
      scaleChange = scaleX;
    } else {
      $('body').css('zoom', scaleY);
      scaleChange = scaleY;
    }
  }
}

// ****************** ITEM DEFINITION!!!! ***********************//
var items = [
             new Item("When?","Timestamp", "",
                      [new Category("Own",
                                    [
                                     ]
                                    ),
                      new Category(
                                    "",
                                    [
                                     new Option("Now", []),
                                     new Option("Half an hour ago", []),
                                     new Option("One hour ago", []),
                                     new Option("Two hours ago", []),
                                     new Option("This morning", []),
                                     new Option("This afternoon", []),
                                     new Option("Same time yesterday", [])
                                     ]
                                    )
                      ],
                      false,
                      [],
                      "",
                      true,
                      false),
             new Item("Where?","Location", "in",
                      [new Category("Own",
                                    [
                                     ]
                                    ),
                      new Category(
                                    "Common rooms",
                                    [
                                    new Option("Lobby", []),
                                    new Option("Cafe Kafis", [])
                                    ]
                                    ),
                      new Category(
                                    "Event spaces",
                                    [
                                    new Option("The Stage", []),
                                    new Option("The Studio", []),
				                            new Option("Kino", []),
                                    new Option("B4!12", [])
				                            ]
                                    ),
                      new Category(
                                    "Meeting rooms",
                                    [
                                    new Option("The Zoo", []),
                                    new Option("Meeting Room", []),
                                    new Option("Black", []),
                                    new Option("Fat Boy", []),
                                    new Option("White", []),
                                    new Option("Engine Room", []),
                                    new Option("Skype Out", []),
                                    new Option("iWork", []),
                                    new Option("Big Sister", [])
				                           ]
				                          ),
			                new Category(
                                    "Produciton and Prototyping",
                                    [
                                    new Option("Metalshop", []),
                                    new Option("Puuhamaa", []),
                                    new Option("Puuhabunkeri", []),
                                    new Option("Electro Shop", []),
                                    new Option("Knitting Factory", []),
                                    new Option("Pain Shop", []),
                                    new Option("Wood Shop", []),
                                    new Option("AC DC", []),
                                    new Option("Supply Cave", [])
                                    ]
                                    ),
                      new Category(
                                    "Company and stuff",
                                    [
                                    new Option("ME-310 loft", []),
                                    new Option("BARN", []),
                                    new Option("Audition", []),
                                    new Option("Company Plaza", []),
                                    new Option("Stuff Wing", [])
                                    ]
                                    )
                      ],
                      false,
                      [],
                      "",
                      true,
                      true),
             new Item("Activity?","Activity", "I am",
                      [new Category("Own",
                                    [
                                     ]
                                    ),
                      new Category(
                                    "",
                                    [
                                     new Option("discussing", []),
                                     new Option("reading", []),
                                     new Option("writing", []),
                                     new Option("coding", []),
                                     new Option("eating", [])
                                     ]
                                    )
                      ],
                      false,
                      [],
                      "",
                      false,
                      false),
             new Item("How?","Actual Feedback", "it is",
                      [new Category("Own",
                                    [
                                     ]
                                    ),
                       new Category(
                                    "Temperature positive",
                                    [
                                     new Option("OK", [], 1),
                                     new Option("good", [], 1),
                                     new Option("just right", [], 1)
                                     ]
                                    ),
                       new Category(
                                    "Temperature negative",
                                    [
                                     new Option("too hot", ["very", "slightly"],-1),
                                     new Option("hot", ["very", "slightly"], -1),
                                     new Option("warm", ["very", "slightly"], -1),
                                     new Option("chilly", ["very", "slightly"], -1),
                                     new Option("cold", ["very", "slightly"], -1),
                                     new Option("very cold", ["very", "slightly"], -1)
                                     ]
                                    ),
                       new Category(
                                    "Lighting",
                                    [
                                     new Option("very dark", [], -1),
                                     new Option("dark", [], -1),
                                     new Option("bright", [], -1),
                                     new Option("very bright", [], -1)
                                     ]
                                    ),
                       new Category(
                                    "Air quality",
                                    [
                                     new Option("stuffed air", [], -1),
                                     new Option("fresh air", [], 1)
                                     ]
                                    ),
                      new Category(
                                    "Others positive",
                                    [
                                     new Option("motivating", [], -1),
                                     new Option("cozy", [], 1),
                                     new Option("relaxing", [], -1)
                                     ]
                                    ),
                      new Category(
                                    "Others negative",
                                    [
                                     new Option("depressing", [], -1),
                                     new Option("boring", [], 1),
                                     new Option("uncomfortable", [], -1),
                                     new Option("stressing", [], 1),
                                     new Option("disturbing", [], 1)                                     
                                     ]
                                    )

                       ],
                      true,
                      [],
                      "",
                      true,
                      false),
             new Item("Why is it?","Reason", "because of",
                      [new Category("Own",
                                    [
                                     ]
                                    ),
                      new Category(
                                    "",
                                    [
                                     new Option("no idea", []),
                                     new Option("weather", []),
                                     new Option("people around", []),
                                     new Option("I am getting sick", []),
                                     new Option("window is open", []),
                                     new Option("window is closed", []),
                                     new Option("I ran to work", []),
                                     new Option("radiator does not work", [])
                                     ]
                                    )
                      ],
                      false,
                      [],
                      "",
                      false,
                      false),
             new Item("Then?","Action", "I will",
                      [new Category("Own",
                                    [
                                     ]
                                    ),
                      new Category(
                                    "",
                                    [
                                     new Option("do nothing", []),
                                     new Option("work", []),
                                     new Option("get coffee", []),
                                     new Option("put jacket on", []),
                                     new Option("open the window", []),
                                     new Option("close the window", []),
                                     new Option("go to coffee room", [])
                                     ]
                                    )

                      ],
                      false,
                      [],
                      "",
                      false,
                      false),
             new Item("Liking?","Action", "",
                      [new Category("Own",
                                    [
                                     ]
                                    ),
                      new Category(
                                    "",
                                    [
                                     new Option("I like it", []),
                                     new Option("It's ok", []),
                                     new Option("I don't like it", [])
                                     ]
                                    )

                      ],
                      false,
                      [],
                      "",
                      false,
                      false)

             ];

//this.items[2].selectedOptions[0] = items[2].categories[0].options[0];
resetAnswers();

// ****************** COMMON FUCTIONS******************************//

// If option is selected, returns N of it in the selected[] array
// item to check in, category to check in, option to check
function isThisOptionSelected(itemToCheck, categodyToCheckIn, optionToCheck){
  var itemIsAt = -1;
  var i = 0;
  while (i < this.items[itemToCheck].selectedOptions.length && itemIsAt < 0){
    if (this.items[itemToCheck].selectedOptions[i] == 
      this.items[itemToCheck].categories[categodyToCheckIn].options[optionToCheck]){
      itemIsAt = i; 
    }   
    i++;
  }
  
  return itemIsAt;
}

// check if submit button should be enabled, i.e., if all required items are filled
function isEverythingFilled(){
    var isIt = true;
    var i;
    for(i = 0; i < this.items.length; i+=1){
        if (!items[i].isFilledAsSupposed()){
            isIt = false;
        }
    }
    return isIt;
}

function getAnswerInWords(){
  var o;
  var answerInWords = "";
  for(o=0; o < this.items.length; o++){
    if (items[o].selectedOptions.length >0){
      //Include this item into answer
      // 0 Now
      // 1 Here 
      // 2 I am -> .
      // 3 it is ... -> Cap + " "
      // 4 Because -> .
      // 5 I will ->Cap, .
      // 6 I like/don't like -> Cap
      // if (o == 0 || o == 1 || o == 4){

        var toAdd = ""; 
        if (items[o].prefix != ""){
          toAdd += items[o].prefix;
        }
        toAdd += items[o].getInWords();
        if (o == 0 || o == 1){
          toAdd += " ";
        }
        if (o == 3 && (items[o - 1].selectedOptions.length >0)){ // There was an activity
          toAdd = capitaliseFirstLetter(toAdd); // It is 
          toAdd = ". " + toAdd;
        }
        if (o == 3 && (items[o + 1].selectedOptions.length >0)){ // There will be a reason
          toAdd += " ";
        }
        if (o ==3 && (items[o + 1].selectedOptions.length == 0)){ // There wont be a reason
          toAdd += ". "; 
        }
        if (o == 4){ // there is a reason
         toAdd += ". "; 
        }
        if (o == 5){
         toAdd += ". "; 
         toAdd = capitaliseFirstLetter(toAdd);
        }
        if (o == 6){
         toAdd += " here!"; 
         toAdd = capitaliseFirstLetter(toAdd);
        }

        answerInWords += toAdd;
      // }
    }
  }
  return answerInWords;

} 

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function resetAnswers(){
  var i;
  for(i = 0; i < this.items.length; i+=1){
    items[i].selectedOptions = [];
  }

  this.items[0].selectedOptions.push(items[0].categories[1].options[0]);
  this.items[1].selectedOptions.push(items[1].categories[1].options[0]);

}

window.addEventListener('load', function () {
                        new FastClick(document.body);
                        }, false);

function getItemBackgroundCode(itemToCheck){
    if (!itemToCheck.isFilledAsSupposed()){
        return ' style="background-color: rgba(255, 0, 0, .2)" ';
    }
    else{
        return '';
    }
    
}

var homePage = displayHomePage();

// returns html for an item to be displayed on the main page
// <div class="question-container">
//                <div class="question">When?</div> 
//                <div class="answer"> 
//                    <span class="answer-text"> now </span> 
//                      <span class="placeholder"></span>;
//            </div>
//            </div>

// Item to display, N of Item
function displayItem(itemTD, itemN){
    var itemCode = "";
    itemCode += ' <a href="#question' + itemN +'" class="question-container'; 
    if (!itemTD.isFilledAsSupposed()){
      itemCode += ' no-answer';
    }
    itemCode += '">'+
                '<div class="question">'+ itemTD.question+'</div> '+
                '<div class="answer"> '+
                ' <span class="answer-prompt"> '+itemTD.prefix+'</span>';
                if(itemTD.selectedOptions.length > 0){
                  // There's a value! Show value
                  itemCode += '<span class="answer-text"> '+itemTD.getInWords()+' </span>'
                }
                else{
                  // There's no value! Show playsholder
                  itemCode += '<span class="placeholder"></span>';
                }
    itemCode +=
            '</div>'+
            '</a>';
    return itemCode;
}

function displayHomePage(){

    var homePageCode = '<div>'+
      '<header>'+ //&#8617; &larr;
            '<a href="#login" class="adj-button arrow-button arrow-button-left">&ensp;&larr;&ensp;</a>' + 
            '<div class="header-text">How do you feel?</div>'+
        '</header>'+
        '<div class="content">';

  //alert(homePageCode + ' length: ' + items.length);
    var ii = 0;
    for(ii = 0; ii < items.length; ii+=1){
      // alert(ii + homePageCode);
      homePageCode += displayItem(items[ii], ii);
    }      

    // '<div>' +
    // '<div class="header"><h1> <div class="WHAT"> How do you feel?</div></h1></div>' +
    //    '<div class="buttonstyle"><span class="OKtext"> button</span></div>' +
    // '<div class="scroller">' +
    // //        '<button type="button" class="btn btn-default btn-lg" id="buttonID11" onclick="onchangeinput();">qwer</button> ' +
    // //        '<button type="button" class="btn btn-default btn-lg" id="buttonID11" onclick="onchangeinput();">qwet</button> ' +
    // '<ul class="nav nav-pills nav-stacked">' +
    // '<li><a href="#page1"><strong>'+items[0].getInWords()+'</strong></a></li>' +
    // //                '<li><a href="#page1">'+items[0].getInWords()+'</a> <span style="float:right;">a</span></li>' +
    
    // '<li><a href="#page2"><strong>' + items[1].getInWords() + '</strong></a></li>' +
    // '<li' + getItemBackgroundCode(items[2]) + '><a href="#page3"><strong>'+ items[2].getInWords() +'</strong></a></li>' +
    // '<li' + getItemBackgroundCode(items[3]) + '><a href="#page4"><strong>'+ items[3].getInWords() +'</strong></a></li>' +
    // '<li' + getItemBackgroundCode(items[4]) + '><a href="#page5"><strong>'+ items[4].getInWords() +'</strong></a></li>';
    // homePageCode +=        '</ul>';
    
    // end of content div
    homePageCode += '</div>';

    homePageCode += '<footer>';
    if (isEverythingFilled()){
        homePageCode += '<button class="adj-button submit-button" id="buttonsubmitid" onclick="onsubmitbutton();">Send it!</button>';
        // homePageCode += '<button type="button" class="btn btn-warning btn-lg btn-block" id="buttonsubmitid" onclick="onsubmitbutton();">Submit feedback!</button>';
    }
    else{
        homePageCode += '<button class="adj-button submit-button disabled" id="buttonsubmitid" onclick="onsubmitbutton();">Send it!</button>';
      
        // homePageCode += '<button type="button" class="btn btn-warning btn-lg btn-block btn-disabled" disabled id="buttonsubmitid" onclick="onsubmitbutton();">Submit feedback!</button>';
    }
        
    homePageCode += '</footer> </div>';
    
    return homePageCode;
}


function displayLogin(){

  var pageLoginCode = '<div>';
  pageLoginCode +=
          '<header>'+
            // '<div class="header-text">Welcome to YouSense!</div>'+
            '<img src="res/YouSense_Logo.png" alt="Logo" style="margin: 10px 10px 10px 20px"width="300px"> </img>' + 
        '</header>'+
        '<div class="content">'+
            '<div class="sentense-container">'+
            // '<span class="text login">Welcome to YouSense! </span><br></br>'+
            // '<p> Thank you for using YouSense! </p>'+
                '<span class="text login">'+
                    'Your name: '+
                '</span>'+
                '<input onchange="onInputChanged()" autocomplete="off" autocorrect="off" spellcheck="false" id="idInputName" value="' + UserName + '"></input>'+
                // '<span class="text login">'+
                //     'Your office room number:  '+
                // '</span>'+
                // '<input onchange="onInputChanged()" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" id="idInputRoomNumber" value="' + UserRoom + '"></input>'+
                //type="number"
            '</div>';
            // <div class="adj-section">
            //     <button class="adj-button">2345</button>
            // </div>
            // <div class="separator">
            // </div>
            // <div class="adj-section">
            //     <button class="adj-button">3282</button>
            // </div>
        pageLoginCode += 
        '<footer>'+
            // '<div class="separator">'+
            // '</div>'+
            '<a href="#" id="buttonsubmitusername" onclick="onsaveusername();" class="adj-button submit-button">Start sensing!</a>'+
        '</footer>'+
        '</div>';
      return pageLoginCode;
}

// Called when one of the imputs gets changed
function onInputChanged(){
  
  var buttonSubmitUser = document.getElementById('buttonsubmitusername');

  if (buttonSubmitUser != null){
    if (isFieldsFIlled()){
      // Change style of the button
      buttonSubmitUser.className = buttonSubmitUser.className.replace(/\bdisabled\b/,'');
      buttonSubmitUser.setAttribute("href","#");
    }
    else{
      // Should have disabled style
      // Add disabled style if needed
      buttonSubmitUser.className = buttonSubmitUser.className.replace(/\bdisabled\b/,'');
      buttonSubmitUser.className += " disabled";
      buttonSubmitUser.setAttribute("href","#login");
    } 
  }
}

function isFieldsFIlled () {
  var inputName = document.getElementById('idInputName');
  var inputRoom = document.getElementById('idInputRoomNumber');
  
  if (inputName != null){// && (inputRoom != null)){
    if(inputName.value != "" ){//&& inputRoom.value!=""){
      // Enable button 
        return true;
    }
  }
  return false;
}

// Saves username and userroom
// Proceeds to the next screen
function onsaveusername(){

  // Only if fields are filled
  if (isFieldsFIlled()){
    var inputName = document.getElementById('idInputName');
    var inputRoom = document.getElementById('idInputRoomNumber');
    
    if (inputName != null){
      UserName = inputName.value;
      window.localStorage.setItem("YouSenseUserName", UserName);
    }
    if (inputRoom != null){
      UserRoom = inputRoom.value;
      window.localStorage.setItem("YouSenseUserRoom", UserRoom);
    }
    else{
      UserRoom = UserRoomDefault;
      window.localStorage.setItem("YouSenseUserRoom", UserRoomDefault);
    }

    // Send username to the server
    var submission = 'http://yousense.aalto.fi/icqa/adduser?user=' + encodeURIComponent(UserName)  
    + '&location='  + encodeURIComponent(UserRoom);

//    alert(submission);
      // SUBMITTOSERVER
      var req = new XMLHttpRequest();
      req.open ("GET", submission);
      req.send(null);

//    window.location.href = "";
  //  route();
  }
}


var slider = new PageSlider($("#container"));
$(window).on('hashchange', route);


// e - element that was clicked
var ePrevious = ""; // previosly clicked element 
function onbuttonclicked(e, clickedItemNumber, clickedCategoryNumber, ClickedOptionNumber){
	var itemIsAt = isThisOptionSelected (clickedItemNumber, clickedCategoryNumber, ClickedOptionNumber);
	if (itemIsAt >= 0){
		// This item is already selected
		// Remove item from selected
		// 11 22 33 -> 33 22 11 -> 33 22  
		var lastItem = this.items[clickedItemNumber].selectedOptions.length - 1;
		// Put the last item to the itemIsAt place
		this.items[clickedItemNumber].selectedOptions[itemIsAt] = 
		this.items[clickedItemNumber].selectedOptions[lastItem];
		
		// Remove the last one
		this.items[clickedItemNumber].selectedOptions.pop();
		
		// Update style and sentense
	  updateDetailsSentence(clickedItemNumber);
	    
	    // Change the style back
      // Remove selected class
    e.className = e.className.replace(/\bbutton-selected\b/,'');

		
	}	
	else{
		// Item is not in selected
		if (this.items[clickedItemNumber].isOnlyOneSelected){
      // Need to delect the prev. one then
// alert("again" + ePrevious);
      //Style
      if (ePrevious != ""){
        // alert(ePrevious);
        document.getElementById(ePrevious).className = document.getElementById(ePrevious).className.replace(/\bbutton-selected\b/,'');
      }
      this.items[clickedItemNumber].selectedOptions.pop();

    }
		// Select it
		
		
		// Update style and sentense
		 
	    this.items[clickedItemNumber].selectedOptions.push(items[clickedItemNumber].categories[clickedCategoryNumber].options[ClickedOptionNumber]);

      // Add selected
      e.className += " button-selected";
      ePrevious = e.id;
      // alert(ePrevious + ' dd' + e.id);
    	updateDetailsSentence(clickedItemNumber );
    	
    }
	

    //    alert('Hello from input' + clickedItemNumber + clickedCategoryNumber + ClickedOptionNumber);
    //

}


//Gets Locations
//   $().ready(function () {
//   var url = 'http://54.246.92.117/icqa/location/all&jsonp=?';

//   $.get(url, function (location) {
//     alert('ok');// can use 'data' in here...
//   });
// });

  // var myurl = 'http://wikidata.org/w/api.php?action=wbgetentities&sites=frwiki&titles=France&languages=zh-hans|zh-hant|fr&props=sitelinks|labels|aliases|descriptions&format=json';
  // var myurl = 'http://54.246.92.117/icqa/location/all';
 // $.ajax({
 //   dataType: "application/json",
 //   url: myurl ,
 //   }).done(function ( data ) {
 //   alert ('!!');
 // });

 //  $.ajax({
 //  dataType: "applicatino/json",
 //  url: myurl + '&callback=?',
 //  }).done(function ( data ) {
 //  alert ('!!');// do my stuff
 // });

 
// $.getJSON( myurl, function(data) {
//   alert ('!!'); // do my stuff
// });


  // function getLocations(){
//   var req = new XMLHttpRequest;  
//   //req.overrideMimeType("application/json");  
//   req.open('GET', 'http://54.246.92.117/icqa/location/all', true);  
// req.onreadystatechange = function (aEvt) {
//   if (req.readyState == 4) {
//      if(req.status == 200)
//       alert(req.responseText);
//      else
//       alert("Error loading page\n");
//   }
// };  // var target = this;  
//   // req.onload  = function() {target.parseJSON(req, url)};  
//   req.send(null);
// }
  function parseJSON(req, url) {  
  if (req.status == 200) {  
      var jsonResponse = JSON.parse(req.responseText);
      alert(jsonResponse);
  }
}

// Sends JSON to the server
function onsubmitbutton(){
    if (isEverythingFilled()){
      // Yes everything is filled as supposed
      // Submit

      var objectToSubmit = {
        Experiencer: UserName, 
        RelativeTime: items[0].selectedOptionsToArray().join(), //When?
        Location:items[1].selectedOptionsToArray(),  // Where?
        Activity:items[2].selectedOptionsToArray(), // Activity
        EventExperience:items[3].selectedOptionsToArray(),//["Cold", "Dry", "Dark"], //What?
        Reason:items[4].selectedOptionsToArray(),
        FollowingAction:items[5].selectedOptionsToArray(),//["Open window", "Sit down"],
        FeelingIntensity:["3", "2", "1"], 
        Overall:"5",
        OverallInText:encodeURIComponent(items[6].selectedOptionsToArray()),
        WholeSentenceInText:getAnswerInWords(),
        FeedbackSource:"1"// DFw
        };

      var submission = 'http://yousense.aalto.fi/icqa/feedback?json=' + JSON.stringify(objectToSubmit);
      // alert(submission);
        
      // SUBMITTOSERVER
      var req = new XMLHttpRequest();
      req.addEventListener("load", requestComplete, false);
      req.addEventListener("error", requestFailed, false);
      req.addEventListener("abort", requestFailed, false);
      req.open ("GET", submission);
      console.log('data = ', getAnswerInWords());
      req.send(null);

      // new Messi('Here\'s what we received from you:'+ 
      //   '<br></br> \"'  + getAnswerInWords() + '\"', {title: 'THANKS ' + UserName.toUpperCase() + '!', modal: true, width: '250px',autoclose:3000});
      // WEB VERSION
      // new Messi('Here\'s what we received from you:'+ 
      //   '<br></br> \"'  + getAnswerInWords() + '\"', {title: 'THANKS ' + UserName.toUpperCase() + '!', center: false, modal: true, width: '250px', viewport: {top: '10%', left: '20%'}});
    }
}
//add a new style 'foo'
$.notify.addStyle('foo', {
  html: 
    "<div>" +
      "<div class='clearfix'>" +
        "<div class='title' data-notify-html='title'/>" +
        "<div class='text' data-notify-html='text'/>" +
      "</div>" +
    "</div>"
});
$.notify.addStyle('foo2', {
  html: 
    "<div>" +
      "<div class='clearfix'>" +
        "<div class='title' data-notify-html='title'/>" +
        "<div class='text' data-notify-html='text'/>" +
      "</div>" +
    "</div>"
});
function requestComplete (evt){
  // $.notify("THANKS " + UserName.toUpperCase()+ "! Here \'s what you sent: " + getAnswerInWords(), "success");
    $.notify(
  {
    title: "THANKS, " + UserName.toUpperCase()+ "!",
    text: "Here \'s what you sent: " + getAnswerInWords(),
    }, 
    { style: 'foo2',
    localPosition: 'top center',
    autoHide: true,
    autoHideDelay: 6000,
    clickToHide: true
    });

  resetAnswers();
  route();
}
var errortextt;
function requestFailed (evt){
  errortextt = evt;
  //$.notify("HEY " + UserName.toUpperCase()+ "! Something went wrong and we are fixing it now!" + evt, "error");
 // $(".buttonsubmitid").notify(
  $.notify(
  {
    title: "HEY, " + UserName.toUpperCase()+ "!",
    text: "Something went wrong and your feedback was not saved properly. We are fixing it now!"
    }, 
    { style: 'foo',
    localPosition: 'top center',
    autoHide: true,
    autoHideDelay: 6000,
    clickToHide: true
    });

resetAnswers();
  route();
}


function getUpdatedDetailsSentence(openItemID){
   var headerCode = "";
        // shows the sentence
        var jj;
        for(jj = 0; jj < this.items.length; jj+=1){
          var itemText = this.items[jj].prefix + " ";
          if (this.items[jj].selectedOptions.length>0 ){
              itemText += this.items[jj].getInWords() + " ";
          }
          else{
              itemText += ' <span class="placeholder"></span>';
          }
          if (jj == openItemID){
              // this item is the one being edited
              // Apply style
              headerCode += '<span class="selected"> ' + itemText + '</span>';
          } 
          else{
              headerCode += itemText; 
          }
            
        }
        return headerCode;
}

function updateDetailsSentence(openItemID){
    var headerNode = document.getElementById("detailspageheaderid");
    if (headerNode){
        headerNode.innerHTML = getUpdatedDetailsSentence(openItemID);
    }     
}

// Shows options as buttons
function displayOptionsPage(itemNumber) {
    var pageCode = "";
///// *************** Copied text ****************
    pageCode += '<div>' +
        '<header>' + 
            '<a href="#" class="adj-button arrow-button arrow-button-right">&ensp;&#10003;&ensp;</a>' + 
            '<div class="header-text">'+items[itemNumber].question+'</div>' + 
        '</header>' + 
        '<div class="content">' + 
            '<div class="sentense-container">' + 
                '<span class="text" id="detailspageheaderid">' +getUpdatedDetailsSentence(itemNumber)+'</span>' + 
            '</div>';

    pageCode +='<div class="separator"> </div>' + 
              '<div class="input-container"><input onchange="onOwnOptionChanged('+itemNumber + ');" autocomplete="off" autocorrect="off" '+
          'spellcheck="false" id="idInputOwn" placeholder="ENTER OWN WORDS HERE"></input></div>'+
          '<div class="separator"> </div>' + 
          // hidden placeholer for own category
          '<div id="hidden-category"></div>';

    
///// *************** End of copied text ****************

//     pageCode =     '<div>' +
//     '<div class="header"><h2 style="display:inline;" id="detailspageheaderid"><a href="#" style = "display:inline; " class="btn btn-warning btn-lg">Back</a>'+
// //        '<div class="header"><h2 id="detailspageheaderid"><a href="#" class="backbutton">Back</a>'+
//     //<a href="#" class="btn btn-large disabled">Link</a>
//     //<a type="button" href="#" class="btn btn-primary">Back</a><h2 id="detailspageheaderid">
//     showEverythingInWords()+'</h2></div>' +
    
//     '<div class="scroller">' +
//     '<div class="robot">';
    
    // Show all options
    // TODO: show category's captions and background
    // now just iterate through all
    var k;
    for(k = 0; k < items[itemNumber].categories.length; k+=1)
    {
      // If there are any categoried to dispay
      pageCode += displayCategory(itemNumber, k);

    }
    // End of he content div
        pageCode += '</div>';

       /*              FOOTER          */
        pageCode +='<footer>' + 
            // '<div class="separator"></div>' + 
//                         '<button class="adj-button">Enter own</button>' + 
          '<button style="visibility:hidden"></button>'+

        '</footer></div>';

    return pageCode;
}

function displayCategory(itemNumber, categoryToDispNumber){
  var categoryCode = "";
        if (items[itemNumber].categories[categoryToDispNumber].options.length > 0){
        var j;
        // Add section 
        categoryCode += '<div class="adj-section">'

        for(j = 0; j < items[itemNumber].categories[categoryToDispNumber].options.length; j+=1){
            
            // Item we currently worcategoryToDispNumber with
            var currentOption = items[itemNumber].categories[categoryToDispNumber].options[j];
            // !!! Iterate through all (!!!) categories and options; get ones that are selected and show them in other color!
            var buttonID = "buttonId" + categoryToDispNumber + "_" + j;
            //pageCode += '<button type="button" class="btn btn-default btn-lg" id="buttonID11" onclick="onchangeinput();">qwer</button> ';
            //class="adj-button"
            categoryCode += '<button id ="' +buttonID + '" type="button" class="adj-button';
                            
//            buttonID = '#' + buttonID;;
            //buttonID = '#buttonId0';
            // check if an option is selected

            var itemIsAt = isThisOptionSelected (itemNumber, categoryToDispNumber, j);
            
            if (itemIsAt >= 0){
              // is selected
              // Add style
              categoryCode += ' button-selected"';
              ePrevious = buttonID;

                          }
            else{
             categoryCode += '"';
            }

            if (items[itemNumber].selectedOptions[0] == currentOption){
                // Selected
                // pageCode += 'btn-default';
            }
            else{
                // Not selected

                // // Positiveness
                // if (currentOption.positiveness > 0){
                //     // Positive option
                //     pageCode += 'btn-success';
                // }
                // else if (currentOption.positiveness < 0){
                //     // Negative option
                //     pageCode += 'btn-danger';
                // }
                // else{
                //     // Neutral
                //     pageCode += 'btn-info';
                // }
            }
            categoryCode += 'onclick="onbuttonclicked(this, '+itemNumber + ',' +categoryToDispNumber + ',' + j + ');">' + currentOption.title+ '</button>';
        }
        // End of the section
        categoryCode += '</div>';
        // Separator
        categoryCode += '<div class="separator"> </div>';
      }

      return categoryCode;
}

function onOwnOptionChanged (itemNumber) {
  var inputOwnOption = document.getElementById('idInputOwn');
  
  if (inputOwnOption != null){
    if(inputOwnOption.value != "" ){
      // Added
      // Add new oprion to the Own Category ()    
      var categoryToAdd = items[itemNumber].categories[0];
      categoryToAdd.options.push(new Option(inputOwnOption.value, []));
      items[itemNumber].selectedOptions.push(categoryToAdd.options[categoryToAdd.options.length-1]);

      // Set the value back to empty
      inputOwnOption.value = "";

      //displayCategory(itemNumber, categoryToDispNumber);
      // Get own category div:
      var ownCategoryDiv = document.getElementById('hidden-category');
      ownCategoryDiv.innerHTML = displayCategory(itemNumber, 0);

      updateDetailsSentence(itemNumber);
    }
    else{
      var categoryN = items[itemNumber].categories[0];
      var itemNN = categoryN.options.length-1;
      
    var itemIsAt = isThisOptionSelected (itemNumber, 0, itemNN);
    if (itemIsAt >= 0){
      // This item is already selected
      // Remove item from selected
      // 11 22 33 -> 33 22 11 -> 33 22  
      var lastItem = this.items[itemNumber].selectedOptions.length - 1;
      // Put the last item to the itemIsAt place
      this.items[itemNumber].selectedOptions[itemIsAt] = 
      this.items[itemNumber].selectedOptions[lastItem];
      
      // Remove the last one
      this.items[itemNumber].selectedOptions.pop();

}
  
    
    categoryN.options.pop();

    updateDetailsSentence(itemNumber);

    }
  }
  
}

function enterRouting(event){
  // Check if user logged in
    UserName = window.localStorage.getItem("YouSenseUserName");
    UserRoom = window.localStorage.getItem("YouSenseUserRoom");
    
    if (UserName == null){
      UserName = "";
      UserRoom = "";
      window.location.href = "#login";
    }
    else {
      route(event);
    }
}
// Basic page routing
function route(event) {
    // hash = #page1
    var page,
    hash = window.location.hash;
    
    if (hash == "#login"){
      // Route log in page
        page = displayLogin();
    }
    else{

    
    // Get the number out of it: get number as a string and then parse it into int (base 10, not 8 :)
    var pageNum = parseInt(hash.replace( /^\D+/g, ''),10);

    // getLocations();
    // UserName = window.localStorage.getItem("YouSenseUserName");
    // UserRoom = window.localStorage.getItem("YouSenseUserRoom");
    
    // if (UserName == null){
    //   $window.location.href = "#login";
    //   page = displayLogin();
    // }
    // else 
    if (pageNum>=0){
        page = displayOptionsPage(pageNum);
    }
    else{ 
      page = displayHomePage();
    }
  }
    zoomScreen();
    slider.slidePage($(page));   
    onInputChanged();
}

enterRouting();
