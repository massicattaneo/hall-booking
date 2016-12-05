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

        function fireBaseError(e) {
            console.log(e);
            var message = 'riprova un altro momento. il servizio di iscrizione non e\' momentaneamento disponibile';
            switch (e.code) {
                case 'auth/email-already-in-use':
                    message = 'L\'indirizzo di posta è già in uso da un altro utente'; break;
                case 'auth/wrong-password':
                    message = 'La password non è valida'; break;
                case 'auth/invalid-email':
                    message = 'L\'email è in un formato invalido'; break;
                case 'auth/user-not-found':
                    message = 'Non c\'è nessun utente collegato a questo indirizzo email'; break;
                case 'auth/weak-password':
                    message = 'La password deve avere almeno 6 caratteri'; break;
            }
            Bus.fire('showError', {
                message: message
            })
        }

        c.emailSignUp = function () {
            firebase.auth().createUserWithEmailAndPassword(this.get('email').value, this.get('password').value)
                .then(function (data) {
                    logged(true, data);
                }).catch(function (e) {
                    fireBaseError(e)
            });
        };

        c.emailSignIn = function () {
            firebase.auth().signInWithEmailAndPassword(this.get('email').value, this.get('password').value)
                .then(function (data) {
                    logged(true, data);
                }).catch(function (e) {
                    fireBaseError(e)
            });
        };

        c.emailReset = function () {
            firebase.auth().sendPasswordResetEmail(this.get('email').value).then(function() {
                Bus.fire('showError', {
                    message: 'Ti abbiamo spedito una mail per reimpostare la password'
                })
            }).catch(function(e) {
                fireBaseError(e)
            });
        };

        c.emailSignOut = function () {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                logged(false);
            }, function(e) {
                fireBaseError(e)
            });
        };

        return c;

    }

}
