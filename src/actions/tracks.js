export const TRACK_PLAY = 'TRACK_PLAY'

export const playTrack = (track) => {
    return {
        type: TRACK_PLAY,
        track: track.id
    }
}
