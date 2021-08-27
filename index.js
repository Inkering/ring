const normalizeUrl = require('normalize-url')
window.normalizeUrl = normalizeUrl

/**
 * Remove the protocol from a url
 * @param {string}} url The url to remove the protocl from
 */
function withoutProtocol (url) {
    return url.split('//').slice(1).join('')
}

/**
 * Prettify a URL, removing trailing slash and protocol
 * @param {string} url The url to prettify
 */
function prettifyUrl (url) {
    return withoutProtocol(normalizeUrl(url))
}

/**
 * Compare whether two urls are equal after normalizing them
 * @param {string} a The first url to compare
 * @param {string} b The second url to compare
 */
function compareUrls (a, b) {
    if (a === b) {
        return true
    }

    return prettifyUrl(a) === prettifyUrl(b)
}

function onceReady (fn) {
    if (document.readyState !== 'loading') fn()
    else document.addEventListener('DOMContentLoaded', fn)
}

/**
 * Returns [url, index]
 * @param {*} from The from parameter 
 */
function validFromUrl (from) {
    let sites = [...document.querySelectorAll('.ring ol li a')]
    const current_site_anchor = sites.find(site => compareUrls(site.href, from))
    return [current_site_anchor.href, sites.indexOf(current_site_anchor)]
}

function getPreviousSite(current_index) {
    return getSiteRelative(current_index, -1)
}

function getNextSite(current_index) {
    return getSiteRelative(current_index, 1)
}

/**
 * Return the site in the web ring offset by `delta`
 * @param {*} current_index The current index in the web ring of sites
 * @param {*} delta How far forward/backward to jump
 */
function getSiteRelative(current_index, delta) {
    let sites = [...document.querySelectorAll('.ring ol li a')]
    return sites[(current_index + delta + sites.length) % sites.length].href
}

onceReady(() => {
    let params = Object.fromEntries(new URLSearchParams(location.search))

    let [current_site, current_index] = validFromUrl(params.from)
    if (current_site) {
        // render the navigation backwards link
        let goBack = document.querySelector('.go-back')

        goBack.classList.remove('hidden')
        goBack.innerText += ' to ' + prettifyUrl(params.from)
        goBack.href = current_site

        // render the navigation forwards link
        let goForward = document.querySelector('.go-forward')
        const nextSite = getNextSite(current_index)
        
        goForward.classList.remove('hidden')
        goForward.innerText = goForward.innerText.replace('$next', prettifyUrl(nextSite))
        goForward.href = nextSite

        // Handle redirects included in the url query
        if (params.to === 'next')
            window.location.href = (getNextSite(current_index));
        else if (params.to === 'prev') window.location.href = getPreviousSite(current_index)

    }
})