const customerModel = require('../models/customer');
const userModel = require('../models/user');
const InvalidData = require('../exceptions/invalidData');
const DataNotFound = require('../exceptions/dataNotFound')
const bcrypt = require('bcrypt');
const salt = process.env.BCRYPT_SALT;
const { google } = require('googleapis');
const { setToken } = require('../utils/jwtTokens');

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/api/v1/auth/google/callback'
)


async function register({
    name,
    email,
    password,
    type = 'CUSTOMER'
}) {
    const model = type === 'CUSTOMER' ? customerModel : userModel;
    const getExistingUser = await getByEmail(email, model)

    if (getExistingUser) throw new InvalidData('Email already exists');

    const hashedPassword = bcrypt.hashSync(password || '123', salt);

    const payload = {
        name,
        email,
        password: hashedPassword
    }

    const data = await model.query().insertAndFetch(payload);

    return {
        id: data.id,
        name: data.name,
        email: data.email
    }

}

async function getByEmail(email, model = customerModel) {
    return await model.query()
        .select(
            'id',
            'name',
            'email',
            'password'
        )
        .findOne({
            email,
            deleted_at: null
        })
}

async function oauth2Login() {
    const scope = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ]

    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope,
        include_granted_scopes: true
    })
}

async function googleCallback(code) {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
    })

    const { data } = await oauth2.userinfo.get()

    if (!data) throw new InvalidData()

    let id;
    const name = data.name;
    const email = data.email;

    const dataExistingUser = await getByEmail(email)

    if (!dataExistingUser) {
        const dataRegister = await register({
            name,
            email,
        })

        id = dataRegister.id
    }

    const payload = {
        id: dataExistingUser?.id ?? id,
        name,
        email,
        role: 'CUSTOMER',
        permissions: []
    }

    const token = setToken(payload, { duration: 5, shorthandUnit: 'h' })

    return {
        ...payload,
        token
    }

}

async function login({
    email,
    password,
    type
}) {
    const model = type === 'CUSTOMER' ? customerModel : userModel;
    const role = type === 'CUSTOMER' ? 'CUSTOMER' : 'ADMIN';
    const customer = await getByEmail(email, model);

    if (!customer) throw new DataNotFound('Email not found');

    const hashedPassword = customer.password;
    const isMatch = bcrypt.compareSync(password, hashedPassword);

    if (!isMatch) throw new InvalidData('Email atau password salah');

    const permissions = role === 'CUSTOMER' ? [] : ['ADMIN', 'CUSTOMER', 'PRODUCT'];

    const payload = {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        role: role,
        permissions
    }

    const token = setToken(payload, { duration: 5, shorthandUnit: 'h' })

    return {
        ...payload,
        token
    }
}

module.exports = {
    register,
    oauth2Login,
    googleCallback,
    login,
}