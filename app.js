var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');
mongoose.connect('mongodb://localhost/demo');
mongoose.Promise = global.Promise;

var paperItemSchema = new Schema({
    createTime: {
        type: Number,
        default: new Date().getTime()
    }
});

var PaperItem = mongoose.model('PaperItem', paperItemSchema);

var paperSchema = new Schema({
    paperId: String,
    paperItems: [{
        type: Schema.Types.ObjectId,
        ref: 'PaperItem'
    }]
});



var Paper = mongoose.model('Paper', paperSchema);

var LogicPuzzle = PaperItem.discriminator('LogicPuzzle', new Schema({
    title: String
}));

var HomeworkQuiz = PaperItem.discriminator('HomeworkQuiz', new Schema({
    num: Number
}));

var p1 = new Paper({paperId: 2});
var h1 = new HomeworkQuiz({num: 1});
var l1 = new LogicPuzzle({title: "一道逻辑题"});

async.waterfall([
    (done)=> {
        Paper.remove({}, done);
    },
    (data, done)=> {
        PaperItem.remove({}, (err)=> {
            done(err, null);
        });
    },
    (data, done)=> {
        
        h1.save((err)=> {
            done(err, null);
        });
    },
    (data, done)=> {
        l1.save((err)=> {
            done(err, null)
        });
    },
    (data, done)=> {
        p1.paperItems = [h1._id, l1._id];
        p1.save((err)=> {
            done(err, p1);
        });      
    }
], (err, data)=> {
    Paper
        .findOne({_id: p1._id})
        .populate('paperItems')
        .exec((err, doc)=> {
            console.log(doc);
            process.exit(0);
        })
})
