import { NativeModules, DeviceEventEmitter, EmitterSubscription } from "react-native";
import cuid from "cuid";

const OrientationModule = NativeModules.Orientation;

export type OrientationType = "LANDSCAPE" | "PORTRAIT" | "PORTRAITUPSIDEDOWN" | "UNKNOWN";

export type ListenerFunction = (error: string, orientation: OrientationType) => void;

export interface CallbackFunction {
  (orientation: OrientationType): void;

  key?: string;
}

const orientationDidChangeEvent = "orientationDidChange";
const specificOrientationDidChangeEvent = "specificOrientationDidChange";

export default class Orientation {
  static listeners: { [key: string]: EmitterSubscription } = {};

  static getKey = (subject: EmitterSubscription | CallbackFunction) => {
    if (!subject.key) {
      subject.key = cuid();
    }

    return subject.key;
  };

  static getOrientation = (callback: ListenerFunction) => {
    OrientationModule.getOrientation((error: string, orientation: OrientationType) => {
      callback(error, orientation);
    });
  };

  static getSpecificOrientation = (callback: ListenerFunction) => {
    OrientationModule.getSpecificOrientation((error: string, orientation: OrientationType) => {
      callback(error, orientation);
    });
  };

  static lockToPortrait = () => {
    OrientationModule.lockToPortrait();
  };

  static lockToLandscape = () => {
    OrientationModule.lockToLandscape();
  };

  static lockToLandscapeRight = () => {
    OrientationModule.lockToLandscapeRight();
  };

  static lockToLandscapeLeft = () => {
    OrientationModule.lockToLandscapeLeft();
  };

  static unlockAllOrientations = () => {
    OrientationModule.unlockAllOrientations();
  };

  static addOrientationListener = (callback: CallbackFunction) => {
    const key = Orientation.getKey(callback);
    Orientation.listeners[key] = DeviceEventEmitter.addListener(
      orientationDidChangeEvent,
      (body: { orientation: OrientationType }) => {
        callback(body.orientation);
      },
    );
  };

  static removeOrientationListener = (callback: CallbackFunction) => {
    const key = Orientation.getKey(callback);
    const listener = Orientation.listeners[key];

    if (!listener) {
      return;
    }

    if (typeof listener.remove === "function") {
      listener.remove();
    }

    delete Orientation.listeners[key];
  };

  static addSpecificOrientationListener = (callback: CallbackFunction) => {
    const key = Orientation.getKey(callback);

    Orientation.listeners[key] = DeviceEventEmitter.addListener(specificOrientationDidChangeEvent, body => {
      callback(body.specificOrientation);
    });
  };

  static removeSpecificOrientationListener = (callback: CallbackFunction) => {
    const key = Orientation.getKey(callback);
    const listener = Orientation.listeners[key];

    if (!listener) {
      return;
    }

    if (typeof listener.remove === "function") {
      listener.remove();
    }

    delete Orientation.listeners[key];
  };

  static getInitialOrientation = (): OrientationType => {
    return OrientationModule.initialOrientation;
  };
}
