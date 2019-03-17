import auth0 from 'auth0-js'
import Cookies from 'js-cookie'

const auth0Client = new auth0.WebAuth({
    domain: 'buionmalumni.auth0.com',
    clientID: '2Zi0slF90q3xq3YdMoSgpQTFH0FZuMNl',
    responseType: 'token id_token',
    scope: 'openid email',
})

const setSession = ({ idToken, idTokenPayload }) => {
    Cookies.set('idToken', idToken)
    Cookies.set('idTokenPayload', idTokenPayload)
    Cookies.set('expiresAt', idTokenPayload.exp * 1000)
}

const delSession = () => {
    Cookies.remove('idToken')
    Cookies.remove('idTokenPayload')
    Cookies.remove('expiresAt')
}

export const requestLink = email =>
    new Promise((resolve, reject) =>
        auth0Client.passwordlessStart(
            {
                connection: 'email',
                send: 'link',
                email,
                redirectUri: `http://localhost:3000/callback`,
            },
            (err, res) => {
                err ? reject(err) : resolve(res)
            }
        )
    )

export const handleAuthentication = hash =>
    new Promise((resolve, reject) => {
        auth0Client.parseHash({ hash }, (err, authResult) => {
            err || !authResult || !authResult.idToken
                ? reject(err)
                : resolve(authResult)
        })
    }).then(authResult => setSession(authResult))

export const signOut = () => {
    auth0Client.logout({
        returnTo: 'http://localhost:3000',
        clientID: '2Zi0slF90q3xq3YdMoSgpQTFH0FZuMNl',
    })
    delSession()
}

export const isAuthenticated = () => {
    const expiresAt = Cookies.get('expiresAt')
    return expiresAt && new Date().getTime() < expiresAt
}

export const silentAuth = hash =>
    new Promise((resolve, reject) => {
        auth0Client.checkSession({ hash }, (err, authResult) => {
            err ? reject(err) : resolve(authResult)
        })
    }).then(authResult => setSession(authResult))

export default auth0Client
