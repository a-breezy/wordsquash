const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
	Post.findAll({
		// use the ID from the session
		where: { user_id: req.session.user_id },
		attributes: ["id", "description", "title", "created_at"],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
				include: {
					model: User,
					attributes: ["username"],
				},
			},
			{
				model: User,
				attributes: ["username"],
			},
		],
	})
		.then((dbPostData) => {
			// serialize data before passing to template
			const posts = dbPostData.map((post) => post.get({ plain: true }));
			res.render("dashboard", { posts, loggedIn: true }); // hardcoded to true for now to allow user to get to loggin page
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// route to edit post based on id
router.get("/edit/:id", withAuth, (req, res) => {
	Post.findByPk(req.params.id, {
		attributes: ["id", "description", "title", "created_at"],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
				include: {
					model: User,
					attributes: ["username"],
				},
			},
			{
				model: User,
				attributes: ["username"],
			},
		],
	})
		.then((dbPostData) => {
			if (dbPostData) {
				const post = dbPostData.get({ plain: true });

				res.render("edit-post", {
					post,
					loggedIn: true,
				});
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
