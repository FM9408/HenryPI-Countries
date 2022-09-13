const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('activity' ,{
        name: {
            type: DataTypes.STRING,
            allownull: false
        },
        dificulty: {
            type: DataTypes.ENUM('Muy fácil', 'Fácil', 'Algo desafiante', 'Difícil', 'Muy difícil'),
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
        },
        type: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allownull:false
        }
    })
}