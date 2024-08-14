const authService = require('../services/auth')
const SuccessResult = require('../utils/SuccessResult')

async function registerUser(req, res) {
    const payload = req.body;

    const data = await authService.register({ ...payload, type: 'USER' })

    SuccessResult.make(res).send(data, 'INSERTED')

}

async function registerCustomer(req, res) {
    const payload = req.body;

    const data = await authService.register({ ...payload })

    SuccessResult.make(res).send(data, 'INSERTED')

}

async function loginGoogle(_, res) {
    const oauth2Login = await authService.oauth2Login()

    res.redirect(oauth2Login)

}

async function googleCallback(req, res) {
    const code = req.query.code;

    const data = await authService.googleCallback(code);

    SuccessResult.make(res).send(data, 'Login Succesfully')

}

async function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const data = await authService.login({
        email,
        password,
        type: 'USER'
    })

    SuccessResult.make(res).send(data, 'Login Succesfully')
}

async function loginCustomer(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const data = await authService.login({
        email,
        password,
        type: 'CUSTOMER'
    })

    SuccessResult.make(res).send(data, 'Login Succesfully')
}

module.exports = {
    registerUser,
    registerCustomer,
    loginGoogle,
    googleCallback,
    loginUser,
    loginCustomer
}

