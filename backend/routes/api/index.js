// backend/routes/api/index.js
const router = require('express').Router();

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});


router.post('/test', function(req, res) {
    //res.cookie('XSRF-TOKEN', req.csrfToken());
    //res.json({made: 'it here'})
    res.json({ requestBody: req.body });
  });


module.exports = router;