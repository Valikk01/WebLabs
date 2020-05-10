exports.SortCharacters = function (str){
    var arr = str.split('');
    var sorted = arr.sort();
    return sorted.join('');
};