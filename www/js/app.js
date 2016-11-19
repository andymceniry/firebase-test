/*global $, Draggable, oAppFunctions, TweenMax*/

var oApp = oApp || {};

(function () {

	'use strict';

    oApp.initApp = function (phonegap) {

        phonegap = phonegap !== false;

        //alert(phonegap ? 'App is ready with phonegap' : 'App is ready without phonegap');

        if (!phonegap) {
            console.log('no phonegap');
        }

        oApp.initFirebase();
        oApp.checkAuth();

    };

    oApp.initFramework = (function () {
        document.addEventListener('deviceready', oApp.initApp, false);
    }());

    oApp.initFirebase = function () {

        var config = {
            apiKey: "AIzaSyBpnArTxWPmqfAkAETrZD6GCLCohFFNH6Y",
            authDomain: "fir-test-f461d.firebaseapp.com",
            databaseURL: "https://fir-test-f461d.firebaseio.com",
            storageBucket: "fir-test-f461d.appspot.com",
            messagingSenderId: "584262174821"
        };
        firebase.initializeApp(config);

    };

    $('#signInWithGoogle').click(function() {
        console.log('signInWithGoogle');
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    });

    oApp.checkAuth = function () {
        console.log('checkAuth');
        firebase.auth().getRedirectResult().then(function(result) {
            console.log(result);
            if (result.credential) {
                var token = result.credential.accessToken;
                $('body').append('<img src="' + result.user.photoURL + '" style="width:200px;margin:10px;">');
                $('body').append('<p>' + result.user.displayName + '</p>');
            }
            var user = result.user;
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    };

}());