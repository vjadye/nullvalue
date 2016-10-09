QUnit.test( "Value mixin subclass has execute method", function( assert ) {
      class TestValueClass extends ValueMixin(ValueBase) {
          constructor() {
            super();
          }
      }
    
      var testObject = new TestValueClass();
      assert.notEqual( testObject.execute, undefined, "Execute should not be undefined" );
});

QUnit.test( "Value mixin subclass executes ifnotnull", function( assert ) {
      class TestValueClass extends ValueMixin(ValueBase) {
          constructor() {
            super();
          }
      }
    
      var testObject = new TestValueClass();
      var functorRan = false;
      var testFunctor = function() {
          functorRan = true;
      };
      testObject.execute(testFunctor);
      assert.equal( functorRan, true, "ifnotnull operator should be called by execute method on testObject" );
});

QUnit.test( "NullValue has execute method", function( assert ) {
      var nullObject = new NullValue();
      assert.notEqual( nullObject.execute, undefined, "Execute should not be undefined for NullValue subclass" );
});

QUnit.test( "NullValue executes ifnull operator", function( assert ) {
      var nullObject = new NullValue();
      var functorRan = false;
      var testFunctor = function() {
          functorRan = true;
      };
      nullObject.execute(undefined, testFunctor);
      assert.equal( functorRan, true, "ifnull operator should be called by execute method on nullValue object" );
});

QUnit.test( "Using ValueMixin with NullValue objects", function( assert ) {
      class PrinterBase extends ValueMixin(ValueBase) {
          print() {
          }
      }
      
      class Printer3d extends PrinterBase {
          print() {
              this._printImpl();
          }
              
          _printImpl() {
              //print to a 3D printer
              this._printed = "3d";
          }
      }
           
     class PrinterInkJet extends PrinterBase {
          print() {
              this._printImpl();
          }
              
          _printImpl() {
              //print to an ink jet printer
              this._printed = "ij";
          }
      }
      
      var p3 = new Printer3d();
      var pij = new PrinterInkJet();
      var nullobj = new NullValue();

      var printerCollection = [p3, nullobj, pij];
      
      printerCollection.forEach(function(p) {
          p.execute(p.print, function() {
              assert.equal(p, nullobj, "only null obj is expected to execute this functor");
          });
      });
      assert.equal(p3._printed, "3d", "p3's print should be executed");
      assert.equal(pij._printed, "ij", "pij's print should be executed");
});
