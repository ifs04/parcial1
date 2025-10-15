import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Author } from "./if_authors";

export interface IfNewsI {
  id?: number;
  abstract: string;
  content_news: string;
  author_id: number;
  status: "PUBLISHED" | "DRAFT";
}

export class IfNews extends Model{
  public id!: number;
  public abstract!: string;
  public content_news!: string;
  public author_id!: number;
  public status!: "PUBLISHED" | "DRAFT";
}

IfNews.init(
  {
    abstract: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Abstract cannot be empty" },
      },
    },
    content_news: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PUBLISHED", "DRAFT"),
      defaultValue: "DRAFT",
    },
  },
  {
    sequelize,
    modelName: "IfNews",
    tableName: "jq_news",
    timestamps: false,
  }
);


Author.hasMany(IfNews, {
  foreignKey: "author_id",
  sourceKey: "id",
});

IfNews.belongsTo(Author, {
  foreignKey: "author_id",
  targetKey: "id",
});