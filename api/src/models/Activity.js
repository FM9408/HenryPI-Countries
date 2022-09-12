const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('activity' ,{
        name: {
            type: DataTypes.STRING,
            allownull: false
        },
        dificulty: {
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            allownull: false
        },
        duration: {
            type: DataTypes.ENUM('Corta', 'Media', 'Larga'),
            allownull: false
        },
        season: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
            allownull: false
        },
        description: {
            type: DataTypes.CHAR({length: 255}),
            allownull: false
        }
    })
}