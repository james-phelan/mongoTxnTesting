# mongoTxnTesting

## Overview
Used to test the performance of different approaches to using transactions.

The following tests are performed.

1. Perform a full document update as a transactional workload.
1. Perform a full document update as a transactional workload with the bulk API.
1. Perform a targeted update as a transactional workload.
1. Perform a targeted update as a transactional workload with the bulk API.

Full document updates mean that the full document is re-written with the
update. Targeted update means that only the field being changed is updated.

## Usage

Clone the repository, requires a MongoDB deployment 4.0.0 or greater and also at
least the same verions of the `mongo` shell.

**Load the data**
Connect to the primary any valid URI will work.
```
mongo mongodb://db0.example.com:27017,db1.example.com:27017,db2.example.com:27017/admin?replicaSet=myRepl txnDataLoad.js
```

**Run the tests**
Connect to the primary any valid URI will work.
```
mongo mongodb://db0.example.com:27017,db1.example.com:27017,db2.example.com:27017/admin?replicaSet=myRepl txnTest.js
```

**Writes to another collection**
Usefull for testing and generating cache pressure. This will run indefinitely as
the writes are in an infinite loop. You should kill this op when done with the
transactions test. To generate additional cache pressure run multiple commands
like below in the background.
```
mongo mongodb://db0.example.com:27017,db1.example.com:27017,db2.example.com:27017/admin?replicaSet=myRepl otherWrites.js
```

## DISCLAIMER

This is my personal repo for testing. This is in no way associated with any company I have worked for past or present.
