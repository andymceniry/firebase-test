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
            $('#log').removeClass('hide');
            console.log('phonegap loaded');
        }
        
        oApp.initFirebase();
        oApp.checkAuth();

    };

    oApp.initFramework = (function () {
        document.addEventListener('deviceready', oApp.initApp, false);
    }());

    oApp.initFirebase = function () {
        console.log('initFirebase');
        var config = {
            apiKey: "AIzaSyBpnArTxWPmqfAkAETrZD6GCLCohFFNH6Y",
            authDomain: "fir-test-f461d.firebaseapp.com",
            databaseURL: "https://fir-test-f461d.firebaseio.com",
            storageBucket: "fir-test-f461d.appspot.com",
            messagingSenderId: "584262174821"
        };
        console.log(config);
        console.log(firebase.SDK_VERSION);
        firebase.initializeApp(config);

    };

    $('#signInWithGoogle').click(function () {
        console.log('signInWithGoogle');
        var provider = new firebase.auth.GoogleAuthProvider();
        console.log(provider);

        // firebase.auth().signInWithPopup(provider).then(function (result) {
            // console.log(result);
            // if (result.credential) {
                // var token = result.credential.accessToken;
                // $('body').append('<img src="' + result.user.photoURL + '" style="width:200px;margin:10px;">');
                // $('body').append('<p>' + result.user.displayName + '</p>');
            // }
            // var token = result.credential.accessToken;
            // var user = result.user;
        // }).catch(function(error) {
            // console.log(error.message);
            // console.log(error);

        // });

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
            console.log(error.message);
            console.log(error);
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