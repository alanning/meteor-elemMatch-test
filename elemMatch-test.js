Control = new Mongo.Collection("control")
Test = new Mongo.Collection("test")

// execute this on the browser console:
// > Meteor.subscribe("test", "a1")

if (Meteor.isClient) {
  Meteor.subscribe("oplog")
  Meteor.subscribe("polling")

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    resetDatabase()
  });

  Meteor.publish("oplog", function () {
    // will use oplog
    return Control.find({age: 25})
  })
  Meteor.publish("polling", function () {
    // will use polling
    return Control.find({age: 35}, {_disableOplog: true})
  })

  Meteor.publish("test", function (foo) {
    // does this use oplog? check with Facts...
    return Test.find({a: {$elemMatch: {foo: foo}}})
  })


  Facts.setUserIdFilter(function (userId) {
    return true
  });

  function resetDatabase () {
    Control.remove({})
    Control.insert({name: "foo", age: 25})
    Control.insert({name: "foo2", age: 25})
    Control.insert({name: "foo3", age: 35})
    Control.insert({name: "foo4", age: 35})
    Control.insert({name: "foo5", age: 45})
    Control.insert({name: "foo6", age: 45})

    Test.remove({})
    Test.insert({name: "one",
                    a: [{foo: "a1", id: 1},
                        {foo: "b1", id: 2}]})
    Test.insert({name: "two", 
                    a: [{foo: "a2", id: 1},
                        {foo: "b2", id: 2}]})
    Test.insert({name: "three", 
                    a: [{foo: "a3", id: 1},
                        {foo: "b3", id: 2}]})
  }
}
