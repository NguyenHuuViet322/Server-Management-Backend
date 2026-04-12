import Sequelize, { Model } from "sequelize";

class AdditionalStudentData extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        date_of_birth: Sequelize.DATE,
        first_contact_name: Sequelize.STRING,
        first_contact_tel: Sequelize.STRING,
        second_contact_name: Sequelize.STRING,
        second_contact_tel: Sequelize.STRING,
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

export default AdditionalStudentData;
