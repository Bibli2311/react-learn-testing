# Experience

Jest forstår ikke JSX.
Installerte babel for det.

Satte inn dette i babl config:
```json
{
    "presets": ["@babel/preset-env", "@babel/preset-react", {
        "runtime": "automatic"
    }]
}
```

lest om config her: https://www.dhiwise.com/post/fixing-the-error-jest-support-for-the-experimental-syntax-jsx

fikk error:
```shell
BABEL] C:\Users\oscar\Downloads\react-learn-testing\src\Counter.test.js: Unknown option: .runtime. Check out https://babeljs.io/docs/en/babel-core/#options for more information about options.
    - Maybe you meant to use
    "presets": [
      ["@babel/preset-react", {
      "runtime": "automatic"
    }]
    ]
    To be a valid preset, its name and options should be wrapped in a pair of brackets
```

Prøvde bare dette:
```json
{
  "presets": [
    ["@babel/preset-react", {
      "runtime": "automatic"
    }]
  ]
}
```

fikk error her:

```shell
 C:\Users\oscar\Downloads\react-learn-testing\src\Counter.test.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import Counter from "./Counter";
    SyntaxError: Cannot use import statement outside a module    
```

søkte opp error-en fant dette:
https://stackoverflow.com/a/64223627/14736127

added this to jest.config.json:
```json
{
    "testEnvironment": "jsdom",
    "transform": {
        "^.+\\.(ts|tsx)?$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest"
    }
}
```

and just this in babel config:
```
{
  "presets": ["@babel/preset-env"]
}
```

but error again:
```shell
SyntaxError: C:\Users\oscar\Downloads\react-learn-testing\src\Counter.test.js: Support for the experimental syntax 'jsx' isn't currently enabled (8:12):

    Add @babel/preset-react (https://github.com/babel/babel/tree/main/packages/babel-preset-react) to the 'presets' section of your Babel config to enable transformation.
```

added `@babel/preset-react` to babel config and got this error:

```shell
  ● Test suite failed to run

    src/Counter.tsx:7:5 - error TS17004: Cannot use JSX unless the '--jsx' flag is provided.
    7     <p>hello world</p>
```


søkte opp error og så denne configen her:
https://stackoverflow.com/questions/50432556/cannot-use-jsx-unless-the-jsx-flag-is-provided

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "allowJs": true,
        "checkJs": false,
        "jsx": "react",
```

lest litt om configen:
https://www.typescriptlang.org/tsconfig/#jsx

Basically erstatter jsx med `React.createElement()` funksjonskall.

Fikk en annen error:
```shell
error TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
```

Google error, fant dette: https://stackoverflow.com/a/65539274/14736127
anbefalte å bruke `react-jsx" for "jsx" felt i "compilerOptions" i ts config.

(Dette er kanskje fordi jeg bruker `@babel/preset-react` noe som tar i bruk den mer optimaliserte måten å transpilere JSX til js med `_jsx` kall istedet for `React.createElement()`. Mer info om det her: https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
)
