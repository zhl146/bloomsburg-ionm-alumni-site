import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import Cookies from 'js-cookie'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

// styling
import '@fortawesome/fontawesome-free/css/all.css'
import theme from './theme'

// Components
import ProtectedRoute from './Auth/ProtectedRoute'
import Connect from './Connect'
import Profile from './Profile'
import ProfileUpdate from './ProfileUpdate'
import Work from './Work'
import Login from './Auth/Login'
import Callback from './Auth/Callback'

const httpLink = createHttpLink({
    uri:
        process.env.NODE_ENV === 'production'
            ? 'https://graphql.buiomalum.com/'
            : 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${Cookies.get('idToken')}`,
        },
    }
})

const client = new ApolloClient({
    link: ApolloLink.from([
        authLink,
        createUploadLink({
            uri:
                process.env.NODE_ENV === 'production'
                    ? 'https://graphql.buiomalum.com/'
                    : 'http://localhost:4000/graphql',
        }),
        httpLink,
    ]),
    cache: new InMemoryCache(),
    fetchOptions: {
        mode: 'no-cors',
    },
})

const App = () => (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={() => (
                            <ProtectedRoute>
                                <Connect />
                            </ProtectedRoute>
                        )}
                    />
                    <Route path="/login" component={Login} />
                    <Route path="/callback" component={Callback} />
                    )} />
                    <Route
                        path="/connect"
                        render={() => (
                            <ProtectedRoute>
                                <Connect />
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/profile/edit"
                        render={() => (
                            <ProtectedRoute>
                                <ProfileUpdate />
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/profile"
                        render={() => (
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/work"
                        render={() => (
                            <ProtectedRoute>
                                <Work />
                            </ProtectedRoute>
                        )}
                    />
                </Switch>
            </BrowserRouter>
        </ApolloProvider>
    </MuiThemeProvider>
)

export default App
