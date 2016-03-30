#Google Maps Loader
The Google Maps API doesn't work when loaded multiple times in a page. If you have a dynamic page made out of multiple modules or partials, which each require different parts of the Google Maps API, it can become difficult to satisfy your modules' requirements while keeping them decoupled. googlemapsloader.js will allow you to share a single instance of the google maps script without awkward dependencies between modules. It does this by gathering each module's requirements, and making a single Maps API request after all other scripts have been executed.

##Usage
googlemapsloader.js is easy to use. Google Maps Loader is dependent on jQuery, so first make sure jQuery is included on your page. Then include the googlemapsloader.js script in each module that requires it. This will add a `window.google_maps_loader` object. Then you can set your API key and your module's options for the maps request.

All the google_maps_loader functions are chainable, so you can set up your module's requirements all in one statement:
```
google_maps_loader.useKey(API_KEY).signIn().require(library, callback)
```

###require
To require a google library, use `window.google_maps_loader.require([library[, library[, ...]], [callback])` in your module, template, or partial.
```
<script src="googlemapsloader.js"></script>
<script>
  google_maps_loader.useKey(API_KEY).require('places', 'geometry', function() {
    console.log(typeof google.maps.places); // object
    console.log(typeof google.maps.geometry); // object
    console.log(typeof google.maps.drawing); // undefined
  });
</script>
```
Be sure to call google_maps_loader functions before `$(document).on('ready')`, or your requirements won't make it into the maps API request.

###useKey
Make sure Google gets your API key by calling `google_maps_loader.useKey(API_KEY)`.

###signIn
If you want to use Google Maps signed in, call the `google_maps_loader.signIn()` function.

###useVersion
To use a specific version of Google Maps, call `google_maps_loader.useVersion(version)` where version is a string containing a Maps version.
