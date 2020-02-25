exports.stringToArr = function (str){
    return str.trim().split(" ");
};

exports.SortCharacters = function (str){
    var arr = str.split('');
    var sorted = arr.sort();
    return sorted.join('');
};

exports.gcd = function (x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
};

exports.shuffle = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

exports.days = function (date){
  let now = new Date();
  let notNow = new Date(date);
  var difference = Math.abs(now.getTime() - notNow.getTime());
  var differenceDays = Math.ceil(difference/(1000*3600*24));
  console.log( "days: " + differenceDays);

}