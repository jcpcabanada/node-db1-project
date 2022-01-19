const db = require('../../data/db-config')

const getAll = () => {
  //SELECT * from accounts
  return db('accounts');
}

const getById = id => {
  // SELECT * from accounts where id = 1
  return db('accounts').where('id', id).first()
}

const create = async account => {
  //INSERT into accounts (name, budget) values ('foo', 1000):
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = (id, account) => {

}

const deleteById = id => {
  //delete from accounts where id = 1
  return db('accounts').where('id', id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
