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

    return function () {
        registerer(config);

        var showInfo = false;
        var header = Header(config);
        var hall = Hall(config);
        var info = Info(config);
        var settings = Settings(config);
        var user = {};
        var eventId = 0;
        var events;

        document.body.style.backgroundColor = config['primaryBgColor'];

        var webSite = document.getElementById('website');
        webSite.appendChild(Element.create('<h1><a href="http://www.amicidelteatromonticello.it">amicidelteatromonticello.it</a></h1>'));
        settings.createIn(webSite);
        header.createIn(webSite);
        info.createIn(webSite);
        hall.createIn(webSite);

        Bus.on('sit-change', onSitChange, 1);
        Bus.on('switchInfo', onSwitchChange, 1);
        Bus.on('burgerToggle', onSettingsToggle, 1);
        Bus.on('sign', onSign, 1);
        Bus.on('changeEvent', onChangeEvent, 1);
        Bus.on('print', onPrint, 1);
        Bus.on('showError', showError, 1);
        Bus.on('adminPrintList', onAdminPrintList, 1);

        settings.autoLogIn();

        var database = firebase.database();

        function onAdminPrintList() {
            var event = events[eventId];
            var doc = new jsPDF();
            doc.text('Lista - Amici del teatro di monticello', 10, 10);

            doc.text('Data:', 10, 20);
            doc.text( event.date, 50, 20);

            doc.text('Ora:', 10, 27);
            doc.text( event.hour, 50, 27);

            doc.text('Spettacolo:', 10, 36);
            doc.text(event.title, 50, 36);

            var bookings = [];
            event.bookings.forEach(function (r, ri) {
                r.forEach(function (c, ci) {
                    if (c !== 0) {
                        if (bookings.filter(function (b) {
                                return b.email === c;
                            }).length !== 0) {
                            bookings.filter(function (b) {
                                return b.email === c;
                            })[0].sits.push((ci + 1) + ('ABCDEFGHILMNOPQ'.charAt(ri)))
                        } else {
                            bookings.push({
                                email: c,
                                sits: [(ci + 1) + ('ABCDEFGHILMNOPQ'.charAt(ri))]
                            })
                        }
                    }
                });
            });

            var linePos = 50;
            if (bookings.length) {
                doc.text('Email', 10, linePos);
                doc.text('Posti', 140, linePos);
            }
            bookings.forEach(function (b,i) {
                linePos += 6;
                doc.text((i+1).toString(), 5, linePos);
                doc.text(b.email, 10, linePos);
                doc.text(b.sits.join(', '), 140, linePos);
            });

            doc.save('lista ' + event.title + '.pdf');
        }

        function onPrint(b) {
            var doc = new jsPDF();
            doc.text('Prenotazione - Amici del teatro di monticello', 10, 10);

            doc.text('Utente: ' + user.email, 10, 20);

            doc.text('Data:', 10, 35);
            doc.text( b.date, 90, 35);

            doc.text('Ora:', 10, 42);
            doc.text( b.hour, 90, 42);

            doc.text('Spettacolo:', 10, 49);
            doc.text(b.title, 90, 49);

            doc.text('Posti:', 10, 56);
            var sits = b.sits.map(function(s) {
                return s.col+1 + 'ABCDEFGHILMNOPQ'.charAt(s.row)
            }).join(', ');
            doc.text(sits, 90, 56);

            doc.save(b.title + '.pdf')
        }

        function onFirebaseChange(data) {
            events = data.val()
                .map(function (o, i) {
                    o.fireBaseIndex = i;
                    return o;
                })
                .filter(function (e) {
                    return e.date.toDate().getTime() > new Date().getTime()
                }).sort(function (a, b) {
                    return a.date.toDate().getTime() - b.date.toDate().getTime()
                });
            onChangeEvent(0);
        }
        database.ref('/events').on('value', onFirebaseChange);

        function onChangeEvent(add) {
            eventId += add;
            eventId = eventId < 0 ? 0 : eventId;
            eventId = eventId > events.length-1 ? events.length-1 : eventId;
            hall.update(hallSet, events[eventId].bookings, user.email);
            info.update(events[eventId]);
            showHall();
        }

        function onSign(userId) {
            user = userId;
            showHall();
            if (events && events.length) {
                onChangeEvent(0)
            }
        }

        function showHall() {
            hall.showHallSits(user.email !== undefined);
            settings.setBookings(events, user);
        }

        function onSwitchChange() {
            showInfo = !showInfo;
            header.toggleInfo(showInfo);
            info.toggle(showInfo);
            hall.node.style.display = !showInfo ? 'block' :'none';
        }

        function onSettingsToggle(open) {
            info.node.style.display = !open ? 'block' :'none';
            header.node.style.display = !open ? 'block' :'none';
            hall.node.style.display = !open ? (showInfo ? 'none' : 'block') :'none';
        }

        function showError(param) {
            alert(param.message);
        }

        function onSitChange(o) {
            if (user.email) {
                var row = -1;
                var col = -1;
                var index = 0;
                var ret;
                hallSet.forEach(function (r) {
                    row++;
                    col= -1;
                    r.forEach(function () {
                        col++;
                        if (index === o.id) {
                            ret = [row, col];
                        }
                        index++;
                    })
                });
                firebase.database().ref('/events/' + events[eventId].fireBaseIndex + '/bookings/'+ret[0]+'/'+ret[1]).set(o.checked ? user.email : 0);
            } else {
                showError({
                    message: 'accedi prima di poter prenotare i posti'
                })
            }
        }
    };
}
