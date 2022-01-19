const router = require('express').Router()
const accountsMidware = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json([{},{}])
  } catch (err) {
    next({ status: 422, message: 'this is horrible' })

  }
})

router.get(
    '/:id',
    accountsMidware.checkAccountId,
    (req, res, next) => {
  try {
    res.json('get accounts')
  } catch (err) {
    next(err)
  }
})

router.post(
    '/',
    accountsMidware.checkAccountPayload,
    accountsMidware.checkAccountNameUnique,
    (req, res, next) => {
  try {
    res.json('post accounts')
  } catch (err) {
    next(err)
  }
})

router.put(
    '/:id',
    accountsMidware.checkAccountPayload,
    accountsMidware.checkAccountNameUnique,
    accountsMidware.checkAccountId,
    (req, res, next) => {
  try {
    res.json('put accounts')
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', accountsMidware.checkAccountId, (req, res, next) => {
  try {
    res.json('delete accounts')
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500 ).json({
    message:err.message
  })
})

module.exports = router;
