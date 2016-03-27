if (!window.jQuery) {
  console.warn('google_maps_loader requires jQuery, but jQuery is not loaded.');
} else if (!window.google_maps_loader) {
  window.google_maps_loader = (function() {
    var apiKey;
    var required = [];
    var listeners = [];
    var state = 'idle';

    // set the api key to use
    function useKey(key) {
      if (typeof key === 'string') apiKey = key;
      return window.google_maps_loader;
    }

    // require one or more maps api elements
    function require(reqs, callback) {
      // force reqs to an array
      if (typeof reqs === 'string') reqs = [reqs];
      else if (!jQuery.isArray(reqs)) return;

      if (state === 'loaded' && !alreadyRequired(reqs)) {
        console.warn('google_maps_loader already loaded. Could not load libraries ' + reqs.toString());
      } else if (state === 'idle') {
        for (var i = 0; i < reqs.length; i++) {
          if (jQuery.inArray(reqs[i], required) === -1) {
            required.push(reqs[i]);
          }
        }
        if (typeof callback === 'function') {
          listeners.push(callback);
        }
      } else if (typeof callback === 'function') {
        if (state === 'loading') {
          listeners.push(callback);
        } else {
          callback();
        }
      }
      return window.google_maps_loader;
    }

    function alreadyRequired(reqs) {
      for (var i = 0; i < reqs.length; i++) {
        if (jQuery.inArray(reqs[i], required) === -1) {
          return false;
        }
      }
      return true;
    }

    function callListeners() {
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    }

    google_maps_callback = function() {
      state = 'loaded';
      callListeners();
    };

    jQuery(document).ready(function() {
      state = 'loading';
      setTimeout(function() {
        var basicQuery = 'https://maps.googleapis.com/maps/api/js';
        var query = basicQuery;
        var options = [];
        var libs = required.join(',');
        if (libs.length) options.push('libraries=' + libs);
        if (apiKey) options.push('key=' + apiKey);
        options.push('callback=google_maps_callback');
        query += '?' + options.join('&');
        jQuery.getScript(query);
      }, 0);
    });

    return {
      useKey: useKey,
      require: require
    };
  })();
}
