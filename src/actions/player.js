export const PlayerState = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    QUEUED: 4
}

export const PLAYER_SET_STATE = 'PLAYER_SET_STATE'
export const PLAYER_SET_CURRENT_TRACK = 'PLAYER_SET_CURRENT_TRACK'

export const setPlayerState = (state) => {
    return {
        type: PLAYER_SET_STATE,
        state
    }
}

export const setPlayerCurrentTrack = (track) => {
    return {
        type: PLAYER_SET_CURRENT_TRACK,
        track: track.id
    }
}
