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

function isProd() {
    return (window.location.hostname === 'brexit.vote');
}