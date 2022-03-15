const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const getData = async (url) => {
    let params = {
        headers: {
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
            // 'authority': 'v.douyin.com',
            // 'pragma': 'no-cache',
            // 'cache-control': 'no-cache',
            // 'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            // 'sec-ch-ua-mobile': '?0',
            // 'upgrade-insecure-requests': '1',
            // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
            // 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            // 'sec-fetch-site': 'none',
            // 'sec-fetch-mode': 'navigate',
            // 'sec-fetch-user': '?1',
            // 'sec-fetch-dest': 'document',
            // 'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36`
        }
    };
    let [err, res] = await axios.get(url, params).then((res) => [null, res]).catch((err) => [err, null]);
    console.log(err);
    console.log(res.data);
};

const parseHtml = (html) => {

};

const douyinParser = (html) => {
    //将获取到的html结构赋值给$
    const $ = cheerio.load(data);
    var title = $('head title')[0];
    var arr = [];
    aBox.each((index, item) => {
        var img = $(item).find('img').attr('src');
        var name = $(item).find('h6').text();
        var txt = $(item).find('.jieshao').text().trim();
        arr.push({
            img,
            name,
            txt
        })
    })
    console.log(arr);
}


// getData('https://www.baidu.com/');
getData('https://www.douyin.com/video/7070117987516189988');
