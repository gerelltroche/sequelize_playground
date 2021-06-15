const {getIdParam} = require("../expresshelpers");
const applyExtraSetup = (sequelize) => {
    const { user, territory, checkout } = sequelize.models

    user.hasMany(territory)
    checkout.hasMany(user)
    checkout.hasMany(territory)

    sequelize.sync()
}

module.exports = { applyExtraSetup }