/*======================================================================*/
/*AngularJS*/
var SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~ \n\\';

// Define the shitpost module
var shitpost = angular.module('shitpost', []);

shitpost.controller('mainController', function mainController($scope) {
    //stores data from textarea from ng-model
    $scope.input = "";

    $scope.convertToShitpost = function(input) {
        if (emojisReady) {
            var wordArray = createWordArray(input);
            return wordArrayToShitpost(wordArray);
        }
    }
});

/*======================================================================*/
/*Emojipasta helper methods*/
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

function wordArrayToShitpost(wordArray) {
    var output = "";
    for (var i = 0; i < wordArray.length; i++) {
        word = wordArray[i];
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
    return output;
}

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
/*JQuery*/
//emojilib: https://raw.githubusercontent.com/muan/emojilib/master/emojis.json
var emojisReady = false;
var emojiMappings;
var emojiRepeatArray;
$(document).ready(function() {
    $.get("https://erikyangs.github.io/emojipastagenerator/emojiMapping.json", function(data, status) {
        //my json doesn't need parsing, emojilib needs parsing.
        emojiMappings = data;
        //parseJSON(data);
        emojisReady = true;
        //modifyEmojiLib(emojiMappings);
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
}
