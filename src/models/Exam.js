import Sequelize, { Model } from "sequelize";

class Exam extends Model {
  static init(sequelize) {
    super.init(
      {
        drive_url: Sequelize.STRING,
        key: Sequelize.STRING,
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

export default Exam;
