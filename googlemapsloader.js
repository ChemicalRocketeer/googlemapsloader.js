if (!window.jQuery) {
  console.warn('google_maps_loader requires jQuery, but jQuery is not loaded.');
} else if (!window.google_maps_loader) {
  window.google_maps_loader = (function() {
    var apiKey;
    var required = [];
    var listeners = [];
    var signedIn = false;
    var state = 'idle';

    // set the api key to use
    function useKey(key) {
      if (typeof key === 'string') apiKey = key;
      return window.google_maps_loader;
    }

    // require one or more maps api elements. Arguments are a callback function and one or more google libraries to load. Both are optional.
    function require() {
      var callback;
      var reqs = [];
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (typeof arg === 'function') {
          callback = arg;
        } else if (typeof arg === 'string') {
          reqs.push(arg);
        } else if (jQuery.isArray(arg)) {
          reqs = reqs.concat(arg);
        }
      }
      if (reqs && reqs.length) {
        if (state === 'loaded' || state === 'loading') {
          console.warn('google_maps_loader.require is being called after the maps script has been fetched. There is no guarantee your required libraries will be loaded.');
        } else {
          for (var i = 0; i < reqs.length; i++) {
            if (jQuery.inArray(reqs[i], required) === -1) {
              required.push(reqs[i]);
            }
          }
        }
      }
      if (callback) {
        if (state === 'loaded') {
          callback();
        } else {
          listeners.push(callback);
        }
      }
      return window.google_maps_loader;
    }

    function signIn(value) {
      if (typeof value === 'undefined') value = true;
      signedIn = value;
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
