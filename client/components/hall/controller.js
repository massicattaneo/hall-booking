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

    var template = imports('components/hall/template.html');
    var style = imports('components/hall/style.scss');

    return function (config) {

        var hall = Component({
            template: template,
            style: style,
            config: config
        });

        hall.create = function (hallSet, reservations) {
            var c = Component.get('hallSit');
            var id = 0;
            hallSet.forEach(function (sits, row) {
                if (id !== 0) hall.node.appendChild(Element.create('<br/>'));
                sits.forEach(function (number, col) {
                    var comp = Component({
                        template: c.template,
                        style: c.style,
                        config: {id: id++, number: number, status: reservations[row][col] !== 0 ? 'booked' : 'free'}
                    }).extend(c.controller);
                    comp.createIn(hall.node);
                })
            })
        };

        return hall;

    }

}
