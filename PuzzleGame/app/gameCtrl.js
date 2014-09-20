/**
 * Created by Petryxa on 20.09.2014.
 */
(function () {
    'use strict';

    var controllerId = 'gameCtrl';

    angular.module('PuzzleGame').controller(controllerId,['$scope', 'secretService', gameCtrl]);

    function gameCtrl($scope, secret) {
        var vm = this;

        vm.secret = null;
        vm.letters = [];
        vm.letter = null;
        vm.tries = 0;
        vm.maxTries = 0;
        vm.gameState = null;
        vm.message = null;

        vm.states = {
            new: 1,
            won: 2,
            loosed: 3
        };

        $scope.$watch('vm.gameState', function(newVal, oldVal) {
            switch(newVal) {
                case vm.states.new:
                    vm.message = "Try your luck";
                    break;
                case vm.states.loosed:
                    vm.message = "Out of luck :(";
                    break;
                case vm.states.won:
                    vm.message = "Congratulations You are lucky guy!";
                    break;
            }
        });

        vm.endGame = function () {
            if(checkWin())
                vm.gameState = vm.states.won;
            else
                vm.gameState = vm.states.loosed;
        }

        vm.giveUpGame = function () {
            vm.gameState = vm.states.loosed;
            angular.forEach(vm.letters, function(value) {
                 value.guessed = true;
            });
        }

        vm.checkLetter = function () {
            if($scope.letterForm.$valid){
                angular.forEach(vm.letters, function(value) {
                    if(!value.guessed && value.letter === vm.letter)
                        value.guessed = true;
                });
                if(vm.tries >= vm.maxTries - 1){
                    vm.endGame();
                    return;
                }
                vm.tries++;
                vm.letter = null;

                if(checkWin())
                    vm.gameState = vm.states.won;
            }
            else
                alert("Wrong");
        }

        vm.startNewGame = function () {
            vm.secret = null;
            vm.letters = [];
            vm.letter = null;
            vm.tries = 0;
            vm.maxTries = 0;
            init();
        }

        $scope.vm = vm;
        init();

        function init() {
            vm.secret = secret.word;
            if(vm.secret){
                vm.letters = [];
                var letters = vm.secret.split('');
                for(var i =0; i<letters.length; i++){
                    vm.letters.push({
                        id: i,
                        letter: letters[i],
                        guessed: false
                    });
                }
                vm.maxTries = vm.letters.length;
                vm.gameState = vm.states.new;
            }
        }

        function checkWin() {
            var won = true;
            angular.forEach(vm.letters, function(value) {
                if(won && !value.guessed) won = false;
            });
            return won;
        }
    }
})();
