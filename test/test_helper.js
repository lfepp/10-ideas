'use strict';

// Import chai for server specs
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
// Import jsdom for client specs
import jsdom from 'jsdom';

// Set up chai to use the chai-immutable module
chai.use(chaiImmutable);

// Set up sample DOM for jsdom
global.document = jsdom.jsdom('<!DOCTYPE html><html><head></head><body></body></html>');
global.window = global.document.defaultView;

Object.keys(window).forEach((key) => {
  if(!(key in global)) {
    global[key] = window[key];
  }
})
