exports.days = function (date){
  let now = new Date();
  let notNow = new Date(date);
  var difference = Math.abs(now.getTime() - notNow.getTime());
  var differenceDays = Math.ceil(difference/(1000*3600*24));
  console.log( "days: " + differenceDays);

}