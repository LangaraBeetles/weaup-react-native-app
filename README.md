# beetles-mobile

## Installation

```bash
yarn install
```

## Run

To just start the Expo server

```bash
yarn start
```

To clear the cache and start the Expo server

```bash
yarn restart
```

or with the Android emulator

```bash
yarn android
```

or with the iOS emulator

```bash
yarn ios
```

### Note

If prompted to log in, use this

```bash
yarn expo login -u YOUR_USERNAME -p YOUR_PASSWORD
```

## Build

https://docs.expo.dev/build/setup/

### SDK Environment Variables

Add a file called `local.properties` in your android directory and add the path to your Android SDK like this:

for Windows

```bash
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
```

for macOS/Linux

```bash
sdk.dir=/Users/YourUsername/Library/Android/sdk
```

### EAS

```bash
npm install -g eas-cli
```

```bash
eas login
```

```bash
eas build --platform android
```

```bash
eas build --platform ios
```

```bash
eas build --platform all
```

### Local Build

Build for iOS

```bash
npx expo run:ios
```

Build for Android

```bash
npx expo run:android
```

## Re-build

If you're developing locally:

```bash
npx expo prebuild
```

If you're using Expo EAS:

```bash
eas build --profile development --platform android
```


## Native IOS Module
```bash
npx create-react-native-library@latest ios-headphone-motion
```

```bash
yarn
```

```bash
cd ios
```

```bash
pod install
```

```bash
yarn ios --device
```


## Important Links

- https://blog.expo.dev/the-new-expo-cli-f4250d8e3421

- https://docs.expo.dev/eas/

#### Relative paths

- https://www.npmjs.com/package/babel-plugin-module-resolver
- https://www.npmjs.com/package/@babel/plugin-transform-react-jsx-source

> To add more relative paths, update the files:
>
> - tsconfig.json
> - babel.config.js


## Headphone Motion Module

Documentation: https://github.com/XHMM/react-native-headphone-motion

These are the steps I followed to create the module
```
npx expo prebuild --clean

npx create-react-native-library@latest ios-headphone-motion

yarn install

npx expo install expo-build-properties # to define the minimum development target for ios, it must be 15^


```

These are the commands to run the app
```
npx pod-install

yarn ios --device
```

I created a new command to achieve the same
```
yarn ios:pods
```
