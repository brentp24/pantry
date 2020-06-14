///////////////////////
////// RECIPE.JS //////
///////////////////////

// Creating a table used to store the items that users currently have in the recipe database
module.exports = function(sequelize, DataTypes) {
  const RecipeSearch = sequelize.define("RecipeSearch", {
    selectionCriteria: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mealType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dietType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cuisineType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numberResults: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return RecipeSearch;
};
