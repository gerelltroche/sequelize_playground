const { models } = require('../data/dbService')
const { getIdParam } = require('../expresshelpers')

const getAll = async (req, res) => {
    const users = await models.user.findAll()
    res.status(200).json(users)
}

const getById = async (req, res) => {
    const id = getIdParam(req)
    const user = await models.user.findByPk(id)
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).send('404 User(s) not found')
    }
}

const create = async (req, res) => {
    if (req.body.id) {
        res.status(400).send(`Bad request: ID should not be provided, since it will be auto-assigned by database`)
    } else {
        await models.user.create(req.body)
        res.status(201).end();
    }
}

const update = async (req, res) => {
    const id = getIdParam(req)

    if (req.body.id === id) {
        await models.user.update(req.body, {
            where: {
                id: id
            }
        })
        res.status(200).end()
    } else {
        res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id})`)
    }
}

const remove = async (req, res) => {
    const id = getIdParam(req)

    await models.user.destroy({
        where: {
            id: id
        }
    })
    res.status(200).end()
}



module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
}