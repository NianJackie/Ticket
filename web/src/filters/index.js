import Vue from 'vue'
import moment from 'moment'

var datetime = Vue.filter('datetime', function (time) {
  return moment(time).format('YYYY-MM-DD')
});

var moneyfilters = Vue.filter('moneyfilters', function (money) {
  var moneySign = '';
  money += ''
  if (money !== 'undefined') {
    var indexof = money.indexOf(".");
    if (indexof === -1) {
      moneySign = '￥ ' + money + '.00'
    } else {
      moneySign = '￥ ' + money
    }
  } else {
    moneySign = ''
  }
  return moneySign
});

export default {
  datetime,
  moneyfilters
}