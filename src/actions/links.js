import URI from 'urijs'
import 'whatwg-fetch'

export const LINKS_FETCHING = 'LINKS_FETCHING'
export const LINKS_RECIEVED = 'LINKS_RECIEVED'
export const LINKS_ERROR = 'LINKS_ERROR'

export const fetchLinks = (subreddits) => {
    return dispatch => {
        dispatch(linksFetching())

        const subredditsUrl = subreddits.filter(s => s).join('+')
        fetch(`https://www.reddit.com/r/${subredditsUrl}/top.json?limit=100`)
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        const links = json.data.children
                            .map(child => child.data)
                            .filter(post => {
                                const url = URI(post.url)
                                return (url.domain() === 'youtube.com' && url.query(true).v)
                            })
                            .map(child => (
                                {...child, permalink: `https://www.reddit.com${child.permalink}`}
                            ))

                        dispatch(recieveLinks(links))
                    })
                } else {
                    dispatch(linksError())
                }
            })
            .catch(error => dispatch(linksError()))
    }
}

const linksFetching = () => {
    return {
        type: LINKS_FETCHING
    }
}

const recieveLinks = (links) => {
    return {
        type: LINKS_RECIEVED,
        links
    }
}

const linksError = () => {
    return {
        type: LINKS_ERROR
    }
}