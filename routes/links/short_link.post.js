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
    }
  }
),

async (req, res) => {
  const { origin } = req.body;
  const models = res.app.get('models');

  const newLink = await models.Link.create({ origin });

  const shorten = base62.encode(newLink.id);

  newLink.update({ shorten });

  res.status(201).json({ shorten });
});

module.exports = router;
