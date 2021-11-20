let fs = require('fs');
let _ = require('lodash');
let path = require('path');
let readline = require('readline');
let dir_path = __dirname;

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function compare(file1, file2) {
    let originalFile1 = require(`./${file1}`);
    let originalFile2 = require(`./${file2}`);
    let output = {};
    output[`diff.${file1}`] = {};
    output[`diff.${file2}`] = {};
    _.each(originalFile1, function (v, k) {
        if (!originalFile2[k]) {
            output[`diff.${file2}`][k] = v;
            console.log(k, v);
        }
    });
    _.each(originalFile2, function (v, k) {
        if (!originalFile1[k]) {
            output[`diff.${file1}`][k] = v;
        }
    });
    console.log(output);
    writeFile(output, `diff.${file1}`, `diff.${file2}`);
}

function writeFile(outputs, file1, file2) {
    let includeKes = [file1, file2];
    _.each(outputs, function (v, k) {
        if (_.includes(includeKes, k)) {
            let expect_file = path.join(dir_path + '/output/', k);
            fs.writeFileSync(expect_file, JSON.stringify(v));
        }
    });
}


rl.question(`请输入要比较的文件1(***.json)：`, (file1) => {
    rl.question(`请输入要比较的文件2(***.json)：`, (file2) => {
        compare(file1, file2);
        rl.close();
    });

});
