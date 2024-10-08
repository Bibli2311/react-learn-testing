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


Fikk til å kjøre testen!


### toBeINDocument()

fikk error her:
```
 expect(...).toBeInTheDocument is not a function
```

er egentlig en del av `jest-dom` fant jeg ut her: https://stackoverflow.com/a/56557915/14736127

installerte pakken:
`npm i @testing-library/jest-dom`

La til import også i test-fila:
`npm i @testing-library/jest-dom`


### Nyttig lenke for vscode keybindings

https://stackoverflow.com/a/38978993/14736127

### Viser ikke elektrisitetsprisen selv om console.log gjør det:

```ts
function APIComponent() {
    const url = "https://www.hvakosterstrommen.no/api/v1/prices/2024/08-18_NO5.json"
    const [electricity, setElectricity] = useState('')
    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((jsonResult) => {
            console.log(jsonResult[0]['NOK_per_kWh'])
            setElectricity(jsonResult[0]["NOK_per_kwh"]) // this was the error, NOK_per_kwh not NOK_per_kWh
        })
    }, [])
    useEffect(() => {
        console.log("electricity: " + electricity)
    }, [electricity])
    return(
        <div>
            <p>
                { electricity}
            </p>
        </div>
    )
}
export default APIComponent
```

Dette var løsningen:
```ts
 useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((jsonResult) => {
            console.log(jsonResult[0]['NOK_per_kWh'])
            console.log(typeof jsonResult[0]['NOK_per_kWh'])
            return jsonResult[0]['NOK_per_kWh']
        })
        .then((result) => setElectricity(result))
```


### Omgjøre tester til typescript

gjorde det og fikk error:
Fikk hjelp her:
https://stackoverflow.com/a/61107618/14736127

installerte 
- @types/jest
- @types/node

La dem til i "types" i tsconfig.
```json
  "compilerOptions": {
    "types": ["node", "jest"]
  }
```

Nå ble `describe` og `expect` gjenkjent.

Men kan fortsatt ikke rendre jsx.
Får denne error-en her:
```shell
src/Counter.test.ts:8:13 - error TS2749: 'Counter' refers to a value, but is being used as a type here. Did you mean 'typeof Counter'?
```

fikk løsning her:
https://stackoverflow.com/a/64036557/14736127

endret test file fra `Counter.test.ts` til `Counter.test.tsx` med "tsx".

__ingen tester funnet__
fikk denne erroren:
```
● Test suite failed to run

    Your test suite must contain at least one test.
```

Men ble løst gjennom å lese docs her:
https://jestjs.io/docs/configuration#testmatch-arraystring
```
By default it looks for .js, .jsx, .ts and .tsx files inside of __tests__ folders
```

Så jeg flyttet test filen til `__tests__` mappe.


