/* eslint-disable */
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      default: true
    }
  });

  return Post;
};

/* eslint-enable */
