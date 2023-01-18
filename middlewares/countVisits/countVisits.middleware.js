const logger = require('../../utils/winston')

const countVisits = (req, res, next) => {
    logger.info('req count visits:    ',req)
    req.session.visits = req.session.visits ? req.session.visits + 1 : 1
    next()
}
module.exports = {
    countVisits
}
