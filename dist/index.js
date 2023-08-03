"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var cuid_1 = __importDefault(require("cuid"));
var OrientationModule = react_native_1.NativeModules.Orientation;
var orientationDidChangeEvent = "orientationDidChange";
var specificOrientationDidChangeEvent = "specificOrientationDidChange";
var Orientation = /** @class */ (function () {
    function Orientation() {
    }
    Orientation.listeners = {};
    Orientation.LANDSCAPE = "LANDSCAPE";
    Orientation.LANDSCAPE_LEFT = "LANDSCAPE-LEFT";
    Orientation.LANDSCAPE_RIGHT = "LANDSCAPE-RIGHT";
    Orientation.PORTRAIT = "PORTRAIT";
    Orientation.PORTRAIT_UPSIDE_DOWN = "PORTRAITUPSIDEDOWN";
    Orientation.UNKNOWN = "UNKNOWN";
    Orientation.getKey = function (subject) {
        if (!subject.key) {
            subject.key = cuid_1.default();
        }
        return subject.key;
    };
    Orientation.getOrientation = function (callback) {
        OrientationModule.getOrientation(function (error, orientation) {
            callback(error, orientation);
        });
    };
    Orientation.getSpecificOrientation = function (callback) {
        OrientationModule.getSpecificOrientation(function (error, orientation) {
            callback(error, orientation);
        });
    };
    Orientation.lockToPortrait = function () {
        OrientationModule.lockToPortrait();
    };
    Orientation.lockToLandscape = function () {
        OrientationModule.lockToLandscape();
    };
    Orientation.lockToLandscapeRight = function () {
        OrientationModule.lockToLandscapeRight();
    };
    Orientation.lockToLandscapeLeft = function () {
        OrientationModule.lockToLandscapeLeft();
    };
    Orientation.unlockAllOrientations = function () {
        OrientationModule.unlockAllOrientations();
    };
    Orientation.addOrientationListener = function (callback) {
        var key = Orientation.getKey(callback);
        Orientation.listeners[key] = react_native_1.DeviceEventEmitter.addListener(orientationDidChangeEvent, function (body) {
            callback(body.orientation);
        });
    };
    Orientation.removeOrientationListener = function (callback) {
        var key = Orientation.getKey(callback);
        var listener = Orientation.listeners[key];
        if (!listener) {
            return;
        }
        if (typeof listener.remove === "function") {
            listener.remove();
        }
        delete Orientation.listeners[key];
    };
    Orientation.addSpecificOrientationListener = function (callback) {
        var key = Orientation.getKey(callback);
        Orientation.listeners[key] = react_native_1.DeviceEventEmitter.addListener(specificOrientationDidChangeEvent, function (body) {
            callback(body.specificOrientation);
        });
    };
    Orientation.removeSpecificOrientationListener = function (callback) {
        var key = Orientation.getKey(callback);
        var listener = Orientation.listeners[key];
        if (!listener) {
            return;
        }
        if (typeof listener.remove === "function") {
            listener.remove();
        }
        delete Orientation.listeners[key];
    };
    Orientation.getInitialOrientation = function () {
        return OrientationModule.initialOrientation;
    };
    return Orientation;
}());
exports.default = Orientation;
