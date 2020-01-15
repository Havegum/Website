import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: { type: String, required: true },
	body:  { type: String, required: true },
	slug:  { type: String, required: true },
	date:  { type: Date, default: Date.now },
	views: { type: Number, default: 0 },
});

const Post = mongoose.model('Post', postSchema);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

export default Post;
