const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('checkout', {
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        canceledEarlyDate: {
            type: DataTypes.DATE,
        }
    });
};