export const WEB_API = {
    DOMAIN: isProd() ? 'https://gentle-springs-69512.herokuapp.com' : 'http://localhost:3000',
    ENDPOINTS: {
        VOTE: '/api/vote'
    }
};

export const LOCALSTORAGE = {
    KEYS: {
        TOKEN: 'brexit_token',
        VOTE: 'brexit_vote'
    }
};

export const TEXTS = {
    intro: `On June 23rd 2016, the people of Britain will vote on whether they wish to 'remain' or 'leave'
    the European Union in an EU referendum. A decision on brexit affects the whole of the EU and will have a broader global impact.
    Submit your view at brexit.vote, and we will create a global perspective. Individual votes are not shared. `
};

function isProd() {
    return (window.location.hostname === 'brexit.vote');
}