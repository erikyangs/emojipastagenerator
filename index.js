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
             output += " " + emoji.char;
        }
    }
    return output;
}

//inclusive min, exclusive max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//emoji translation
//emojilib: https://raw.githubusercontent.com/muan/emojilib/master/emojis.json
var emojisReady = false;
var emojiMappings;
$(document).ready(function() {
    $.get("https://raw.githubusercontent.com/muan/emojilib/master/emojis.json", function(data, status) {
        parseJSON(data);
        emojisReady = true;
    });
});

function parseJSON(data) {
    emojiMappings = JSON && JSON.parse(data) || $.parseJSON(data);
}
