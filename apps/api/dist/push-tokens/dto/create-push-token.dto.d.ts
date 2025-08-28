export declare enum Platform {
    ANDROID = "ANDROID",
    IOS = "IOS",
    WEB = "WEB"
}
export declare class CreatePushTokenDto {
    token: string;
    deviceId?: string;
    platform: Platform;
}
