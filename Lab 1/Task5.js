<<<<<<< HEAD
exports.days = function (m, y){
	var arr = [31, 28, 31, 30, 31, 30 , 31, 31 ,30,31, 30 ,31 ]
 if(y % 4 == 0 && m == 1){
 	return arr[m]+1;
 }

 return arr[m];
=======
exports.days = function (date){
  let now = new Date();
  let notNow = new Date(date);
  var difference = Math.abs(now.getTime() - notNow.getTime());
  var differenceDays = Math.ceil(difference/(1000*3600*24));
  console.log( "days: " + differenceDays);
>>>>>>> ca899423a3d087c23e1b7871090255cef6f3573d

}