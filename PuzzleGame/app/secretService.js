(function () {
    'use strict';

    var serviceId = 'secretService';

    angular.module('PuzzleGame').factory(serviceId, [secretService]);

    function secretService() {

        var service = {
            word: "angular"
        };

        return service;
    }
})();