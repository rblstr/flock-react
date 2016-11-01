export const PLAYER_SET_TRACK = 'PLAYER_SET_TRACK'
export const PLAYER_PLAYING = 'PLAYER_PLAYING'
export const PLAYER_PAUSED = 'PLAYER_PAUSED'

export const playTrack = (track) => {
    return dispatch => {
        dispatch(setTrack(track))
        dispatch(playing())
    }
}

export const setTrack = (track) => {
    return {
        type: PLAYER_SET_TRACK,
        track: track.id
    }
}

export const playing = () => {
    return {
        type: PLAYER_PLAYING
    }
}

export const paused = () => {
    return {
        type: PLAYER_PAUSED
    }
}
