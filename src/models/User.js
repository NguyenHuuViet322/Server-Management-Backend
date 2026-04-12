import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, //When it is VIRTUAL it does not exist in the database
        password_hash: Sequelize.STRING,
        role: Sequelize.STRING,
        phone_number: Sequelize.STRING,
        avatar_url: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true, //If it's false do not add the attributes (updatedAt, createdAt).
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        //paranoid: true, //If it's true, it does not allow deleting from the bank, but inserts column deletedAt. Timestamps need be true.
        // underscored: true,
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // static associate(models) {
  //   this.belongsToMany(models.Address, {
  //     through: "UserAddress",
  //     foreignKey: "userId",
  //   });
  // }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
