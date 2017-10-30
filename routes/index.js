var express = require('express');
var router = express.Router();

const i18n = require('i18n');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Recibimos la petición de cambio de idioma

router.get('/lang/:locale', (req, res, next) => {
  const locale = req.params.locale;
  const referer = req.query.redir || req.get('referer');
  res.cookie('nodeapi-lang', locale, { maxAge: 900000, httpOnly: true });
  res.redirect(referer);
});

module.exports = router;
