/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: controller
 Created Date: 14 July 2016
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

function bookings(imports) {
    var template = imports('components/bookings/bookingTemplate.html');

    return function (config) {
        var c = {};

        var obj, events;
        c.init = function () {
            obj = this;
        };

        c.print = function () {
            Bus.fire('adminPrintList');
        };

        return c;
    }

}
