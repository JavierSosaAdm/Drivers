const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('teams', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        }
    }, {timestamps: false})
}