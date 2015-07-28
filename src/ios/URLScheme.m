/********* URLScheme.m Cordova Plugin Implementation *******/

#import "URLScheme.h"

@implementation URLScheme

static NSString* callbackId = nil;
static NSString* urlPath = nil;
static URLScheme* urlScheme= nil;

+ (void)sendUrl{
    if(callbackId != nil && urlPath != nil){
        NSDictionary* json = [NSDictionary dictionaryWithObject:urlPath forKey:@"urlPath"];
        urlPath = nil;
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:json];
        [pluginResult setKeepCallbackAsBool:true];
        [urlScheme.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
        
    }
}

+ (void)setUrlPath:(NSString*)value {
    urlPath = value;
    [URLScheme sendUrl];
}

- (void)getURL:(CDVInvokedUrlCommand*)command
{
    callbackId = command.callbackId;
    urlScheme = self;
    [URLScheme sendUrl];

}

@end
