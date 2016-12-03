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

    var template = imports('components/header/template.html');
    var style = imports('components/header/style.scss');

    return function (config) {

        var c = Component({
            template: template,
            style: style,
            config: config
        });

        c.switchInfo = function () {
            Bus.fire('switchInfo');
        };

        c.toggleInfo = function (info) {
            this.get('buttonSwitch').setInnerText(info ? config.hallLabel : config.infoLabel)
        };

        return c;

    }

}
