const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database");

class BlacklistedToken extends Model {}

BlacklistedToken.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "BlacklistedTokens",
    timestamps: true,
  }
);

module.exports = BlacklistedToken;
