import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'

import AppBar from '../common/AppBar'
import UsersProvider from '../wrappers/UsersProvider'
import UserFilterBar from './UserFilterBar'
import UserFilter from './UserFilter'
import ContactCard from '../common/ContactCard'
import AdminVisibilityFilter from './AdminVisibilityFilter'
import ActivateUser from './ActivateUser'
import DeactivateUser from './DeactivateUser'

import { CurrentUserContext } from '../ContextProvider/CurrentUserProvider'
import { hasAnyPermissions } from '../util/user'

const options = [
    {
        label: 'All Users',
        key: 'all',
    },
    {
        label: 'Pending Users',
        key: 'pending',
    },
    {
        label: 'Active Users',
        key: 'active',
    },
]

const needsUserFilter = user =>
    hasAnyPermissions(['userActivate', 'userDeactivate'], user)

class Connect extends Component {
    state = {
        searchString: '',
        currentIndex: 2,
    }

    static contextType = CurrentUserContext

    handleMenuItemClick = (event, index) => {
        this.setState({ currentIndex: index })
    }

    handleSearchChange = e => {
        const searchString = e.target.value
        this.setState({ searchString })
    }
    render() {
        const { classes } = this.props
        const { currentIndex, searchString } = this.state

        const currentUser = this.context

        return (
            <div>
                <AppBar>
                    <UserFilterBar
                        handleSearchChange={this.handleSearchChange}
                    />
                    {needsUserFilter(currentUser) && (
                        <AdminVisibilityFilter
                            handleMenuItemClick={this.handleMenuItemClick}
                            currentIndex={currentIndex}
                            options={options}
                        />
                    )}
                </AppBar>

                <UsersProvider
                    render={userProfiles => (
                        <div className={classes.root}>
                            <UserFilter
                                userType={options[currentIndex].key}
                                userProfiles={userProfiles}
                                searchString={searchString}
                                render={filteredProfiles =>
                                    filteredProfiles.map(profile => (
                                        <div key={profile.userId}>
                                            <ContactCard profile={profile} />
                                            <ActivateUser profile={profile} />
                                            <DeactivateUser profile={profile} />
                                        </div>
                                    ))
                                }
                            />
                        </div>
                    )}
                />
            </div>
        )
    }
}

const styles = {
    root: {
        display: 'flex',
        height: '100%',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
}

export default withStyles(styles)(Connect)
