/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: controller
 Created Date: 14 July 2016
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

function controller(imports) {

    return function () {
        var c = {};
        c.emailSignUp = function (e) {
            e.preventDefault();
            firebase.auth().createUserWithEmailAndPassword(c.get('email').value, c.get('password').value)
                .then(function (data) {
                    console.log(data)
                }).catch(function () {
                Bus.fire('showError', {
                    message: 'riprova un altro momento. il servizio di iscrizione non e\' momentaneamento disponibile'
                })
            });
        };

        c.emailSignIn = function (e) {
            e.preventDefault();
            firebase.auth().signInWithEmailAndPassword(c.get('email').value, c.get('password').value)
                .then(function (data) {

                }).catch(function () {
                Bus.fire('showError', {
                    message: 'riprova un altro momento. il servizio di accesso non e\' momentaneamento disponibile'
                })
            });
        };

        c.emailReset = function () {
            firebase.auth().sendPasswordResetEmail(c.get('email').value).then(function() {
                Bus.fire('showError', {
                    message: 'Le abbiamo spedito una mail per resettare la password'
                })
            }).catch(function(error) {
                Bus.fire('showError', {
                    message: 'riprova un altro momento. il servizio non e\' momentaneamento disponibile'
                })
            });
        };

        return c;

    }

}
