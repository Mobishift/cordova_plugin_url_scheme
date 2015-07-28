#import <Cordova/CDV.h>

@interface URLScheme : CDVPlugin {
  // Member variables go here.
}

+ (void) setUrlPath:(NSString*)value;
+ (void) sendUrl;

- (void)getURL:(CDVInvokedUrlCommand*)command;

@end
