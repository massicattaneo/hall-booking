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

        c.init = function () {
            c.get('wrapper').style.display = 'none';
        };

        c.toggleBurger = function () {
            if (isOn) {
                c.get('burger').removeClass('open');
            } else {
                c.get('burger').addClass('open')
            }
            isOn = !isOn;
            c.get('wrapper').style.display = isOn ? 'block' : 'none';
            Bus.fire('burgerToggle', isOn);
        };

        return c;

    }

}
