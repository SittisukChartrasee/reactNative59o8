//
//  KMyFundOnboarding.m
//  KbankOnboarding
//
//  Created by codefin3 on 7/31/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "Onboarding.h"

@implementation KMyFundOnboarding
  NSString *STATUS_APPROVE = @"approve";
  NSString *STATUS_NEW_CUSTOMER = @"new_customer";

  - (NSDictionary *)constantsToExport {
    return @{
      @"STATUS_APPROVE": STATUS_APPROVE,
      @"STATUS_NEW_CUSTOMER": STATUS_NEW_CUSTOMER,
    };
  }

  RCT_EXPORT_MODULE(KMyFundOnboarding);

  RCT_EXPORT_METHOD(saveRegisterFlag:(NSString *)value)  {
    NSLog(@"saveRegisterFlag : %@", value);
  }

  RCT_EXPORT_METHOD(getRegisterFlag: (RCTResponseSenderBlock)callback) {
    NSLog(@"%s", "getRegisterFlag");
    callback(@[@"getRegisterFlag"]);
  }

  RCT_EXPORT_METHOD(saveUserToken: (NSString *)token) {
    NSLog(@"saveUserToken : %@", token);
  }

  RCT_EXPORT_METHOD(getUserToken: (RCTResponseSenderBlock)callback) {
    NSLog(@"%s", "getUserToken");
    callback(@[@"getUserToken"]);
  }

  RCT_EXPORT_METHOD(saveVersionAppKMyFunds: (NSString *)value) {
    NSLog(@"saveVersionAppKMyFunds : %@", value);
  }

  RCT_EXPORT_METHOD(getVersionAppKMyFunds: (RCTResponseSenderBlock)callback) {
    NSLog(@"%s", "getVersionAppKMyFunds");
    callback(@[@"1.7.2"]);
  }

  RCT_EXPORT_METHOD(saveFCMToken: (NSString *)token) {
    NSLog(@"saveFCMToken : %@", token);
  }

  RCT_EXPORT_METHOD(getFCMToken: (RCTResponseSenderBlock)callback) {
    NSLog(@"%s", "getFCMToken");
    callback(@[@"getFCMToken"]);
  }

  RCT_EXPORT_METHOD(getDeviceInfo: (RCTResponseSenderBlock)callback) {
    NSLog(@"%s", "getDeviceInfo");
    callback(@[@"getDeviceInfo"]);
  }

  RCT_EXPORT_METHOD(autoLogin: (NSString *)code token:(NSString *)token) {
    NSLog(@"autoLogin : %@ %@", code, token);
  }

  RCT_EXPORT_METHOD(finishActivity)
  {
    NSLog(@"%s", "finishActivity");
  }

@end


