const {models} = require('../data/dbService')
const {getIdParam} = require('../expresshelpers')

const getAll = async (req, res) => {
    const territories = await models.territory.findAll()
    res.status(200).json(territories)
}

const getById = async (req, res) => {
    const id = getIdParam(req)
    const territory = await models.territory.findByPk(id)
    if (territory) {
        res.status(200).json(territory)
    } else {
        res.status(404).send('404 Territory(s) not found')
    }
}

const getByOwner = async (req, res) => {
    const id = getIdParam(req)
    const territory = await models.territory.findAll({
        where: {
            userId: id
        }
    })
    if (territory) {
        res.status(200).json(territory)
    } else {
        res.status(404).send(`404 no Territories found with owner ID (${id})`)
    }
}

const create = async (req, res) => {
    if (req.body.id) {
        res.status(400).send(`Bad request: ID should not be provided, since it will be auto-assigned by database`)
    } else {
        await models.territory.create(req.body)
        res.status(201).end();
    }
}

const update = async (req, res) => {
    const id = getIdParam(req)

    if (req.body.id === id) {
        await models.territory.update(req.body, {
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

    await models.territory.destroy({
        where: {
            id: id
        }
    })
    res.status(200).end()
}


module.exports = {
    getAll,
    getById,
    getByOwner,
    create,
    update,
    remove,
}