const db = require("../../database/models")

const apiUsers = {
    listUsers: async (req, res) => {
        const listUsers = await db.User.findAll().catch(error => {
            console.log(error)
        })

        let respuesta = {
            meta: {
                status: 200,
                total: listUsers.length,
                url: "api/users"
            },
            data: listUsers
        }

        return res.json(respuesta)
        
    },
    detailUser: async (req, res) => {
        const User = await db.User.findByPk(req.params.id).catch(error => {
            console.log(error)
        })
        let respuesta = {
            meta: {
                status:200,
                url: req.params.id
            },
            data: User
        }

        return res.json(respuesta)
    },
    createUser: async (req, res) => {
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
          };

        let userCreated = await db.User.create({ ...userToCreate }).catch( error => {
            console.log(error)
        })

        let respuesta = {
            meta: {
                status:200
            },
            data: userCreated
        }

        return res.json(respuesta)
        
    },
    updateUser: async (req, res) => {
        let userToUpdate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
          };

        await db.User.update(userToUpdate, {
            where: {
                id: req.params.id
            }
        }).catch( error => {
            console.log(error);
        })
    },
    deleteUser: async (req, res) => {
        await db.User.destroy({
            where: {id: req.params.id}, force: true
        })
        .catch(error => {
            console.log(error)
        })
    }

}

module.exports = apiUsers