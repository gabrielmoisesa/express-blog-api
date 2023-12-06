const PostCategoryModel = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
    }, {
        tableName: 'posts_categories',
        timestamps: false,
        underscored: true,
    });

    PostCategory.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
            as: 'blogPosts',
            through: PostCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId',
        });

        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            through: PostCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId',
        });
    };

    return PostCategory;
}

module.exports = PostCategoryModel;