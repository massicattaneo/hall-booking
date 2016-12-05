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

        info.update = function (data) {
            info.get('title').setInnerText('"' + data.title + '"');
            info.get('date').setInnerText(data.date.toDate().toFormatString('dddd dd mmmm yyyy'));
            info.get('hour').setInnerText(data.hour);
            info.get('author').setInnerText(data.author);
            info.get('address').setInnerText(data.address);
            info.get('group').setInnerText(data.group);
            info.get('note').setInnerText(data.note);
        };


        return info;

    }

}
