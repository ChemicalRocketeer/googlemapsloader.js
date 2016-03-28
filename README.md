#Google Maps Loader
googlemapsloader.js offers a solution to a quirk of Google Maps: the Maps API doesn't work when loaded multiple times in a page. If you have a dynamic page made out of multiple modules or partials, which each require different parts of the Google Maps API, it can become difficult to keep the modules decoupled. googlemapsloader.js will allow you to share a single instance of the google maps script without awkward dependencies between modules. It does this by gathering each module's requirements, and making a single Maps API request after all other scripts have been executed.

##Usage
googlemapsloader.js is easy to use. First, load the script in each module that requires it. This will add a `window.google_maps_loader` object. Then you can set your API key and your options for the maps request.

All the google_maps_loader functions are chainable, so you can set up your module's requirements all in one statement:
```
google_maps_loader.useKey(API_KEY).signIn().require('places', callback)
```

###require
To require a google library, use `window.google_maps_loader.require([library[, library[, ...]], [callback])` in your module, template, or partial.
```
<script src="googlemapsloader.js"></script>
<script>
  google_maps_loader.require('places', 'geometry', function() {
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
