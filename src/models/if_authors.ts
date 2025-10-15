import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface AuthorI {
  id?: number;
  name: string;
  email: string;
  bio?: string;
  status: "ACTIVE" | "INACTIVE";
}

export class Author extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public bio?: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Author.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Must be a valid email" },
      },
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Author",
    tableName: "jq_authors",
    timestamps: false,
  }
);