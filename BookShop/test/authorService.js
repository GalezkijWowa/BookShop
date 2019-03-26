let authorService = require("../server/services/authorService");
let SequelizeMock = require('sequelize-mock');
let dbMock = new SequelizeMock();

let AuthorMock = dbMock.define('user', {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'test@example.com'
}, {
        instanceMethods: {
            getFullName: function () {
                return this.get('firstName') + ' ' + this.get('lastName');
            },
            getShortName: function () {
                return this.get('firstname');
            }
        },
    });