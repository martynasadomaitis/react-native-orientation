module.exports = {
  dependency: {
    platforms: {
      ios: {
        project: "ios/RCTOrientation.xcodeproj"
      },
      android: {
        packageInstance: "new OrientationPackage()"
      }
    }
  }
};
