#import <Cordova/CDV.h>

@interface URLScheme : CDVPlugin {
  // Member variables go here.
}

+ (void) setUrlPath:(NSString*)value;
+ (NSString*) getUrlPath;

- (void)getURL:(CDVInvokedUrlCommand*)command;

@end
