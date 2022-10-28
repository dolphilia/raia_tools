# raia_tools

# 導入メモ

```sh
touch main.js
npm init --yes
npm install --save @babel/standalone
npm i nexe -g
```

```javascript
var Babel = require("@babel/standalone");
var input = 'const getMessage = () => "Hello World";';
var output = Babel.transform(input, { presets: ["env"] }).code;
console.log(output);
for(var i = 0;i < process.argv.length; i++){
    console.log("argv[" + i + "] = " + process.argv[i]);
}
```

```sh
nexe main.js --target mac-x64-10.10.0
```

- `target`で選べる[対象プラットフォーム](https://github.com/nexe/nexe/releases)