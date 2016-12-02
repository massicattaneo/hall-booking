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
    }
    
}
