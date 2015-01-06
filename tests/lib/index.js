"use strict";

module.exports = process.env.GRUNTPRAGMA_COV ? require('./../../lib-cov') : require('./../../lib');
