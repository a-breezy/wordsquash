const sequelize = require("../config/connection");
const { Model, Datatypes } = require("sequelize");
const Post = require("../../just-tech-news/models/Post");

Post.init(
	{
		id: {
			type: Datatypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: Datatypes.STRING,
			allowNull: false,
		},
		post_url: {
			type: Datatypes.STRING,
			allowNull: false,
			validate: {
				isUrl: true,
			},
		},
		user_id: {
			type: Datatypes.INTEGER,
			references: {
				model: "user",
				key: "id",
			},
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: "post",
	}
);

module.exports = Post;
