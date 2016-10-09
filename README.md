# nullvalue
Generic mixin to handle null values of any kind

## Description

I often find myself in JavaScript code that looks like this

<pre>
function myFunction(obj) {
    if (obj !== undefined && obj !== null) {
        obj.doSomething(); //A method call
        //or your code here
    } else {
        //Do something else
    }
}
</pre>

As the complexity of the code increases, you soon find yourself in a switchyard of checks for null and undefined values.
Using Mixins and Interfaces can simplify this a lot, but some checks for null/undefined values are inevitable. Lack of static type checking in JavaScript means that the missing checks are not discovered until very late.

The proposed solution is to represent all null values using an instance of the NullValue class. This class is a subclass of ValueBase with a ValueMixin which provides a default implementation for handling method calls.

So above function call would simply look like this

<pre>
function myFunction(obj) {
    obj.execute(obj.doSomething, function() {
        //Do something else
    });
}

//And the calling code is
var null_obj = new NullValue();
myFunction(null_obj);

//Or create a subclass with ValueMixin
class MySubclass extends ValueMixin(ValueBase) {
      doSomething() {
              //code here
      }
}

var obj = new MySubclass();
myFunction(obj);
</pre>

See the unit tests for more details.

## Using it

If your JS code is supposed to work in a browser supporting ECMAScript 2015 use the NullValue and ValueMixin classes defined in src/nullmixin.js directly in your code. See test/nullmixin-test.js for example usage.

If you use DOJO framework, you can use dojo modules in src/dojo/nullmixin-dojo.js for representing NullValue objects and src/dojo/valuemixin-dojo.js for mixing in ValueMixin using dojo/declare. See test/dojo/nullmixin-dojo-test.js for example usage
