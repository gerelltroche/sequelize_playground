"use strict";
const db = require('./src/data/dbService')
const bodyParser = require('body-parser')
const Express = require('express')
const cors = require('cors')

const routes = {
    users: require('./src/routes/users'),
    territories: require('./src/routes/territories')
    // more routes here
    // items: require.
}

const express = new Express()

const makeHandlerAwareOfAsyncErrors = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (error) {
            next(error)
        }
    }
}

express.use(bodyParser.json())
express.use(bodyParser.urlencoded({extended: true}))
express.use(cors({origin: '*'}))

express.get('/', (req, res) => {
    res.send(`
        <h2>Sequelize Playground</h2>
        <p>Welcome! Try using Postman or a similar request library OR create your own JS frontend and make requests!</p>
        <br />
        <br />
        <p>Made by T. Gerell Troche</p>
`)
})

for (const [routeName, routeController] of Object.entries(routes)) {
    if (routeController.getAll) {
        express.get(
            `/api/${routeName}`,
            makeHandlerAwareOfAsyncErrors(routeController.getAll)
        );
    }
    if (routeController.getByOwner) {
        express.get(
            `/api/${routeName}/owned/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.getByOwner)
        )
    }
    if (routeController.getById) {
        express.get(
            `/api/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.getById)
        );
    }
    if (routeController.create) {
        express.post(
            `/api/${routeName}`,
            makeHandlerAwareOfAsyncErrors(routeController.create)
        );
    }
    if (routeController.update) {
        express.put(
            `/api/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.update)
        );
    }
    if (routeController.remove) {
        express.delete(
            `/api/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.remove)
        );
    }
}


express.listen(3000, () => {
    console.log(`We be listening on Port 3000`)
})