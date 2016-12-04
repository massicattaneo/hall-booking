/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: controller
 Created Date: 14 July 2016
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

function sign(imports) {

    return function () {
        var c = {};
        var obj;

        function logged(isIt, data) {
            obj.get('loggedIn').style.display = isIt ? 'block' : 'none';
            obj.get('emailText').setInnerText(isIt ? data.email : '');
            obj.get('loggedOut').style.display = !isIt ? 'block' : 'none';
            Bus.fire('sign', isIt ? data.uid : undefined);
        }

        c.init = function () {
            obj = this;
        };

        c.autoLogIn = function () {
            if (firebase.auth().currentUser) {
                logged(true, firebase.auth().currentUser);
            } else {
                logged(false);
            }
        };

        c.emailSignUp = function () {
            firebase.auth().createUserWithEmailAndPassword(this.get('email').value, this.get('password').value)
                .then(function (data) {
                    logged(true, data);
                }).catch(function () {
                Bus.fire('showError', {
                    message: 'riprova un altro momento. il servizio di iscrizione non e\' momentaneamento disponibile'
                })
            });
        };

        c.emailSignIn = function () {
            firebase.auth().signInWithEmailAndPassword(this.get('email').value, this.get('password').value)
                .then(function (data) {
                    logged(true, data);
                }).catch(function () {
                Bus.fire('showError', {
                    message: 'riprova un altro momento. il servizio di accesso non e\' momentaneamento disponibile'
                })
            });
        };

        c.emailReset = function () {
            firebase.auth().sendPasswordResetEmail(this.get('email').value).then(function() {
                Bus.fire('showError', {
                    message: 'Le abbiamo spedito una mail per resettare la password'
                })
            }).catch(function(error) {
                Bus.fire('showError', {
                    message: 'riprova un altro momento. il servizio non e\' momentaneamento disponibile'
                })
            });
        };

        c.emailSignOut = function () {
            firebase.auth().signOut();
            logged(false);
        };

        return c;

    }

}
