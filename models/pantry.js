///////////////////////
////// PANTRY.JS //////
///////////////////////

// Creating a table used to store the items that users currently have in the pantry
module.exports = function (sequelize, DataTypes) {
    var Pantry = sequelize.define("Pantry", {
        itemName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        itemID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        clipartURL: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Pantry;
};