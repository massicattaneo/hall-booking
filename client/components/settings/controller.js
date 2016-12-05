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

    var template = imports('components/settings/template.html');
    var style = imports('components/settings/style.scss');
    var burgerStyle = imports('components/settings/burger.scss');

    return function (config) {

        var c = Component({
            template: template,
            style: style + ' ' + burgerStyle,
            config: config
        });

        var isOn = false;
        var obj;

        c.init = function () {
            obj = this;
            //obj.get('wrapper').style.display = 'none';
//            obj.get('adminWrapper').style.display = 'none';
        };

        c.toggleBurger = function () {
            if (isOn) {
                obj.get('burger').removeClass('open');
            } else {
                obj.get('burger').addClass('open')
            }
            isOn = !isOn;
            obj.get('wrapper').style.display = isOn ? 'block' : 'none';
            Bus.fire('burgerToggle', isOn);
        };

        c.setBookings = function (array, user) {
            var userId = user.uid;
            var isLogged = userId !== undefined;
            var mines = [];
            obj.get('bookingsWrapper').style.display = isLogged ? 'block' : 'none';
            obj.get('adminWrapper').style.display = user.isAdmin ? 'block' : 'none';
            if (array) {
                array.forEach(function (event, i) {
                    var sits = [];
                    event.bookings.forEach(function (r,ri) {
                        var a  = r.map(function (c,ci) {return {row: ri, col: ci, user: c}})
                            .filter(function (b) {return b.user === userId;});
                        if (a.length) {
                            sits = sits.concat(a);
                        }
                    });
                    if (sits.length) {
                        mines.push({
                            sits: sits,
                            sitsCount: sits.length,
                            title: array[i].title,
                            date: array[i].date.toDate().toFormatString('dd mmmm yyyy'),
                            hour: array[i].hour
                        })
                    }
                });
                obj.get('bookings').setBookings(mines)
            }
        };

        c.autoLogIn = function () {
            obj.get('sign').autoLogIn();
        };

        c.updateAdmin = function (events) {
             obj.get('admin').update(events);
        };

        return c;

    }

}
