(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /**
   * Created by Crystal on 2018/11/9.
   */
  var errCatch = {
    init: function init(cb) {
      //window.addEventListener('error', fn, true)
      // promise失败了不能通过onerror捕获， 应该通过onhandle.... 捕获promise错误
      window.onerror = function (message, source, lineno, colno, error) {
        console.dir(error);
        var info = {
          message: error.message,
          name: error.name // 错误类型

        };
        var stack = error.stack;
        var matchUrl = stack.match(/http:\/\/[^\n]*/)[0];
        console.log(matchUrl);
        info.filename = matchUrl.match(/http:\/\/(?:\S*)\.js/)[0];

        var _matchUrl$match = matchUrl.match(/:(\d+):(\d+)/),
            _matchUrl$match2 = _slicedToArray(_matchUrl$match, 3),
            row = _matchUrl$match2[1],
            column = _matchUrl$match2[2];

        info.row = row;
        info.column = column; //上线的时候代码会压缩 source-map找到对应的真是的报错

        cb(info);
      };
    }
  };

  /**
   * Created by Crystal on 2018/11/9.
   */
  errCatch.init(function (data) {
    console.log(data);
  }); // 监控用户的行为
  // 怎么将数据传给后端呢？
  // 1. 通过ajax
  // 2. 通过image

})));
