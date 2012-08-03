# Crest

Crest helps you troubleshoot REST insterfaces.

Hopefully, it helps you smile while you do it too.

## Using

Well, clone this repo.

Then, you'll probably need to `npm install` some stuff. Stuff like:

 * jquery
 * restler
 * util
 * jsdom

With the dependencies installed, you should be able to do

    node crest.js

And you'll be greeted with the `=)` prompt.

## Environment

The idea with crest is that you can do basic rest operations very easily and get results.

[jQuery](http://jquery.com) is available at `$`, [restler](https://github.com/danwrong/restler) is available at `rest`, and [jsdom](https://github.com/tmpvar/jsdom) (`jsdom`) is also available. So, you can do `rest.post` or `rest.get` or `$(selector).each(...)`.

But you need a few of the builtin commands to make jQuery really useful. Like this bad boy:

### `.load`

You can use `.load` to load in the contents of a webpage into the jQuery context.

    .load http://google.com // loads the google homepage url into the jQuery $ context.
    var $input = $('input'); // selects inputs from the homepage and makes them available at $input.

So that one's nice.  What else is there?

### `.get`

I usually use this when I just need to quick see the contents of an api endpoint. It will also load the contents into `result`.

    .get http://gdata.youtube.com/feeds/api/standardfeeds/most_popular?v=2&alt=json
    // result will now contain the json object returned by that api call
    result.version

### `.cs`

Will append further calls to .load or .get with this site domain name. So, 

    .cs gdata.youtube.com
    .get /feeds/api/standardfeeds/most_popular?v=2&alt=json
    // same as the above example of .get.

### `.pws`

Prints the current site to the console.

### `.creds`

Adds basic auth credentials to all further calls within `rest`. Useful when you need the credential your api calls.

    .creds username password
    // sends basicauth credentials "username:password" with further rest calls
    .get http://somesite.info/protected/api/call

## Questions?

Ask, email, fork this repo, submit pull requests, etc.

## Credits

`crest` is heavily inspired by the work done by [Dav Glass](https://github.com/davglass) and presented in [YUI Theater](http://www.yuiblog.com/blog/2010/09/29/video-glass-node/).  And of course, [Ryan Dahl's](https://github.com/ry) [nodejs](http://nodejs.org) is awesome.