/**
 * Created by max on 02/12/16.
 */

function registerer(imports) {
    var buttonController = imports('components/button/controller.js');
    var buttonTemplate = imports('components/button/template.html');
    var buttonStyle = imports('components/button/style.scss');

    var hallSitController = imports('components/hall-sit/controller.js');
    var hallSitTemplate = imports('components/hall-sit/template.html');
    var hallSitStyle = imports('components/hall-sit/style.scss');

    var signController = imports('components/sign/controller.js');
    var signTemplate = imports('components/sign/template.html');
    var signStyle = imports('components/sign/style.scss');

    var bookingsController = imports('components/bookings/controller.js');
    var bookingsTemplate = imports('components/bookings/template.html');
    var bookingsStyle = imports('components/bookings/style.scss');

    var adminController = imports('components/admin/controller.js');
    var adminTemplate = imports('components/admin/template.html');
    var adminStyle = imports('components/admin/style.scss');


    return function (config) {
        /** BUTTON **/
        Component.register({
            name: 'button',
            controller: buttonController(),
            template: buttonTemplate,
            style: buttonStyle,
            config: config
        });

        /** HALL-SIT **/
        Component.register({
            name: 'hallSit',
            controller: hallSitController(),
            template: hallSitTemplate,
            style: hallSitStyle,
            config: config
        });

        Component.register({
            name: 'sign',
            controller: signController(),
            template: signTemplate,
            style: signStyle,
            config: config
        });

        Component.register({
            name: 'bookings',
            controller: bookingsController(),
            template: bookingsTemplate,
            style: bookingsStyle,
            config: config
        });

        Component.register({
            name: 'admin',
            controller: adminController(),
            template: adminTemplate,
            style: adminStyle,
            config: config
        });

    }
}
