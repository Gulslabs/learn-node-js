const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

// pularize blog to 'blogs' in the mongoDB database. 
const Blog = mongoose.model('blog', blogSchema);
module.exports = Blog;
