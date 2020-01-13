for (var i = 1; i <= 100000000; i++) {
  var rnd = _rand();
  db.getSiblingDB('txnTestDB').otherWritesDB.insert(
    {
      "field1": rnd,
      "field2" : [1,2,3,rnd,4,rnd,5],
      "field3":
      {
        "fieldx": "a",
        "fieldy": "b"
      }
    });
}
