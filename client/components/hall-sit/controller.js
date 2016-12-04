/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: controller
 Created Date: 14 July 2016
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

function controller() {

    return function () {
        var c = {};
        c.init = function () {
            if (this.config.status === 'booked') {
                this.get('input').checked = true;
                this.get('input').setAttribute('disabled', 'disabled');
            }
            if (this.config.status === 'mine') {
                this.get('input').checked = true;
            }
        };

        c.sitClicked = function () {
            Bus.fire('sit-change',
                {id: this.config.id, checked: this.get('input').getValue()});
        };

        return c;
    }

}
