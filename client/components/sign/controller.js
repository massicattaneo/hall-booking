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
            data = data || {};
            isIt = data.isAnonymous ? false : isIt;
            obj.get('loggedIn').style.display = isIt ? 'block' : 'none';
            obj.get('emailText').setInnerText(isIt ? data.email : '');
            obj.get('loggedOut').style.display = !isIt ? 'block' : 'none';
            if (data.email === 'massi.cattaneo@alice.it') data.isAdmin = true;
            Bus.fire('sign', isIt ? data : {});
        }

        c.init = function () {
            obj = this;
        };

        c.autoLogIn = function () {
            if (firebase.auth().currentUser) {
                logged(true, firebase.auth().currentUser);
            } else {
                firebase.auth().signInAnonymously();
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
                    message: 'Ti abbiamo spedito una mail per reimpostare la password'
                })
            }).catch(function(error) {
                Bus.fire('showError', {
                    message: 'riprova un altro momento. il servizio non e\' momentaneamento disponibile'
                })
            });
        };

        c.emailSignOut = function () {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                logged(false);
            }, function(error) {
                Bus.fire('showError', {
                    message: 'riprova un altro momento. il servizio non e\' momentaneamento disponibile'
                })
            });
        };

        return c;

    }

}
