const logger = require('../utils/winston')

const authMiddleware = (req, res, next) => {
    logger.info(req.session)
    if (!req.session?.username || !req.session?.admin) {
        return res.status(401).send('<h1>No estas autorizado</h1>')     
    } 
    next()
}

module.exports = { 
    authMiddleware
}