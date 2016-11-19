/*global $, Draggable, oAppFunctions, TweenMax*/

var oApp = oApp || {};

(function () {

	'use strict';

    oApp.initApp = function (phonegap) {

        phonegap = phonegap !== false;

        alert(phonegap ? 'App is ready with phonegap' : 'App is ready without phonegap');
    };

    oApp.initFramework = (function () {
        document.addEventListener('deviceready', oApp.initApp, false);
    }());

}());