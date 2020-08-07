
// a utility function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    var results = regex.exec(location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

let fn = () => {
    let cameFrom = getUrlParameter('from')
    if (cameFrom) {
        let goBack = document.querySelector('.go-back')
        goBack.classList.remove('hidden')
        goBack.innerText += ' to ' + cameFrom
        goBack.href = cameFrom
    }
}

let ready = (fn) => {
    if (document.readyState != 'loading') {
        fn()
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(fn)