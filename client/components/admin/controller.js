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

        c.update = function (evts) {
            events = evts;
            var select = this.get('select');
            corejs.removeAllChild(select);
            evts.forEach(function(e, i) {
                select.appendChild(Element.create('<option selected value="'+ i+'">'+ e.title+'</option>'));
            });
            select.value = 0;
        };

        c.print = function () {

            var b = events[this.get('select').value];
            var doc = new jsPDF();
            doc.text('Lista - Amici del teatro di monticello', 10, 10);

            doc.text('Data:', 10, 35);
            doc.text( b.date, 90, 35);

            doc.text('Ora:', 10, 42);
            doc.text( b.hour, 90, 42);

            doc.text('Spettacolo:', 10, 49);
            doc.text(b.title, 90, 49);

            doc.save('lista' + b.title + '.pdf');

        };

        return c;
    }

}
