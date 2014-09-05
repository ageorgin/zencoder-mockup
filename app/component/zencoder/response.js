/**
 * Created by ageorgin on 09/07/14.
 */

// Package inclusion
var Response = require('../response');

// Constructor
function ZencoderResponse() {
    Response.call(this, {id:null, outputs:[]});
}

ZencoderResponse.prototype.addOutput = function(output) {
    this.data.outputs.push(output);
}

ZencoderResponse.prototype.__proto__ = Response.prototype;

module.exports = ZencoderResponse;
