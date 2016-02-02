/**
 * Created by TCBORKUN on 27.12.2015.
 */
// kendimiz callback iceren kaynak kodumuzu yaziyoruz.
function some_function(arg1, arg2, callback) {

    // arg1 ve arg2 kullaniyoruz, yeni bir sonuc uretiyoruz
    var my_number = arg1 * arg2;

    // sonucumuzu pass ediyoruz
    callback(my_number);
}

// kaynak kodumuzu yazdigimiz kodu kosalim
some_function(5, 10, function(num) {
    console.log("callback cagrildi! " + num);
});