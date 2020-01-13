var firstDoc = 0;
var lastDoc = 100000;
var firstEmbed = 0;
var lastEmbed = 20;

var baseDoc = {
  "field1" : 0,
  "field2" : 0,
  "field3" : 0,
  "field4" : 0,
  "field5" : 0,
  "field6" : 0,
  "field7" : ISODate("2016-11-30T00:00:00Z"),
  "field8" : ISODate("2019-12-31T00:00:00Z"),
  "field9" : NumberLong(2),
  "field10" : ISODate("2017-01-23T10:03:52.067Z"),
  "field11" : [
  ]
};

var embedDoc = {
  "fieldx" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  "fieldy" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  "fieldz" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
};

for (var i=firstEmbed; i<lastEmbed; i++) {
  baseDoc.field11[i] = embedDoc
}

print("Dropping Collection");
db.getSiblingDB('txnTestDB').txnTestColl.drop();

print("Creating Indexes");
db.getSiblingDB('txnTestDB').txnTestColl.createIndex({field1 : 1});
db.getSiblingDB('txnTestDB').txnTestColl.createIndex({field2 : 1});
db.getSiblingDB('txnTestDB').txnTestColl.createIndex({field3 : 1});
db.getSiblingDB('txnTestDB').txnTestColl.createIndex({field4 : 1});
db.getSiblingDB('txnTestDB').txnTestColl.createIndex({field5 : 1});
db.getSiblingDB('txnTestDB').txnTestColl.createIndex({field6 : 1});
db.getSiblingDB('txnTestDB').txnTestColl.createIndex({field10 : 1});

print("Loading Data");

for (var j=firstDoc; j<lastDoc; j++) {
  baseDoc.field1 = j;
  db.getSiblingDB('txnTestDB').txnTestColl.insert(baseDoc, { writeConcern: { w: "majority", wtimeout: 5000 } });
}
print("Finished");
