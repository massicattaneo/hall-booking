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

    var template = imports('components/info/template.html');
    var style = imports('components/info/style.scss');

    return function (config) {

        var info = Component({
            template: template,
            style: style,
            config: config
        });

        info.init = function () {
            info.toggle(false);
        };

        info.toggle = function (showInfo) {
            info.get('more').style.display = showInfo ? 'block' :'none';
        };


        return info;

    }

}
