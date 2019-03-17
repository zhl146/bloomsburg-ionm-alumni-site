import React from 'react'
import { withStyles } from '@material-ui/core'
import { Slider } from '@material-ui/lab'

import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import classnames from 'classnames'

class PictureEditor extends React.Component {
    state = {
        image: null,
        dropped: false,
        scale: 1,
    }

    handleZoom = (event, scale) => {
        this.setState({ scale })
    }

    handleDrop = dropped => {
        this.setState({ image: dropped[0], dropped: true })
    }

    render() {
        const { scale } = this.state
        const { imageUrl, setEditorRef } = this.props

        return (
            <div>
                <Dropzone onDrop={this.handleDrop} disableClick={true}>
                    {({ getRootProps, getInputProps, isDragActive }) => {
                        return (
                            <div
                                {...getRootProps()}
                                className={classnames('dropzone', {
                                    'dropzone--isActive': isDragActive,
                                })}
                            >
                                <input {...getInputProps()} />
                                <AvatarEditor
                                    ref={setEditorRef}
                                    //crossOrigin="anonymous"
                                    width={200}
                                    height={200}
                                    image={this.state.image || imageUrl}
                                    borderRadius={100}
                                    scale={scale}
                                />
                                <Slider
                                    value={scale}
                                    onChange={this.handleZoom}
                                    min={1}
                                    max={3}
                                />
                            </div>
                        )
                    }}
                </Dropzone>
            </div>
        )
    }
}

const styles = {}

export default withStyles(styles)(PictureEditor)
