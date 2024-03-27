const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		text: {
			type: DataTypes.STRING, 
			allowNull: false,
			validate: {
				len: [1,280]
			}
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id'
			}
		}
	},
	{
		sequelize,
		timestamps: true, 
		freezeTableName: true,
		underscored: true,
		modelName: 'user'
	}
);

module.exports = Post;