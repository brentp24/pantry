///////////////
/// ITEM.JS ///
///////////////

// Creating a table used to store the products/items
// users can add to their shopping list and pantry
module.exports = function(sequelize, DataTypes) {
  const Item = sequelize.define("Item", {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    shelfLife: {
      type: DataTypes.STRING,
      defaultValue: 30
    },
    clipartURL: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Item;
};
