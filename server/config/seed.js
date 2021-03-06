/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
'use strict';
import config from '../config/environment';
import User from '../api/user/user.model';

if (config.env !== 'production') {
  User.find({}).remove()
    .then(() => {
      User.create({
          provider: 'local',
          role: 'admin_grp',
          name: 'Test',
          uid: 'test',
          surname: 'User',
          email: 'luc.bourdot@ac-dijon.fr',
          urlToken: 'token',
          mailValid: true,
          structure: 'Education',
          isactif: true,
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          surname: 'Alfred',
          uid: 'admin',
          email: 'admin@admin.com',
          urlToken: 'token',
          mailValid: true,
          structure: 'MEN',
          isactif: true,
          password: 'admin'
        })
        .then(() => {
          console.log('finished populating users');
        });
      var uT = [];
      for (var i = 0; i < 20; i++) {
        uT.push({
          provider: 'local',
          name: 'EOLE' + i,
          uid: 'eole' + i,
          surname: 'Luc',
          email: 'luc@test.com' + i,
          urlToken: 'token' + i,
          mailValid: false,
          structure: 'Education',
          isactif: false,
          isdemande: true,
          //firstdate : "2016/1/12",
          password: 'test'
        });
      }
      User.create(uT, function() {
        console.log('finished populating users eole');
      });
    });
} else {
  User.count({}, function(err, count) {
    if (count == 0) {
      User.create({
          provider: 'local',
          role: 'admin',
          name: 'Administrator',
          surname: 'Alfred',
          uid: 'admin',
          email: 'admin@localhost',
          urlToken: '',
          mailValid: true,
          structure: 'MEN',
          isactif: true,
          password: 'admin'
        })
        .then(() => {
          console.log('finished populating Administrator');
        });
    }
  });
}
