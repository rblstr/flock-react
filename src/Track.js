import URI from 'urijs'

import {
    REDDIT_URL,
    YOUTUBE_URL_TEMPLATE,
    YOUTUBE_DOMAIN,
    YOUTUBE_SHORT_DOMAIN
} from './constants'

const isValidTrackURL = link => {
    const uri = URI(link.url)
    return (
        (uri.domain() === YOUTUBE_DOMAIN && uri.query(true).v !== undefined) ||
        (uri.domain() === YOUTUBE_SHORT_DOMAIN)
    )
}

const sanitizeURL = track => {
    const uri = URI(track.url)
    if (uri.domain() === YOUTUBE_SHORT_DOMAIN) {
        const videoId = uri.pathname().substr(1)
        return {...track, url: `${YOUTUBE_URL_TEMPLATE}${videoId}`}
    } else {
        return track
    }
}

export const trackToVideoId = track => URI(track.url).query(true).v

export const processTracks = tracks => Promise.resolve(tracks.filter(isValidTrackURL).map(sanitizeURL))

const Track = ({
    id,
    title,
    permalink,
    url,
    ups,
    downs
} = {}) => ({
    id,
    title,
    permalink: `${REDDIT_URL}${permalink}`,
    url,
    ups,
    downs
})

export default Track 
