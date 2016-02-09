This repo shows that as of Meteor 1.2, $elemMatch may be used in a query and still support Meteor's oplog integration.

To test, execute this in your browser's console:
```
> Meteor.subscribe("test", "a1")
```
… and confirm that the "observe-drivers-polling" count remains "1" while the "observer-drivers-oplog" count increases to "2".


