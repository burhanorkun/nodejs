/**
 * Created by TCBORKUN on 27.12.2015.
 */
function PrintPersonel (myDocuments) {
    this.documents = myDocuments;
}

// Biz bas() methodu ekledik. artik kalitim ile diger objelere aktarilabilir. ok
PrintPersonel.prototype.bas = function () {
    console.log(this.documents);
}

// burada kalitim ile PrintPersonel in preperties ve method larini aldik.
var yeniObj = new PrintPersonel ("Ben bir objeyim ve print islemi yapabilirim.");

// bu yeni objede atik kalitim ile prototype in tum ozellikleri geldi. ok
yeniObj.bas();
