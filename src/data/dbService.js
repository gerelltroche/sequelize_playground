const { Sequelize } = require('sequelize')
const UserModel = require('./models/user.model')
const { applyExtraSetup } = require("./extraSetup");

const sequelize = new Sequelize('main_db', 'root', 'Colonial1', {
    host: 'localhost',
    dialect: 'mysql'
});

const modelDefiners = [
    require('./models/user.model'),
    require('./models/territory.model'),
    require('./models/checkout.model'),
]

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize)
}

applyExtraSetup(sequelize)

module.exports = sequelize