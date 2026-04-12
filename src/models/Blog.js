import Sequelize, { Model } from "sequelize";

class Blog extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        title: Sequelize.STRING,
        content: Sequelize.STRING,
        thumbnail_url: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId" });
  }
}

export default Blog;
