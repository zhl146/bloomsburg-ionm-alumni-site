import React, { Component, Fragment } from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

class AdminVisibilityFilter extends Component {
    state = {
        searchString: '',
        anchorEl: null,
    }

    handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    render() {
        const { anchorEl } = this.state
        const { handleMenuItemClick, currentIndex, options } = this.props
        return (
            <Fragment>
                <List component="nav">
                    <ListItem
                        button
                        aria-haspopup="true"
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText
                            secondary={`Showing: ${
                                options[currentIndex].label
                            }`}
                        />
                    </ListItem>
                </List>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option.key}
                            selected={index === currentIndex}
                            onClick={event => {
                                this.handleClose()
                                handleMenuItemClick(event, index)
                            }}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Menu>
            </Fragment>
        )
    }
}

export default AdminVisibilityFilter
