// import all models
const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");

// create associations
// user has many posts, which all inherit user_id
User.hasMany(Post, {
	foreignKey: "user_id",
});

// Post belongs to user, with user_id
Post.belongsTo(User, {
	foreignKey: "user_id",
	onDelete: "SET NULL",
});

// comment belongs to user through user_id
Comment.belongsTo(User, {
	foreignKey: "user_id",
	onDelete: "SET NULL",
});

// user has many comments through user_id
User.hasMany(Comment, {
	foreignKey: "user_id",
	onDelete: "SET NULL",
});

// comment belongs to many posts through post_id
Comment.belongsTo(Post, {
	foreignKey: "post_id",
	onDelete: "SET NULL",
});

// post has many comments through post_id
Post.hasMany(Comment, {
	foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
