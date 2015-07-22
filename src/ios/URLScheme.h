#import <Cordova/CDV.h>

@interface URLScheme : CDVPlugin {
  // Member variables go here.
}

+ (NSString*) urlPath;
+ (void) setUrlPath:(NSString*)value;
+ (NSString*) getUrlPath;
+ (NSString*) urlQuery;
+ (void) setUrlQuery:(NSString*)value;
+ (NSString*) getUrlQuery;

- (void)getURL:(CDVInvokedUrlCommand*)command;

@end
