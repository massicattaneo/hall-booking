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
    var Settings = imports('components/settings/controller.js');
    var Info = imports('components/info/controller.js');
    var config = imports('js/config.json');
    var registerer = imports('js/registerer.js');
    var hallSet = imports('../data/monticello/hallSet.json');
    var reservations = imports('../data/monticello/spettacolo-1.json');
    //var EmailAuthController = imports('components/firebase/emailAuth/controller.js');
    //var emailAuthTemplate = imports('components/firebase/emailAuth/template.html');

    return function () {
        registerer(config);

        var showInfo = false;
        var header = Header(config);
        var hall = Hall(config);
        var info = Info(config);
        var settings = Settings(config);
        //var fireBase = EmailAuthController(config);
        var tickets = [];

        document.body.style.backgroundColor = config['primaryBgColor'];
        settings.createIn(document.getElementById('website'));
        header.createIn(document.getElementById('website'));
        info.createIn(document.getElementById('website'));
        hall.createIn(document.getElementById('website'));
        hall.create(hallSet, reservations);
        Bus.on('sit-change', onSitChange, 1);
        Bus.on('switchInfo', onSwitchChange, 1);
        Bus.on('burgerToggle', onSettingsToggle, 1);

        function onSwitchChange() {
            showInfo = !showInfo;
            header.toggleInfo(showInfo);
            info.toggle(showInfo);
            hall.node.style.display = !showInfo ? 'block' :'none';
        }

        function onSettingsToggle(open) {
            info.node.style.display = !open ? 'block' :'none';
            header.node.style.display = !open ? 'block' :'none';
            hall.node.style.display = !open ? 'block' :'none';
        }

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
