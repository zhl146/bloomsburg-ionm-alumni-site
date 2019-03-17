import React from 'react'
import Fuse from 'fuse.js'
import { compose } from 'redux'
import { arrToMap } from '../util/mapping'

const filterBySearchString = searchString => userProfiles => {
    if (searchString === '') return userProfiles

    const options = {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 50,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: [
            'nameFirst',
            'nameLast',
            'locationCity',
            'locationState',
            'email',
            'title',
        ],
    }
    const fuse = new Fuse(userProfiles, options)
    return fuse.search(searchString)
}

const filterByType = userType => userProfiles => {
    if (userType === 'all') return userProfiles

    if (userType === 'active')
        return userProfiles.filter(
            ({ permissionMap }) => permissionMap.viewSite
        )
    if (userType === 'pending')
        return userProfiles.filter(
            ({ permissionMap }) => !permissionMap.viewSite
        )
}

class UserFilter extends React.Component {
    render() {
        const { render, userProfiles, userType, searchString } = this.props

        const filteredProfiles = compose(
            filterByType(userType),
            filterBySearchString(searchString)
        )(userProfiles)

        return render(filteredProfiles)
    }
}

export default UserFilter
