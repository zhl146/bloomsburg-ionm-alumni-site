import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import {
    TextField,
    Card,
    Button,
    withStyles,
    CardContent,
    CardActions,
    Divider,
    Select,
    MenuItem,
    Avatar,
    OutlinedInput,
} from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'

import { GET_CURRENT_USER_PROFILE } from '../wrappers/UserProfileProvider'
import { GET_USER_PROFILES } from '../wrappers/UsersProvider'

const extractDefaultStateFromProps = ({
    email,
    title,
    blurb,
    nameFirst,
    nameLast,
    phone,
    locationCity,
    locationState,
    locationZip,
    pictureSmall,
    pictureMedium,
    pictureLarge,
    twitter,
    facebook,
    linkedin,
    avatarType,
}) => ({
    email,
    title,
    blurb,
    nameFirst,
    nameLast,
    phone,
    locationCity,
    locationState,
    locationZip,
    pictureSmall,
    pictureMedium,
    pictureLarge,
    twitter,
    facebook,
    linkedin,
    avatarType,
})

const UPDATE_PROFILE = gql`
    mutation updateSelf(
        $title: String
        $blurb: String
        $nameFirst: String
        $nameLast: String
        $phone: String
        $locationZip: Int
        $locationCity: String
        $locationState: String
        $twitter: String
        $linkedin: String
        $facebook: String
        $avatarType: String
    ) {
        updateSelf(
            data: {
                title: $title
                blurb: $blurb
                nameFirst: $nameFirst
                nameLast: $nameLast
                phone: $phone
                locationZip: $locationZip
                locationCity: $locationCity
                locationState: $locationState
                twitter: $twitter
                facebook: $facebook
                linkedin: $linkedin
                avatarType: $avatarType
            }
        ) {
            userId
            email
            title
            blurb
            nameFirst
            nameLast
            phone
            locationCity
            locationState
            locationZip
            pictureSmall
            pictureMedium
            pictureLarge
            twitter
            facebook
            linkedin
            avatarType

            permissions {
                permissionId
            }
        }
    }
`

class ProfileUpdate extends React.Component {
    state = extractDefaultStateFromProps(this.props.profile)

    genericTextInputOnChange = (fieldName, isNumber = false) => e =>
        this.setState({
            [fieldName]:
                e.target.value === ''
                    ? ''
                    : isNumber
                    ? Number(e.target.value)
                    : e.target.value,
        })

    handleImageChange = image => {
        this.state({ image })
    }

    handleUpdateProfile = updatefn => async () => {
        const { ...updateParams } = this.state

        const variables = {
            ...updateParams,
        }

        updatefn({
            variables,
            refetchQueries: [
                {
                    query: GET_USER_PROFILES,
                },
            ],
        })
    }

    render() {
        const {
            title,
            blurb,
            nameFirst,
            nameLast,
            phone,
            locationCity,
            locationState,
            locationZip,
            twitter,
            facebook,
            linkedin,
            avatarType,
        } = this.state
        const { classes, profile } = this.props
        const { userId } = profile

        return (
            <Mutation
                mutation={UPDATE_PROFILE}
                update={(cache, { data: { updateSelf } }) => {
                    cache.writeQuery({
                        query: GET_CURRENT_USER_PROFILE,
                        data: { currentUser: updateSelf },
                    })
                }}
            >
                {(updateProfile, { data, loading, error }) => {
                    return data ? (
                        <Redirect to="/profile" />
                    ) : (
                        <Card
                            classes={{
                                root: classes.root,
                            }}
                        >
                            <CardContent>
                                <div className={classes.formContainer}>
                                    <div className={classes.avatarContainer}>
                                        <Avatar
                                            alt="user"
                                            src={`https://avatars.dicebear.com/v2/${avatarType}/${userId}.svg`}
                                            className={classes.userAvatar}
                                        />
                                    </div>

                                    <Select
                                        value={avatarType}
                                        onChange={this.genericTextInputOnChange(
                                            'avatarType'
                                        )}
                                        input={
                                            <OutlinedInput
                                                labelWidth={200}
                                                name="Avatar"
                                                label="Avatar"
                                            />
                                        }
                                    >
                                        <MenuItem value="female">
                                            Female
                                        </MenuItem>
                                        <MenuItem value="male">Male</MenuItem>

                                        <MenuItem value="jdenticon">
                                            Identicon
                                        </MenuItem>
                                        <MenuItem value="gridy">
                                            Monster
                                        </MenuItem>
                                    </Select>
                                    <Divider />
                                    <TextField
                                        label="First Name"
                                        type="text"
                                        autoComplete="text"
                                        margin="normal"
                                        variant="outlined"
                                        value={nameFirst}
                                        onChange={this.genericTextInputOnChange(
                                            'nameFirst'
                                        )}
                                    />
                                    <TextField
                                        label="Last Name"
                                        type="text"
                                        autoComplete="text"
                                        margin="normal"
                                        variant="outlined"
                                        value={nameLast}
                                        onChange={this.genericTextInputOnChange(
                                            'nameLast'
                                        )}
                                    />
                                    <Divider />
                                    <TextField
                                        label="Title"
                                        type="text"
                                        autoComplete="text"
                                        margin="normal"
                                        variant="outlined"
                                        value={title}
                                        onChange={this.genericTextInputOnChange(
                                            'title'
                                        )}
                                    />
                                    <Divider />
                                    <TextField
                                        label="Phone"
                                        type="tel"
                                        autoComplete="tel"
                                        margin="normal"
                                        variant="outlined"
                                        value={phone}
                                        onChange={this.genericTextInputOnChange(
                                            'phone'
                                        )}
                                    />
                                    <Divider />
                                    <TextField
                                        label="City"
                                        type="text"
                                        autoComplete="text"
                                        margin="normal"
                                        variant="outlined"
                                        value={locationCity}
                                        onChange={this.genericTextInputOnChange(
                                            'locationCity'
                                        )}
                                    />
                                    <TextField
                                        label="State"
                                        type="text"
                                        autoComplete="text"
                                        margin="normal"
                                        variant="outlined"
                                        value={locationState}
                                        onChange={this.genericTextInputOnChange(
                                            'locationState'
                                        )}
                                    />
                                    <Divider />
                                    <TextField
                                        label="Twitter"
                                        type="text"
                                        autoComplete="text"
                                        margin="normal"
                                        variant="outlined"
                                        value={twitter || ''}
                                        onChange={this.genericTextInputOnChange(
                                            'twitter'
                                        )}
                                    />
                                    <TextField
                                        label="Facebook"
                                        type="text"
                                        autoComplete="text"
                                        margin="normal"
                                        variant="outlined"
                                        value={facebook || ''}
                                        onChange={this.genericTextInputOnChange(
                                            'facebook'
                                        )}
                                    />
                                    <TextField
                                        label="LinkedIn"
                                        type="text"
                                        autoComplete="text"
                                        margin="normal"
                                        variant="outlined"
                                        value={linkedin || ''}
                                        onChange={this.genericTextInputOnChange(
                                            'linkedin'
                                        )}
                                    />
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button
                                    onClick={this.handleUpdateProfile(
                                        updateProfile
                                    )}
                                >
                                    Save Changes
                                </Button>
                                <Button component={Link} to={'/profile'}>
                                    Cancel
                                </Button>
                            </CardActions>
                        </Card>
                    )
                }}
            </Mutation>
        )
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        maxWidth: 960,
    },
})

export default withStyles(styles)(ProfileUpdate)
