import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: String,
	body: String,
	date: { type: Date, default: Date.now },
	views: Number
});

const Post = mongoose.model('Post', postSchema);

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

export default Post;
