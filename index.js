const debug = require('debug')('express-request-to-json');

const constructors = [
  require('http').ServerResponse,
  require('http').ClientRequest,
  require('net').Socket,
  require('express').Route,
  require('stream').Readable.ReadableState
];

/**
 * Filter out useless keys before logging an express req.
 * @param {http.IncomingRequest} The req to filter.
 * @returns A shallow copy of req.
 */
module.exports = function (req) {
  const keys = Object.keys(req);
  const ret = {};
  keys.forEach((key) => {
    if (constructors.some((c) => req[key] instanceof c)) {
      return debug('removing', key, req[key] && req[key].constructor && req[key].constructor.name);
    }
    ret[key] = req[key];
  });
  return ret;
};
