export const requestLogger = (req, res, next) => {
    console.log(`Request Method: ${req.method} - Request URL: ${req.url} [STARTED]`)
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`Request Method: ${req.method} - Request URL: ${req.url} [FINISHED] - Duration: ${duration}ms`);
    });
    next();
};

export const errorLogger = (err, req, res, next) => {
    console.error(`[ERROR] ${err.stack}`);
    next(err);
}
