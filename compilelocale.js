let fs = require('fs');
let _ = require('lodash');
let xlsx = require('xlsx');
let path = require('path');

let dir_path = __dirname;
let workbook = xlsx.readFile(dir_path + '/locale.xlsx');

function writeFile(outputs) {
    let includeKes = ['zh-CN', 'en-US'];
    _.each(outputs, function (v, k) {
        if (_.includes(includeKes, k)) {
            let expect_file = path.join(dir_path + '/output/', k + '.json');
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
        _.each(roa, function (one) {
            one.key = String(one.key || '').trim();
            if (one.key) {
                output['zh-CN'][one.key] = one['zh-CN'] || '';
                output['en-US'][one.key] = one['en-US'] || '';
            }
        });
        writeFile(output);
    }
});
