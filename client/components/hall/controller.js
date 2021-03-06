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

        var array = [];

        function getStatus(value, user) {
            if (value === 0) return 'free';
            if (value === user) return 'mine';
            return 'booked';
        }

        hall.update = function (hallSet, reservations, userid) {
            var c = Component.get('hallSit');
            var id = 0;
            array.length = 0;
            var container = document.getElementById('hallSits')
            corejs.removeAllChild(container);
            hallSet.forEach(function (sits, row) {
                if (id !== 0) container.appendChild(Element.create('<br/>'));
                sits.forEach(function (number, col) {
                    var comp = corejs.extend(Component({
                        template: c.template,
                        style: c.style,
                        config: {id: id++, number: number, status: getStatus(reservations[row][col], userid)}
                    }), c.controller);
                    comp.createIn(container);
                    array.push(comp);
                })
            })
        };

        hall.showHallSits = function (show) {
            array.forEach(function (c) {
                show ? c.node.removeClass('hidden') : c.node.addClass('hidden');
            });
            document.getElementById('labelStage').setInnerText(show ? 'PALCO' : 'Accedi per prenotare')
        };

        return hall;

    }

}
