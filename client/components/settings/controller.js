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

        var isOn = false;
        var obj;

        c.init = function () {
            obj = this;
            obj.get('wrapper').style.display = 'none';
        };

        c.toggleBurger = function () {
            if (isOn) {
                obj.get('burger').removeClass('open');
            } else {
                obj.get('burger').addClass('open')
            }
            isOn = !isOn;
            obj.get('wrapper').style.display = isOn ? 'block' : 'none';
            Bus.fire('burgerToggle', isOn);
        };

        c.showBookings = function (isLogged) {
            obj.get('bookings').style.display = isLogged ? 'block' : 'none';
        };

        c.autoLogIn = function () {
            obj.get('sign').autoLogIn();
        };

        return c;

    }

}
