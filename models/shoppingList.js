///////////////////////
/// SHOPPINGLIST.JS ///
///////////////////////

// Creating a table used to store the regular shopping list items
// a particular user purchases. User can replenish their pantry
module.exports = function(sequelize, DataTypes) {
  const ShoppingList = sequelize.define("ShoppingList", {
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
    clipartURL: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return ShoppingList;
};
