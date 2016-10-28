export const PLAYER_LOAD = "PLAYER_LOAD"
export const PLAYER_LOADED = "PLAYER_LOADED"

export const loadPlayer = () => {
    return dispatch => {
        dispatch(startPlayerLoad())
        const player
        dispatch(playerLoaded(player))
    }
}

const startPlayerLoad = () => {
    return {
        type: PLAYER_LOAD
    }
}

const playerLoaded = (player) => {
    return {
        type: PLAYER_LOADED,
        player
    }
}
