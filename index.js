// Define the `shitpost` module
var shitpost = angular.module('shitpost', []);

shitpost.controller('mainController', function mainController($scope) {
    $scope.input = "";

    $scope.convertToShitpost = function(input) {
        if (emojisReady) {
            if(emojiMappings[input]){
            	return input + emojiMappings[input].char;
            }
            else{
            	return input;
            }
        }
    }
});

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