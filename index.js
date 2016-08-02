/*======================================================================*/
/*AngularJS*/
var SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~ \n\\';

// Define the shitpost module
var shitpost = angular.module('shitpost', []);

shitpost.controller('mainController', function mainController($scope) {
    //stores data from textarea from ng-model
    $scope.input = "";

    $scope.convertToEmojipasta = function(input) {
        if (emojisReady && personalEmojisReady) {
            //var wordArray = createWordArray(addPersonalEmojis(input));
            var wordArray = createWordArray(input);
            return wordArrayToEmojipasta(wordArray);
        } else if (pageReady) {
            alert("Emojis may not be loading. Sorry about that. Contact me for fixes.");
        }
    }
});

/*======================================================================*/
/*JQuery*/
//emojilib: https://raw.githubusercontent.com/muan/emojilib/master/emojis.json
//since two files, when it's one it will be true.
var pageReady = false;
var emojisReady = false;
var personalEmojisReady = false;
var emojiMappings;
var personalEmojiMappings;
var emojiRepeatArray;
$(document).ready(function() {
    pageReady = true;

    $.get("https://erikyangs.github.io/emojipastagenerator/emojiMapping.json", function(data, status) {
        //my json doesn't need parsing, emojilib needs parsing.
        emojiMappings = data;
        //parseJSON(data);
        emojisReady = true;
        //modifyEmojiLib(emojiMappings);
    });

    $.get("https://erikyangs.github.io/emojipastagenerator/personalEmojiMapping.json", function(data, status) {
        personalEmojiMappings = wordArrayJSON(lowercaseJSON(data));
        console.log(personalEmojiMappings);
        personalEmojisReady = true;
        //alphabetizeJSON(personalEmojiMappings);
    });

    //textarea resizing with content
    $("#textinput").on('input', function(event) {
        $("#textinput").css("height", "1px");
        var scrollHeight = $("#textinput").prop("scrollHeight");
        var minHeight = $(window).height() * 0.30;
        //if new line
        if (event.keyCode == 13) {
            scrollHeight += 30;
        }
        if (scrollHeight > minHeight) {
            $("#textinput").css("height", scrollHeight);
        } else {
            $("#textinput").css("height", minHeight);
        }
    });

    emojiRepeatArray = getRandomIntArray(50);
});

/*======================================================================*/
/*Emojipasta helper methods*/
//takes input string and makes each word into string
function createWordArray(input) {
    var output = [];
    var currentWord = "";
    for (var i = 0; i < input.length; i++) {
        //if symbol present
        if (SYMBOLS.indexOf(input[i]) > -1) {
            if (currentWord != "") {
                output.push(currentWord);
                currentWord = "";
            }
            output.push(input[i]);
        } else {
            currentWord += input[i];
        }
    }
    //push last word
    if (currentWord != "") {
        output.push(currentWord);
    }
    return output;
}

function wordArrayToEmojipasta(wordArray) {
    var output = "";
    var i = 0;
    while(i < wordArray.length) {
        word = wordArray[i];

        //personalEmojiMappings.json
        var personalEmoji = personalEmojiMappings[word.toLowerCase()];
        if (personalEmoji) {
            output += word;
            output += " " + personalEmoji;
        } //emojiMappings.json
        else {
            output += word;
            var emoji = emojiMappings[word.toLowerCase()];
            if (emoji) {
                var repeat = emojiRepeatArray[i % emojiRepeatArray.length];
                var totalEmoji = "";
                for (var j = 0; j < repeat; j++) {
                    totalEmoji += emoji;
                }
                output += " " + totalEmoji;
            }
        }

        i++;
    }
    return output;
}

/* Deprecated. Replaces every occurence of the word, even within words (e.g. w🍑ass🍑up)
function addPersonalEmojis(input) {
    var result = new String(input);
    var lowercaseInput = input.toLowerCase();
    for (var key in personalEmojiMappings) {
        if (lowercaseInput.includes(key.toLowerCase())) {
            var emoji = personalEmojiMappings[key];
            result = result.replace(new RegExp(key, 'ig'), function(match) {
                return emoji + " " + match + " " + emoji;
            });
        }
    }
    return result;
}*/

/*======================================================================*/
/*General Helper Methods*/
//inclusive min, exclusive max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//random int array of x integers
function getRandomIntArray(x) {
    var result = [];
    for (var i = 0; i < x; i++) {
        result.push(getRandomInt(1, 4));
    }
    return result;
}

/*======================================================================*/
/*Made for updating emojis and testing purposes*/
function parseJSON(data) {
    emojiMappings = JSON && JSON.parse(data) || $.parseJSON(data);
}

//creates a map from words&keywords to emojis from emojis.json
function modifyEmojiLib(x) {
    var output = {};

    for (var key in x) {
        var char = x[key].char;

        //add the key
        if (!(key in output)) {
            output[key] = char;
        }

        var keywords = x[key].keywords;
        for (var i = 0; i < keywords.length; i++) {
            keyword = keywords[i];
            //pairs emoji with first keyword occurrence (for the time being)
            if (!(keyword in output)) {
                output[keyword] = char;
            }
        }
    }
    var str = JSON.stringify(output, null, 4);
    $("#json").text(str);
    return output;
}

//alphabetize the object o
function alphabetizeJSON(o) {
    var sorted = {},
        key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }

    var str = JSON.stringify(sorted, null, 4);
    console.log(str)
    $("#json").text(str);
    return sorted;
}

//makes all keys in object lowercase
function lowercaseJSON(obj) {
    var key, keys = Object.keys(obj);
    var n = keys.length;
    var newobj = {};
    while (n--) {
        key = keys[n];
        newobj[key.toLowerCase()] = obj[key];
    }
    return newobj;
}

//makes keys with more than one word have object values.
function wordArrayJSON(obj){
    var keys = Object.keys(obj);
    var result = {};
    for(var i = 0; i<keys.length; i++){
        var key = keys[i];
        var val = obj[key];
        
        var keyWordArray = key.split(" ");
        if(keyWordArray.length > 1){
            //keys will be the first word
            result[keyWordArray[0]] = {"words":key,"emoji":val};
        }
        else{
            result[key] = val;
        }
    }
    console.log(result);
    return result;
}