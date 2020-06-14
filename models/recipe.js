///////////////////////
////// RECIPE.JS //////
///////////////////////

// Creating a table used to store the items that users currently have in the recipe database
module.exports = function(sequelize, DataTypes) {
  const Recipe = sequelize.define("Recipe", {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ingredientsName: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    instructionsName: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  return Recipe;
};
