import React from 'react'

import UserProfileProvider from '../wrappers/UserProfileProvider'

export const CurrentUserContext = React.createContext()

export default class CurrentUserProvider extends React.Component {
    render() {
        return (
            <UserProfileProvider
                render={currentUser => (
                    <CurrentUserContext.Provider value={currentUser}>
                        {this.props.children}
                    </CurrentUserContext.Provider>
                )}
            />
        )
    }
}
