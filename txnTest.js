var firstDoc = 0;
var lastDoc = db.getSiblingDB('txnTestDB').txnTestColl.count();
var bulkSize = 1000;
var updateValue = 10;
var tests = 4;

function timeFunction() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return dateTime = date + 'T' + time;
}

sleep(5000);
print("-----------");
var control = 0;
while (control < tests) {
    session = db.getMongo().startSession();
    session.startTransaction({ writeConcern: { w: "majority", j: true, wtimeout: 5000 } });
    if (control == 0) {
        print("Running transactions, full document updates.");
        var field = "field3";

        function updateFunction() {
            session.getDatabase('txnTestDB').txnTestColl.update({ "field1": j }, doc);
        }
    } else if (control == 1) {
        print("Running transactions, full document updates with bulk api.");
        var bulk = session.getDatabase('txnTestDB').txnTestColl.initializeUnorderedBulkOp();
        var field = "field4";

        function updateFunction() {
            bulk.find({ "field1": j }).updateOne(doc);
        }
    } else if (control == 2) {
        print("Running transactions, targeted updates.");
        var field = "field5";

        function updateFunction() {
            session.getDatabase('txnTestDB').txnTestColl.update({ "field1": j }, {
                $set: {
                    [field]: updateValue
                }
            });
        }
    } else if (control == 3) {
        print("Running transactions, targeted updates with bulk api.");
        var bulk = session.getDatabase('txnTestDB').txnTestColl.initializeUnorderedBulkOp();
        var field = "field6";

        function updateFunction() {
            bulk.find({ "field1": j }).updateOne({
                $set: {
                    [field]: updateValue
                }
            });
        }
    } else {
        exit();
    }
    print("Start Time:", timeFunction());
    var i = 0;
    for (var j = firstDoc; j < lastDoc; j++) {
        i++;
        var doc = session.getDatabase('txnTestDB').txnTestColl.findOne({ "field1": j });
        null;
        doc[field] = updateValue;
        updateFunction();
        if (i % bulkSize == 0) {
            if (control == 1 || control == 3) {
                bulk.execute();
                bulk = session.getDatabase('txnTestDB').txnTestColl.initializeUnorderedBulkOp();
            }
            session.commitTransaction();
            session = db.getMongo().startSession();
            session.startTransaction({ writeConcern: { w: "majority", j: true, wtimeout: 5000 } });
        }
    }
    print("End Time:", timeFunction());
    print("-----------");
    control++;
    sleep(5000);
}