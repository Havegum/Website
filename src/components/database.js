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


let viewSchema = new Schema({
	path:  { type: String, required: true, index: true },
	views: { type: Number, default: 0 },
  lang: String
});
const View = mongoose.model('View', viewSchema);

mongoose.connect(process.env.HOMEPAGE_DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

export { Post, View };
