/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: bootstrap.js
 Created Date: 14 July 2016
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

function boostrap(imports) {

    var Header = imports('components/header/controller.js');
    var Hall = imports('components/hall/controller.js');
    var config = imports('js/config.json');
    var registerer = imports('js/registerer.js');
    var hallSet = imports('../data/monticello/hallSet.json');
    var reservations = imports('../data/monticello/spettacolo-1.json');


    return function () {
        registerer(config);
        var tickets = [];
        document.body.style.backgroundColor = config['primaryBgColor'];
        var header = Header(config);
        header.createIn(document.getElementById('website'));
        var hall = Hall(config);
        hall.createIn(document.getElementById('website'));
        hall.create(hallSet, reservations);
        Bus.on('sit-change', onSitChange, 1);

        function onSitChange(o) {
            if (o.checked) {
                tickets.push(o.id);
            } else {
                var index = tickets.indexOf(o.id);
                index !== -1 && tickets.splice(index, 1);
            }
        }
    };
}
