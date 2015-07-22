/********* URLScheme.m Cordova Plugin Implementation *******/

@implementation URLScheme

static NSString* urlPath = nil;
+ (void)setUrlPath:(NSString*)value { urlPath = value; }
+ (NSString*)getUrlPath { return urlPath; }

static NSString* urlQuery = nil;
+ (void)setUrlQuery:(NSString*)value { urlQuery = value; }
+ (NSString*)getUrlQuery { return urlQuery; }

- (void)getURL:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* echo = [command.arguments objectAtIndex:0];

    if (echo != nil && [echo length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:echo];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
