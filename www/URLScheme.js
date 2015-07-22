var exec    = require('cordova/exec'),
    channel = require('cordova/channel'),
    cordova = require('cordova');

function URLScheme = function(){};

URLScheme.prototype.getURL = function(successCallback, errorCallback){
    exec(successCallback, errorCallback, "URLScheme", "getURL", []);
};

var urlScheme = new URLScheme();
var timeId = null;
var timeout = 500;

channel.onCordovaReady.subscribe(function(){
    urlScheme.getURL(function(urlData){
        if(urlData){
            cordova.fireDocumentEvent('appOpenWithURL', urlData);
        }
    }, function(error){
        console.log('get url data error');
    });
});

module.exports = urlScheme;
