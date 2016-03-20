export const submitVote = () => {
    return {
        type: 'SUBMIT_VOTE'
    };
};

export const voteSuccess = (questionId, answerId) => {
    return {
        type: 'VOTE_SUCCESSFUL',
        questionId,
        answerId
    };
};

export const authSuccess = (data) => {
    return {
        type: 'AUTH_SUCCESSFUL',
        data
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};