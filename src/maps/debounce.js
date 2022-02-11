export const debounce = function (fn, interval) {
  let _fn = fn;
  let timer = null;

  return function () {
    let args = arguments;
    let _self = this;

    clearTimeout(timer);
    timer = setTimeout(function () {
      _fn.apply(_self, args);
    }, interval || 500);
  };
};
