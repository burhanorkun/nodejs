/**
 * Created by TCBORKUN on 27.12.2015.
 */
Array.prototype.add = function (e) {
    this.push(e);
};
Array.prototype.toSet = function () {
    var temp = [];
    this.forEach(function (e) {
        if (temp.indexOf(e) === -1)
            temp.push(e);
    });
    return temp;
}
var renkler = [];
renkler.add("K�rm�z�");
renkler.add("Sar�");
renkler.push("Mavi");
renkler.push("Sar�");
renkler.add("Mavi");
console.log(renkler, renkler.toSet()); // ?
