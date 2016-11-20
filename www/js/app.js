/*global $, firebase*/

var oApp = oApp || {};

(function () {

	'use strict';

    oApp.initApp = function (phonegap) {

        phonegap = phonegap !== false;

        if (!phonegap) {
            $('#log').remove();
            console.log('no phonegap');
        } else {
            oApp.initLogger();
            console.log('phonegap loaded');
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
        console.log(firebase.SDK_VERSION);
        console.log(config);
        firebase.initializeApp(config);

    };

    $('#signInWithGoogle').click(function () {
        console.log('signInWithGoogle');
        var provider = new firebase.auth.GoogleAuthProvider();
        console.log(provider);

        firebase.auth().signInWithPopup(provider).then(function (result) {
            console.log(result);
            if (result.credential) {
                var token = result.credential.accessToken;
                $('body').append('<img src="' + result.user.photoURL + '" style="width:200px;margin:10px;">');
                $('body').append('<p>' + result.user.displayName + '</p>');
            }
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch(function(error) {
                console.log(error.message);
                console.log(error);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

    });


    oApp.checkAuth = function () {
        console.log('checkAuth');
        firebase.auth().getRedirectResult().then(function (result) {
            console.log(result);
            if (result.credential) {
                var token = result.credential.accessToken;
                $('body').append('<img src="' + result.user.photoURL + '" style="width:200px;margin:10px;">');
                $('body').append('<p>' + result.user.displayName + '</p>');
            }
            var user = result.user;
        }).catch(function (error) {
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

    $('#log').click(function () {
        $(this).toggleClass('open');
    });


    oApp.initLogger = function () {
        console.log = function (item) {
            switch (typeof item) {
            case 'string':
                $('#log').append(item);
                break;
            case 'object':
                $('#log').append(JSON.stringify(item));
                break;
            }
            $('#log').append('<br/>');
        };
    };


}());