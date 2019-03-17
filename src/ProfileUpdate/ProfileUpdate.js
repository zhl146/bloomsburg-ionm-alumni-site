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
} from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'

import { GET_CURRENT_USER_PROFILE } from '../wrappers/UserProfileProvider'
import { GET_USER_PROFILES } from '../wrappers/UsersProvider'
import PictureEditor from './PictureEditor'

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
        $picture: Upload
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
                picture: $picture
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

            permissions {
                permissionId
            }
        }
    }
`

class ProfileUpdate extends React.Component {
    state = {
        ...extractDefaultStateFromProps(this.props.profile),
        image: null,
        editorRef: null,
    }

    imgRef = React.createRef()

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

    setEditorRef = editor =>
        this.setState({
            editorRef: editor,
        })

    getPictureBlob = () =>
        new Promise((resolve, reject) => {
            if (!this.state.editorRef) reject()
            this.state.editorRef
                .getImageScaledToCanvas()
                .toBlob(blob => resolve(blob))
        })

    handleUpdateProfile = updatefn => async () => {
        // const picture = await this.getPictureBlob()
        const { image, editorRef, ...updateParams } = this.state

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
            pictureMedium,
        } = this.state
        const { classes } = this.props

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
                                    <PictureEditor
                                        setEditorRef={this.setEditorRef}
                                        imageUrl={
                                            'https://images.unsplash.com/photo-1548422392-679e1fc2eba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1384&q=80'
                                        }
                                        handleImageChange={
                                            this.handleImageChange
                                        }
                                    />
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
                                        value={twitter}
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
                                        value={facebook}
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
                                        value={linkedin}
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
