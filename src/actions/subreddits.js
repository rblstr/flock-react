export const SUBREDDITS_UPDATE = 'SUBREDDITS_UPDATE'

export const updateSubreddits = (subreddits) => {
    return {
        type: SUBREDDITS_UPDATE,
        subreddits: subreddits.split(' ')
    }
}
