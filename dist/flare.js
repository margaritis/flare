/*! flare v1.0.0 | (c) 2014 @toddmotto | github.com/toddmotto/flare */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.flare = factory();
  }
})(this, function () {

  'use strict';

  var exports = {};

  var types = {
    category: 'eventCategory',
    action: 'eventAction',
    label: 'eventLabel',
    value: 'eventValue'
  };

  var addEvent = function (obj, type, fn) {
    if (obj.attachEvent) {
      obj['e' + type + fn] = fn;
      obj[type + fn ] = function () {
        obj['e' + type + fn](window.event);
      };
      obj.attachEvent('on' + type, obj[type + fn]);
    } else {
      obj.addEventListener(type, fn, false);
    }
  };

  exports.emit = function (trackers) {
    var track = { hitType: 'event' };
    for (var prop in trackers) {
      if (types[prop]) {
        track[types[prop]] = trackers[prop];
      }
    }
    try {
      ga('send', track);
    } catch (e) {}
  };

  exports.init = function () {
    var nodes = document.querySelectorAll('[data-flare]');
    var i = nodes.length;
    var emit = function () {
      exports.emit(JSON.parse(this.getAttribute('data-flare')));
    };
    while (i--) {
      addEvent(nodes[i], (nodes[i].getAttribute('data-flare-event') || 'click'), emit);
    }
  };

  return exports;

});
