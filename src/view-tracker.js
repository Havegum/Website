import { View } from '@/components/database.js';

export default function tracker ({ path, query }, res, next) {
  let isHTML = !/\./.test(path) || /html/.test(path);
  let isJSON = /\.json/.test(path);
  let isBlog = /\/blog\//.test(path);

  let lang = query.lang || 'no';

  if (!isBlog && (isHTML || isJSON)) {

    View.findOneAndUpdate(
      { path, lang },
      { $inc: { views: 1 }},
      async function (err, response) {
        if (response || err) return;
        let view = new View({ path, lang, views: 1 });
        view.save();
      }
    );

  }

  next();
}
