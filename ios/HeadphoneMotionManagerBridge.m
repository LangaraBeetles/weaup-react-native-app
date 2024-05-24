//
//  HeadphoneMotionManagerBridge.m
//  beetlesmobile
//
//  Created by Wonnyo Hamester on 2024-05-23.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(HeadphoneMotionManager, NSObject)
RCT_EXTERN_METHOD(startUpdates)
RCT_EXTERN_METHOD(stopUpdates)
@end

