/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * 函数节流
 */
 export const throttle = (fn, delay = 500) => {
  let timer = null;
  return function() {
    if (timer) return;
    fn.apply(this, arguments);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
};
/**
 * 函数防抖
 */
export const debouncer = (fn, delay = 200) => {
  // 记录上一次的延时器
  let timer = null;
  return function() {
    let args = arguments;
    let that = this;
    // 清除上一次延时器
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(that, args);
    }, delay);
  };
};
/**
 * 获取localStorage
 */
export const getLocal = (key) => {
  let value = localStorage.getItem(key) || '';
  if (value.startsWith('[') || value.includes('{')) {
      return JSON.parse(value);
  } else {
      return value
  }
}
/**
 * 设置localStorage
 */
export const setLocal = (key,value)=>{
  if(typeof value == 'object'){
      value = JSON.stringify(value);
  }
  localStorage.setItem(key,value);
}
/**
* 获取url参数
* @param name
* @returns {*}
*/
export function getQueryStringHr(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);

  if (r === null) {
      var reg2 = /^.*?[?]/;
      var r2 = window.location.hash.replace(reg2, "")
      r = r2.match(reg);
  }
  if (r != null) return decodeURI(decodeURI(r[2]));
  return null;
}
/**
* bese64压缩
* @returns {*}
*/
export function dealImage(base64, w, callback) {
  var newImage = new Image();
  var quality = 0.6;    //压缩系数0-1之间
  newImage.src = base64;
  newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
  var imgWidth, imgHeight;
  newImage.onload = function () {
    imgWidth = this.width;
    imgHeight = this.height;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    if (Math.max(imgWidth, imgHeight) > w) {
        if (imgWidth > imgHeight) {
            canvas.width = w;
            canvas.height = w * imgHeight / imgWidth;
        } else {
            canvas.height = w;
            canvas.width = w * imgWidth / imgHeight;
        }
    } else {
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        quality = 0.6;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
    var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
    // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
    // while (base64.length / 1024 > 150) {
    // 	quality -= 0.01;
    // 	base64 = canvas.toDataURL("image/jpeg", quality);
    // }
    // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
    // while (base64.length / 1024 < 50) {
    // 	quality += 0.001;
    // 	base64 = canvas.toDataURL("image/jpeg", quality);
    // }
    callback(base64);//必须通过回调函数返回，否则无法及时拿到该值
  }
}