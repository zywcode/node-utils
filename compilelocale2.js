let fs = require('fs');
let _ = require('lodash');
let xlsx = require('xlsx');
let path = require('path');

let dir_path = __dirname;
let filename = '中英文汉化文件20220113';
let workbook = xlsx.readFile(dir_path + '/' + filename + '.xlsx');

function writeFile(outputs) {
    let includeKes = ['zh-CN', 'en-US'];
    _.each(outputs, function (v, k) {
        if (_.includes(includeKes, k)) {
            let expect_file = path.join(dir_path + '/' + filename + '/', k + '.json');
            fs.writeFileSync(expect_file, '' + JSON.stringify(v));
        }
    });
}

workbook.SheetNames.forEach(function (sheetName) {
    let reg = /(^")|(^“)|(\"$)|(\",$)|(\"，$)|(”$)|(“,$)|(”，$)/g;
    let roa = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    if (roa.length > 0) {
        let output = {
            "zh-CN": {},
            "en-US": {}
        };
        _.each(roa, function (one) {
            let key = (one.key || '').replace(reg, '');
            one.key = String(key).trim();
            if (one.key) {
                let reg2 = /\\n/g;
                let reg3 = /\\t/g;
                output['zh-CN'][key] = (one['zh-CN'] || '').replace(reg, '').replace(reg2, '\n').replace(reg3, '\t');
                output['en-US'][key] = (one['en-US'] || '').replace(reg, '').replace(reg2, '\n').replace(reg3, '\t');
            }
        });
        writeFile(output);
    }
});
