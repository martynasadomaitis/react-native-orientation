export declare type OrientationType = "LANDSCAPE" | "LANDSCAPE-LEFT" | "LANDSCAPE-RIGHT" | "PORTRAIT" | "PORTRAITUPSIDEDOWN" | "UNKNOWN";
export declare type ListenerFunction = (error: string, orientation: OrientationType) => void;
export interface CallbackFunction {
    (orientation: OrientationType): void;
    key?: string;
}
export default class Orientation {
    private static listeners;
    static LANDSCAPE: OrientationType;
    static LANDSCAPE_LEFT: OrientationType;
    static LANDSCAPE_RIGHT: OrientationType;
    static PORTRAIT: OrientationType;
    static PORTRAIT_UPSIDE_DOWN: OrientationType;
    static UNKNOWN: OrientationType;
    private static getKey;
    static getOrientation: (callback: ListenerFunction) => void;
    static getSpecificOrientation: (callback: ListenerFunction) => void;
    static lockToPortrait: () => void;
    static lockToLandscape: () => void;
    static lockToLandscapeRight: () => void;
    static lockToLandscapeLeft: () => void;
    static unlockAllOrientations: () => void;
    static addOrientationListener: (callback: CallbackFunction) => void;
    static removeOrientationListener: (callback: CallbackFunction) => void;
    static addSpecificOrientationListener: (callback: CallbackFunction) => void;
    static removeSpecificOrientationListener: (callback: CallbackFunction) => void;
    static getInitialOrientation: () => OrientationType;
}
