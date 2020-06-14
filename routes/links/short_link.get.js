const router = require('express').Router();

router.get('/:shorten', async (req, res) => {
  const { shorten } = req.params;
  const models = res.app.get('models');

  const link = await models.Link.findOne({ where: { shorten } });

  if (!link) {
    res.status(404).json({ message: 'Link is not found' });
  }

  res.redirect(link.origin);
});

module.exports = router;
