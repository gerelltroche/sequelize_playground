const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('territory', {
        territoryNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        territoryName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_updated: {
            type: DataTypes.DATE,
        }
    });
};