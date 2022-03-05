let fs = require('fs');
let xlsx = require('xlsx');
let path = require('path');
let _ = require('lodash');

function json2excel() {
    let file_name = '中英文汉化文件20220304';
    let dir_path = __dirname;
    let enUS = require(`./${file_name}/en-US.json`);
    let zhCN = require(`./${file_name}/zh-CN.json`);
    let keyList = _.union(Object.keys(enUS), Object.keys(zhCN));
    console.log(keyList);
    let json = [];
    keyList.forEach(key => {
        let item = {};
        item['key'] = key;
        item['zh-CN'] = zhCN[key];
        item['en-US'] = enUS[key];
        json.push(item);
    });
    let worksheet = xlsx.utils.json_to_sheet(json);
    // let ref = keys[1] + ':' + keys[keys.length - 1]; //这个是定义一个字符串 也就是表的范围[A1:C5]
    let workbook = { //定义操作文档
        SheetNames: ['营销云'], //定义表明
        Sheets: {
            '营销云': Object.assign({}, worksheet) //表对象[注意表明]
        },
    }

    xlsx.writeFile(workbook, `./${file_name}/excel.xlsx`);
}

json2excel();
