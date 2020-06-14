const router = require('express').Router();
const base62 = require('base62/lib/ascii');
const inputValidator = require('../../middleware/input_validator');

router.post('/v1/short-link', 
inputValidator(
  'body', {
    origin: {
      type: 'STRING',
      required: true,
      pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    },

    alias: {
      type: 'STRING',
      pattern: /^[a-z0-9-_]+$/i,
    },
  }
),

async (req, res, next) => {
  const { origin, alias } = req.body;
  const models = res.app.get('models');

  const newLink = await models.Link.create({ origin });

  let shorten = '';

  if (alias) {
    const existingLink = await models.Link.findOne({ where: { shorten: alias } });
    if (existingLink) res.status(409).json({ message: 'Short link with this name already exists.' });

    shorten = alias;
  } else {
    shorten = base62.encode(newLink.id);
  }

  newLink.update({ shorten });

  res.status(201).json({ shorten });
});

module.exports = router;
