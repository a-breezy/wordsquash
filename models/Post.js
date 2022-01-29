const { Model, Datatypes } = require("sequelize");
const sequelize = require("../config/connection");

//  // IMPORTED FROM JUST TECH NEWS --> NOT SURE WHAT IT DOES
// class Post extends Model {
//     static upvote(body, models) {
//       return models.Vote.create({
//         user_id: body.user_id,
//         post_id: body.post_id
//       }).then(() => {
//         return Post.findOne({
//           where: {
//             id: body.post_id
//           },
//           attributes: [
//             'id',
//             'post_url',
//             'title',
//             'created_at',
//             [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
//           ],
//           include: [
//             {
//               model: models.Comment,
//               attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//               include: {
//                 model: models.User,
//                 attributes: ['username']
//               }
//             }
//           ]
//         });
//       });
//     }
//   }

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
