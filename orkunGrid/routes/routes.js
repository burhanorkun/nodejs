/**
 * Created by TCBORKUN on 19.09.2015.
 */
module.exports = function(express, app, formidable, fs, os, gm, knoxClient, mongoose, io) {

    var Socket;

    io.on('connection', function(socket){
        Socket = socket;
    })

    var singleImage = new mongoose.Schema({
        filename : String,
        votes : Number
    })

    var singleImageModel = mongoose.model('singleImage', singleImage);

    var router = express.Router();

    router.get('/', function(req, res, next){
        res.render('index', {host:app.get('host')});
    });

    router.post('/upload', function(req, res, next){
        //file upload yapacagiz

        function generateFilename(filename){
            var ext_regex = /(?:\.([^.]+))?$/;
            var ext = ext_regex.exec(filename)[1];
            var date = new Date().getTime();
            var charBank ="abcdefghijklmnopqrstuvwxyz";
            var fstring ='';
            for(var i =0; i<15; i++){
                fstring += charBank[parseInt(Math.random()*26)];
            }
            return (fstring += date+'.'+ext);
        }

        var tmpFile, nfile, fname;
        var newForm = new formidable.IncomingForm();
            newForm.keepExtensions = true;
            newForm.parse(req, function(err, fields, files){
                tmpFile =files.upload.path;
                //fsize = files.upload.length.;
                fname = generateFilename(files.upload.name);
                nfile = os.tmpDir() + '/' + fname;
                res.writeHead(200,{'Content-type':'text/plain'});
                res.end();
            })

            newForm.on('end', function(){
                fs.rename(tmpFile,nfile,function(){
                    //resimlerin boyutlarini degistir ve amazon cloud a dosyalari yukle
                    gm(nfile).resize(300).write(nfile, function(){
                        // upload amazon cloud S3 bucket

                        /*  --eski versiyon
                        var stream = fs.createReadStream(nfile)
                        var mimetype = mime.lookup(nfile);
                        var reqKnox;

                        if (mimetype.localeCompare('image/jpeg')
                            || mimetype.localeCompare('image/pjpeg')
                            || mimetype.localeCompare('image/png')
                            || mimetype.localeCompare('image/gif')){
                            reqKnox = knoxClient.putStream(stream, fname, {
                                'Content-Type': 'image/jpeg',
                                'Cache-Control':'max-age=604800',
                                'x-amz-acl': 'public-read',
                                'Content-Length': fsize
                            },
                            function(err, result){
                                console.log(result);
                            });
                        } else {
                            console.log('reqKnox error!')
                        }
                        reqKnox.on('response', function(resp){
                            if(resp.statusCode == 200){
                                console.log('resp.statusCode: ' + resp.statusCode);
                            }else{
                                console.log('resp.statusCode: ' + resp.statusCode);
                            }
                        }) */

                        // yeni versiyon*** bu sekilde calisti
                        fs.readFile(nfile, function(err, buf){
                            var reqKnox = knoxClient.put(fname, {
                                'Content-Length':buf.length,
                                'Content-Type':'image/jpeg'
                            })

                            //console.log(buf);

                            reqKnox.on('response', function(resp){
                                console.log('res.statusCode:' + resp.statusCode);
                                if(resp.statusCode == 200){
                                    // This means that the file is in the S3 bucket!
                                    var newImage = new singleImageModel({
                                        filename : fname,
                                        votes : 0
                                    }).save();

                                    Socket.emit('status',{'msg':'Saved !!', 'delay': 3000});
                                    Socket.emit('doUpdate', {});

                                    //delete the local file
                                    fs.unlink(nfile, function(){
                                        console.log('Local File Deleted !!');
                                    })
                                }
                            })

                            reqKnox.end(buf);

                        })

                    })
                })

            })
    })

    router.get('/getimages', function(req, res, next){
        singleImageModel.find({}, null, {sort:{votes:-1}}, function(err, result){
            res.send(JSON.stringify(result));
        })
    })

    router.get('/voteup/:id', function(req, res, next){
        singleImageModel.findByIdAndUpdate(req.params.id, {$inc:{votes:1}}, function(err, result){
            res.send(200, {votes : result.votes});
        })
    })

    app.use('/', router);

}
