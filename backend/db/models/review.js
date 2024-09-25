'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        onDelete: 'cascade'
      });

      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId'
      })
    }
  }
  Review.init({
    spotId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type:DataTypes.STRING,
      validate : {
        len: [1,300]
      }
    },
    stars: {
      type:DataTypes.INTEGER,
      validate : {
        min:1,
        max:5
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};