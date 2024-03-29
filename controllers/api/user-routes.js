const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { User, Post, Comment } = require("../../models");

// POST /api/users --> create new user
router.post("/", (req, res) => {
	User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	})
		.then((dbUserData) => {
			req.session.save(() => {
				req.session.user_id = dbUserData.id;
				req.session.username = dbUserData.username;
				req.session.loggedIn = true;

				res.json(dbUserData);
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST /api/users/login --> user login route
router.post("/login", (req, res) => {
	User.findOne({
		where: {
			email: req.body.email,
		},
	}).then((dbUserData) => {
		if (!dbUserData) {
			res.status(400).json({ message: "No user with that email address!" });
			return;
		}

		const validPassword = dbUserData.checkPassword(req.body.password);
		if (!validPassword) {
			res.status(400).json({ message: "Incorrect Password" });
			return;
		}

		req.session.save(() => {
			req.session.user_id = dbUserData.id;
			req.session.username = dbUserData.username;
			req.session.loggedIn = true;

			res.json({ user: dbUserData, message: "You are now logged in!" });
		});
	});
});

// POST /api/users/logout --> User logout route
router.post("/logout", withAuth, (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

// // PUT /api/users/:id --> to update user password
// router.put("/:id", withAuth, (req, res) => {
// 	User.update(req.body, {
// 		individualHooks: true,
// 		where: {
// 			id: req.params.id,
// 		},
// 	})
// 		.then((dbUserData) => {
// 			if (!dbUserData[0]) {
// 				res.status(404).json({ message: "No user found with this id" });
// 				return;
// 			}
// 			res.json(dbUserData);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json(err);
// 		});
// });

// // DELETE /api/users/:id --> to delete user
// router.delete("/:id", withAuth, (req, res) => {
// 	User.destroy({
// 		where: {
// 			id: req.params.id,
// 		},
// 	})
// 		.then((dbUserData) => {
// 			if (!dbUserData) {
// 				res.status(404).json({ message: "No user found with this id" });
// 				return;
// 			}
// 			res.json(dbUserData);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json(err);
// 		});
// });

module.exports = router;
