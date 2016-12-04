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

        c.setBookings = function (bookings) {
            var container = document.getElementById('bookingsContainer');
            corejs.removeAllChild(container);
            bookings.forEach(function (b) {
                var comp = corejs.extend(Component({
                    style: '',
                    template: template,
                    config: b
                }), {
                    print: function() {
                        Bus.fire('print', b);
                    }
                });

                comp.createIn(container);
            })
        };

        return c;
    }

}
