const router = require('express').Router()
const accountsMidware = require('./accounts-middleware')
const Account = require('./accounts-model')


router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)

  }
})

router.get(
    '/:id',
    accountsMidware.checkAccountId,
    async(req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.post(
    '/',
    accountsMidware.checkAccountPayload,
    accountsMidware.checkAccountNameUnique,
    async (req, res, next) => {
  try {
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
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

router.delete('/:id', accountsMidware.checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id)
    res.json(req.Account)
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
