const errorHandler = (err, req, res, next) => {
    console.log(res.headersSent);
    if (res.headersSent) {
        return next(err);
    }

    console.error(err);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation Error',
            error: err.message,
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: 'Unauthorized',
            error: err.message,
        });
    }

    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: err.message || 'Internal Server Error',
        statusCode: statusCode
    });
};
module.exports = errorHandler;