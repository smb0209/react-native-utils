#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>

@interface KeepAwake : NSObject <RCTBridgeModule>
@end

@implementation KeepAwake

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setKeepAwake:(BOOL)enable)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [UIApplication sharedApplication].idleTimerDisabled = enable;
  });
}

@end
