let fs = require('fs');
let _ = require('lodash');
let xlsx = require('xlsx');
let path = require('path');

let dir_path = __dirname;
let filename = '中英文汉化文件20220128';
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
    let roa = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    if (roa.length > 0) {
        let output = {
            "zh-CN": {},
            "en-US": {}
        };
        let reg = / /g;
        _.each(roa, function (one) {
            let key = String(one.key || '').replace(reg, ' ').trim();
            one.key = key;
            if (one.key) {
                output['zh-CN'][key] = (one['zh-CN'] || '').replace(reg, ' ') || ' ';
                output['en-US'][key] = (one['en-US'] || '').replace(reg, ' ') || ' ';
            }
        });

        writeFile(output);
    }
});
