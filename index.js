const fs = require('fs');

const DateError = function(code) {
    const errorDict = {
        1: '请填入初始年份',
        2: '缺少结束年份',
        3: '年份格式错误',
    }
    this.code = code;
    this.message = this.errorDict[code];
}

const date = new Date();
const months = Array(12).fill().map((item, index) => ++index);

// default params
const _defaultlStartYear = 1880;
const _defaultEndYear = date.getFullYear();

const defaultSetting = {
    startYear: _defaultlStartYear,
    endYear: _defaultEndYear,
}

function init(initObj = defaultSetting) {
    if (Object.prototype.toString.call(initObj) === '[object Object]') {
        // 
    } else {
        throw new Error('')
    }
}

exports.init = init;

const arr = [];
for (let i = _defaultlStartYear; i <= _defaultEndYear; i++) {
    const yObj = {};
    yObj['name'] = i;
    yObj['sub'] = months.map((m) => {
        const mObj = {};
        const date = new Date(i, m, 0).getDate();
        mObj['name'] = m >= 10 ? '' + m : '0' + m;
        mObj['sub'] = Array(date).fill().map((d, index) => {
            const dObj = {};
            const curDate = ++index;
            dObj['name'] = curDate >= 10 ? '' + curDate : '0' + curDate;
            return dObj;
        })
        return mObj;
    });
    arr.push(yObj);
}

const json = JSON.stringify(arr);
fs.writeFile('yyyyMMdd.json', json, function() {})