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

    var template = imports('components/settings/template.html');
    var style = imports('components/settings/style.scss');
    var burgerStyle = imports('components/settings/burger.scss');

    return function (config) {

        var c = Component({
            template: template,
            style: style + ' ' + burgerStyle,
            config: config
        });

        var userID;
        var isOn = false;

        c.toggleBurger = function () {
            if (isOn) {
                c.get('burger').removeClass('open');
            } else {
                c.get('burger').addClass('open')
            }
            isOn = !isOn;
            Bus.fire('burgerToggle', isOn);
        };

        c.emailSignUp = function (e) {
            e.preventDefault();
            firebase.auth().createUserWithEmailAndPassword(c.get('email').value, c.get('password').value)
                .then(function (data) {
                    console.log(data)
                }).catch(function () {
                Bus.fire('showError', {
                    message: 'riprova un altro momento. il servizio di iscrizione e\' momentaneamento sospeso'
                })
            });
        };

        c.emailSignIn = function (e) {
            e.preventDefault();
            firebase.auth().signInWithEmailAndPassword(c.get('email').value, c.get('password').value)
                .then(function (data) {
                    console.log(data)
                }).catch(function () {
                Bus.fire('showError', {
                    message: 'riprova un altro momento. il servizio di accesso e\' momentaneamento sospeso'
                })
            });
        };

        return c;

    }

}
