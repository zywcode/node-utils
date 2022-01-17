let fs = require('fs');
let xlsx = require('xlsx');
let path = require('path');

let file_name = 'xiaomi';
let dir_path = __dirname;
let workbook = xlsx.readFile(dir_path + `/keyword/${file_name}.xlsx`);

function writeFile(json) {
    let expect_file = path.join(dir_path + `/output/${file_name}.json`);
    fs.writeFileSync(expect_file, '' + JSON.stringify(json));
}

workbook.SheetNames.forEach(function (sheetName) {
    let roa = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]) || [];
    roa.forEach((item) => {
        item.word_type = 0;
        item.topic_count = Number(item.topic_count);
    });
    let res = {
        status_code: 200,
        message: 'ok',
        result: roa,
        total: roa.length
    }
    writeFile(res);
});
