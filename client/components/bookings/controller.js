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

    return function () {
        var c = {};

        c.print = function () {
            console.log('print')
        };

        c.delete = function () {
            console.log('delete')
        };

        return c;
    }

}
