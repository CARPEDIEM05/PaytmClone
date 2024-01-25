const zod = require("zod");

const createUser = zod.object({
    username: zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(6)
})

const checkUser = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateUser = zod.object({
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()

})


module.exports = {
    createUser:createUser,
    checkUser: checkUser,
    updateUser: updateUser
}