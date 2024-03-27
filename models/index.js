const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE'	// When a User is deleted, their posts are as well
});

Post.belongsTo(User {
	foreignKey: 'user_id'
});

User.hasMany(Comment, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE' // When a user is deleted, their comments are as well
});

Comment.belongsTo(User, {
	foreignKey: 'user_id'
});

Post.hasMany(Comment, {
	foreignKey: 'post_id',
	onDelete: 'CASCADE' // When a post is deleted, the comments are as well
});

Comment.belongsTo(Post, {
	foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };