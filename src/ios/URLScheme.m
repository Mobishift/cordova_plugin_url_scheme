/********* URLScheme.m Cordova Plugin Implementation *******/

#import "URLScheme.h"

@implementation URLScheme

static NSString* urlPath = nil;
+ (void)setUrlPath:(NSString*)value { urlPath = value; }
+ (NSString*)getUrlPath { return urlPath; }

- (void)getURL:(CDVInvokedUrlCommand*)command
{

    NSDictionary* json = nil;
    if(urlPath != nil){
        json = [NSDictionary dictionaryWithObject:urlPath forKey:@"urlPath"];
        urlPath = nil;
    }

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:json];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
