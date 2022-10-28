// パラメーター数が適切でない場合は終了する
if (process.argv.length < 3) {
    console.log("パラメーターを記入してください");
    process.exit(1);
}
if (process.argv.length > 4) {
    console.log("パラメーターの数が多すぎます");
    process.exit(1);
}

// 親ディレクトリを抜き出す
const path = require('path');
const parent = path.dirname(process.argv[1]);
const fs = require('fs');
const input_filename = process.argv[2];
const input_filepath = parent + "/" + input_filename;

// 入力ファイルが存在しない場合は終了する
if (!fs.existsSync(input_filepath)) {
    console.log( "入力ファイルが存在しません。");
    process.exit(1);
}

// ファイルを読み込んでトランスコンパイルする
let input_code;
try {
    input_code = fs.readFileSync(input_filepath);
} catch(e) {
    console.log(e.message);
    process.exit(1);
}
const Babel = require("@babel/standalone");
const output_code = Babel.transform(input_code, { presets: ["env"] }).code;

// 出力ファイル名の指定があった場合はそれを使用し、なければoutput.jsとする
let output_filename = "output.js";
if (process.argv.length === 4) {
    output_filename = process.argv[3];
}

// コードをファイルに書き込む
const output_filepath = parent + "/" + output_filename;
try {
    fs.writeFileSync(output_filepath, output_code);
} catch(e) {
    console.log(e.message);
    process.exit(1);
}