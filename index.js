((fn) => {
    if (document.readyState != 'loading') fn()
    else document.addEventListener('DOMContentLoaded', fn)
})(() => {
    let params = Object.fromEntries(new URLSearchParams(location.search))

    if (params.from) {
        let goBack = document.querySelector('.go-back')

        goBack.classList.remove('hidden')
        goBack.innerText += ' to ' + params.from
        goBack.href = params.from

        // parse sites list
        if (params.to) {
            var sites = [...document.querySelectorAll('.ring ol li a')]
            var current_site = sites.findIndex(site => site.href === params.from)
        }

        if (params.to === 'next')
            console.log(sites[(current_site + 1) % sites.length].href);
        else if (params.to === 'prev') console.log(sites[(current_site - 1 + sites.length) % sites.length].href)

    }
})