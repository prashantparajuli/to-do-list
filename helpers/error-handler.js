function errorHandler(err, req, res, next) {
    if (err) {
        res.json({ message: err.name });
    }
    next();
}
module.exports = errorHandler;