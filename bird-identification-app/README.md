<div align="center">
  <br />
    <a href="https://www.youtube.com/channel/UCzrpTaJWhZZNLLE_3obvE2Q" target="_blank">
      <img src="https://i.postimg.cc/rygDVH1m/React-Native-Git-Hub-Cover.png" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-expo-black?style=for-the-badge&logoColor=white&logo=expo&color=FD366E" alt="expo" />
    <img src="https://img.shields.io/badge/NativeWind-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="nativewind" />
  </div>

  <h3 align="center">Bird identification and monitoring app</h3>

   <div align="center">
     Build this project step by step with our detailed tutorial on the <a href="https://www.youtube.com/channel/UCzrpTaJWhZZNLLE_3obvE2Q/videos" target="_blank"><b>StevenCodeCraft</b></a> YouTube channel.
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets](#snippets)
6. 🔗 [Links](#links)
7. 🚀 [More](#more)

## 🚨 Tutorial

This repository contains the code corresponding to an in-depth tutorial available on our YouTube channel, <a href="https://www.youtube.com/channel/UCzrpTaJWhZZNLLE_3obvE2Q" target="_blank"><b>StevenCodeCraft</b></a>.

If you prefer visual learning, this is the perfect resource for you. Follow our tutorial to learn how to build projects like these step-by-step in a beginner-friendly manner!

<a href="https://www.youtube.com/channel/UCzrpTaJWhZZNLLE_3obvE2Q" target="_blank"><img src="https://github.com/sujatagunale/EasyRead/assets/151519281/1736fca5-a031-4854-8c09-bc110e3bc16d" /></a>

## <a name="introduction">🤖 Introduction</a>

Built with React Native to deliver seamless user experiences, this app features a clean design utilizing FlatLists, Linear Gradients, modals, tab bars, icons, and file-based routing with Expo Router.

## <a name="tech-stack">⚙️ Tech Stack</a>

- React Native
- Expo
- NativeWind
- JavaScript
- TypeScript

## <a name="features">🔋 Features</a>

👉 **Audio Playing Capability**: User can record and upload sound and play it back.

👉 **Tab Navigation**: Navigate between sections like the photo screen, sound recording screen and geo-tagging screen with ease using tab navigation.

👉 **Responsiveness**: Smooth performance and adaptability across various devices and screen sizes for a consistent user experience.

and many more, including code architecture and reusability

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npx expo start
```

**Expo Go**

Download the [Expo Go](https://expo.dev/go) app onto your device, then use it to scan the QR code from Terminal and run.

**iOS Simulator**

Navigate to the [Expo documentation](https://docs.expo.dev/workflow/ios-simulator/) to learn how to install and run your application on an iOS Simulator for local development.

**Android Emulator**

Navigate to the [Expo documentation](https://docs.expo.dev/workflow/android-studio-emulator/) to learn how to install and run your application on an Android Emulator for local development.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>tailwind.config.js</code></summary>

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the app folder
    "./components/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the components folder]
  ],
  theme: {
    extend: {
      fontFamily: {
        rmono: ["Roboto-Mono", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

</details>

<details>
<summary><code>Font Loaded</code></summary>

```javascript
const [fontsLoaded, error] = useFonts({
  "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
});
```

</details>


<details>
<summary><code>TypeScript file for Bird data</code></summary>

```javascript

export interface BirdFindType {
  id: number;
  title: string;
  image: string;
}

export const BIRD_DATA: BirdFindType[] = [
  {
    id: 1,
    title: "Camera",
    image: "trees.webp",
  },
  {
    id: 2,
    title: "Rivers",
    image: "river.webp",
  },
  {
    id: 3,
    title: "Waterfall",
    image: "waterfall.webp",
  },
];

```
</details>


## <a name="links">🔗 Links</a>

Assets and constants used in the project can be found [here](https://drive.google.com/drive/folders/1ZNn-26vUkscU4Bx08BQsyY_i0HkbuzH5?usp=sharing)

## <a name="more">🚀 More</a>

**Advance your skills with StevenCodeCraft Courses**

Enjoyed creating this project? Dive deeper into web development fundamentals with our PRO courses, offering beginner-friendly learning material. Give it a go!"

<a href="https://stevencodecraft.com" target="_blank">
    StevenCodeCraft.com
</a>
