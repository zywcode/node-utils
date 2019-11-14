let fs = require('fs');
let _ = require('lodash');
let path = require('path');
let request = require('request');

let method = "queryNumber", prefix = 186, keyword = "";
let reg = /(.*)=(.*)/;
process.argv.forEach(arg => {
  let exec = reg.exec(arg);
  if (exec) {
    if (exec[1] == "method") {
      method = exec[2];
    } else if (exec[1] == "prefix") {
      prefix = exec[2];
    } else if (exec[1] == "keyword") {
      keyword = exec[2];
    }
  }
});

console.log("method: ", method);
let dir_path = path.join(__dirname);
console.log(dir_path);

let counter = 0;

const writefile = (outputs) => {
  console.log("\n-------------appendfile--------------\n");
  var filename = "unicomNumberCenter" + prefix;
  var expect_file = path.join(dir_path, filename + '.json');
  fs.appendFile(expect_file, outputs, 'utf-8', (err) => {
    console.log(err);
  });
}

const syncfile = (outputs) => {
  console.log("\n--------------syncfile---------------\n");
  var filename = "uniqAndSort" + prefix;
  var expect_file = path.join(dir_path, filename + '.json');
  fs.writeFile(expect_file, outputs, 'utf-8', (err) => {
    console.log(err);
  });
}

const readfile = () => {
  console.log("\n--------------readfile---------------\n");
  var filename = 'unicomNumberCenter' + prefix;
  var expect_file = path.join(dir_path, filename + '.json');
  var data = fs.readFileSync(expect_file, 'utf-8');
  return data;
}

const jsonp_queryMoreNums = (data) => {
  var numArray = data.numArray;
  var i = 0;
  var string = "";
  while (i < data.numArray.length) {
    var num = numArray[i] + "";
    string += num.indexOf("186") == 0 ? (num + ",") : "";
    i += 12;
  }
  console.log(string);
  writefile(string);
}

const uniqAndSort = () => {
  var json = readfile();
  var array = json.replace(/\n/g, "").trim().split(",");
  array.splice(array.length - 2);
  var uniq = _.sortBy(_.uniq(array));
  syncfile(JSON.stringify(uniq));
}

const queryNumber1 = () => {
  console.log(counter);
  if (counter && counter % 500 == 0) {
    uniqAndSort();
  } else {
    var bjurl = 'https://m.10010.com/NumApp/NumberCenter/qryNum?callback=jsonp_queryMoreNums&provinceCode=11&cityCode=110&monthFeeLimit=0&groupKey=85236889&searchCategory=3&net=01&amounts=200&codeTypeCode=&searchValue=&qryType=02&goodsNet=4&_=' + new Date().getTime();
    // var jnurl = 'https://m.10010.com/NumApp/NumberCenter/qryNum?callback=jsonp_queryMoreNums&provinceCode=17&cityCode=170&monthFeeLimit=0&groupKey=17236695&searchCategory=3&net=01&amounts=200&codeTypeCode=&searchValue=&qryType=02&goodsNet=4&_=' + new Date().getTime();
    // var tjurl = 'https://m.10010.com/NumApp/NumberCenter/qryNum?callback=jsonp_queryMoreNums&provinceCode=13&cityCode=130&monthFeeLimit=0&groupKey=36236594&searchCategory=3&net=01&amounts=200&codeTypeCode=&searchValue=&qryType=02&goodsNet=4&_=' + new Date().getTime();
    // var shurl = 'https://m.10010.com/NumApp/NumberCenter/qryNum?callback=jsonp_queryMoreNums&provinceCode=31&cityCode=310&monthFeeLimit=0&groupKey=34236498&searchCategory=3&net=01&amounts=200&codeTypeCode=&searchValue=&qryType=02&goodsNet=4&_=' + new Date().getTime();
    // console.log(url);
    var options = {
      url: bjurl,
      headers: {
        'User-Agent': 'request'
      }
    };
    request(options, function (error, response, body) {
      // console.log(response.statusCode);
      if (!error && response.statusCode == 200) {
        eval(body)
      }
    })
  }
  counter++;
}

const queryNumber2 = () => {
  console.log(counter);
  if (counter && counter % 500 == 0) {
    uniqAndSort();
  } else {
    var bjurl = 'http://esim.10010sh.cn/mobile/rest/serviceEncapsulationRest/newUnsoldNum?serialNumber=' + keyword + '&provinceCode=31&cityCode=110&eid=xxx&imei=xxx&sysTag=null';
    var options = {
      url: bjurl,
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json;charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 9; MI 8 Explorer Edition Build/PKQ1.180729.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.96 Mobile Safari/537.36; unicom{version:android@7.0000,desmobile:18600022257};devicetype{deviceBrand:Xiaomi,deviceModel:MI 8 Explorer Edition}',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'com.sinovatech.unicom.ui',
        'Referer': 'http://esim.10010sh.cn/mobile/html/esim/whiteCardOpenCard/openCard.html',
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'
      },
      json: true
    };
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200 && body.respCode == "0000" && body.args && body.args.unsold) {
        let data = body.args.unsold;
        let string = "";
        for (let item of data) {
          if (item.serial_number.indexOf("" + prefix) == 0) {
            string = item.serial_number + ",";
          }
        }
        console.log(string);
        if (string) {
          writefile(string)
        }
      } else {
        console.log(body.respCode);
      }
    });
  }
  counter++;
}

const queryNumber = () => {
  setInterval(queryNumber2, 1000);
}

if (method == "queryNumber") {
  queryNumber();
} else {
  uniqAndSort();
}

