const isEmpty = require('../utils/is-empty');
const isUrl = require('../utils/is-url');

module.exports = (data) => {
    let error = {};

    if (isEmpty(data.title)) {
        error.message = 'Title cannot be empty';
    }

    if (isEmpty(data.description)) {
        error.message = 'Description cannot be empty';
    }

    if (isEmpty(data.url)) {
        error.message = 'URL cannot be empty';
    }

    if (!isUrl(data.url)) {
        error.message = 'Invalid url';
    }

    return {
        error,
        isValid: isEmpty(error)
    };
};
