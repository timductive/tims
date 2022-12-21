---
id: 2217
title: 'Python Tutorial 3: Modules, Classes & OOP'
tags:
  - python
  - tutorial
---
This Python tutorial covers Python modules, classes and object-oriented programming principles. This includes:

  * Modules: The Big Picture
  * Module Import Syntax
  * Packages
  * Inheritance
  * Classes
  * Exceptions

&nbsp;

# Modules

In Python a Module is the highest-level program organization unit, modules correspond to Python program files. Each file is a module, and modules import other modules to use the names they define. There are 3 important statements in Python that are used to process modules:

**import** – Lets a client fetch a module as a whole

**from** – Allows clients to fetch particular names from a module

**reload** – Provides a way to reload a module’s code without stopping Python

Modules are an easy way to organize components into a system by serving as self-contained packages of variables known as _namespaces_. All the names defined at the top level of a module file become attributes of the imported module object.

### Import

Let’s assume I built a module called **function.py** and inside this module I defined a function called **addition**, like so:

<pre class="lang:default decode:true">'''
Created on Feb 10, 2010
@author: tims
'''

def addition(x,y):
    return x + y</pre>

Using the **import** statement I can use this function anywhere on my Pythonpath, even the interpreter.

<pre class="lang:default decode:true">&gt;&gt;&gt; import function
&gt;&gt;&gt; function.addition(3,4)
7</pre>

### From

Notice that when you use the import function, you get all top level variables, functions, and classes. So when using an object you have to preface it with the module it comes from to avoid name space collisions. i.e. **function.addition().** If you do not want to preface every object you call from the imported module you can use the **from** statement.

<pre class="lang:default decode:true">&gt;&gt;&gt; from function import addition
&gt;&gt;&gt; addition(5,5)
10</pre>

This is also useful if you don’t want _all_ the objects from a specific module but maybe just 1 or 2.

### Reload

The **reload()** built-in function is useful only if the original module is changed after it has been imported. Because modules are only imported once, any changes that occur after the import will not be shown unless a **reload()** is done.

Let’s say I take my function.py module and add the following code:

<pre class="lang:default decode:true">message = "First version"

def printer():
    print message</pre>

I then import function.py into the interpreter and run the function **printer**.

<pre class="lang:default decode:true">&gt;&gt;&gt; import function
&gt;&gt;&gt; function.printer()
First version</pre>

I then go back and change the variable **message** to say “Second Version”.

<pre class="lang:default decode:true">message = "Second version"

def printer():
    print message</pre>

But when I run **printer()** in the interpreter again it still says “First version”

<pre class="lang:default decode:true">&gt;&gt;&gt; function.printer()
First version</pre>

Note: I could even run the import statement again and the message would not change.

<pre class="lang:default decode:true">&gt;&gt;&gt; import function
&gt;&gt;&gt; function.printer()
First version</pre>

Now, if I **reload()** the module, the change should go into effect.

<pre class="lang:default decode:true">&gt;&gt;&gt; reload(function)
&lt;module 'function' from 'C:\Python\cola\latms\pythonTraining\function.py'&gt;

&gt;&gt;&gt; function.printer()
Second version</pre>

&nbsp;

# Packages

In Python, a directory of Python code is said to be a _package_. You can import a module from a different directory, or _package_, using the **import** statement and a path of names separated by periods.

<pre class="lang:default decode:true">&gt;&gt;&gt; import django.template</pre>

As you can see, this will become very important when importing other Python libraries like Django, Sqlalchemy, or Flask in the future.

However, any directory that is going to be used as a Python package must contain a \_\_init\_\_.py file. This can contain Python code or simply be left blank, but creating a Python module named \_\_init\_\_.py in every Python package creates a hook that allows Python to know where to search for information.

&nbsp;

# Classes and Object-Oriented Programming

In this next section I will attempt to explain Object-Oriented Programming (or OOP) in a “big picture” context. For those unfamiliar with the subject I strongly encourage you to read **“OOP: The Big Picture” in _Learning Python_.**

In Python, everything we’ve done up to this point has been _object-based_; a variable name is assigned to an object, a function is an object and it accepts objects as arguments and returns an object as output, a _for_ loop will iterate through the indexes of an object. However, to truly be _object-oriented_, our objects have to participate in something called _“inheritance hierarchy”._

To support an _inheritance hierarchy_ we use Python’s most fundamental object-oriented tool, the **class.** **Classes** are roughly packages, or groups, of functions (methods) that process built-in object types.

## Classes and Instances

**Classes**  
&#8211; Serve as _instance_ factories. Their attributes provide behavior – data and functions – that is inherited by all the instances generated from them. They are the framework used to construct instances.

**Instances**  
&#8211; Represent the concrete items in a program’s domain. Their attributes record data that varies per specific object.

For example, a **Class** called _Person_ could generate **Instances** _George_ and _Sally_.

The distinction between a **Class** and its **Instances** is important to understand so that we can talk about **Inheritance**.

## Inheritance

[<img class="aligncenter size-full wp-image-2219" src="http://tims.io/wp-content/uploads/2015/02/inheritance1.png" alt="inheritance" width="688" height="532" srcset="https://tims.io/img/2015/02/inheritance1.png 688w, https://tims.io/img/2015/02/inheritance1-300x232.png 300w" sizes="(max-width: 688px) 100vw, 688px" />](http://tims.io/wp-content/uploads/2015/02/inheritance1.png)

&nbsp;

Object-Oriented Programming, in Python, is built upon the idea of inheritance. In this example, Instance1 of Person, George, has all of the attributes of his instance as well as all the classes above him. We can describe George as an object that is **Alive**, he can grow, die, and react to his environment, he is also a **Person**, which means he is self-aware, capable of complex communication and society, and his name is George, social security number 555-55-5555, and his birthday is May 23, 1932.

Another important aspect of inheritance is that each attribute can be overridden. In instance1 of Animal you will notice that the attribute “society” is set to “complex” which overrides the attribute “society” in the class Animal. When Python searches for an attribute, it will start with the instance that it is in and work its way up to the sub-class and then the super-classes. If there are multiple super-classes it will search from left to right.

_Note: A **Super Class** is just a Class that is higher up in the inheritance hierarchy structure. A **Sub Class** is just a Class that is lower in the hierarchy structure._

## Syntax

Now it is time to look at the syntax for creating classes in Python.

<pre class="lang:default decode:true">&gt;&gt;&gt; class FirstClass:
...     def setdata(self, value):
...         self.data = value

...     def display(self):
...         print self.data</pre>

Notice that this class, FirstClass, has 2 functions inside of it, functions that are part of classes are called **methods**, they behave like any other function except they are defined inside of a Class.

Next we call the class and then assign it to a variable, “x” and “y” are now _instances_ of the class _FirstClass()_.

<pre class="lang:default decode:true">&gt;&gt;&gt; x = FirstClass()
&gt;&gt;&gt; x.setdata('King Arthur')

&gt;&gt;&gt; y = FirstClass()
&gt;&gt;&gt; y.setdata(3.14159)</pre>

We can now call the methods assigned to the class _FirstClass_, note that Python will FIRST look for the method, _setdata_, in the instance, but since neither “x” nor “y” have a method called _setdata_ or a variable called _data_ then it looks in the class.

<pre class="lang:default decode:true">&gt;&gt;&gt; x.display()
King Arthur

&gt;&gt;&gt; y.display()
3.14159</pre>

Now we can call the _display()_ method to display the variable _data_, which we set with the previous method, _setdata_.

To show that an instance really is its own, concrete object we can change the variable _data_, without using any of the methods available in the class.

<pre class="lang:default decode:true">&gt;&gt;&gt; x.data = "New Value that is not King Arthur"
&gt;&gt;&gt; x.display()
New Value that is not King Arthur</pre>

Now we can create a second class that is a sub class to _FirstClass_.

<pre class="lang:default decode:true">&gt;&gt;&gt; class SecondClass(FirstClass):
...     def __init__(self):
...         self.data = 'Jack-of-all-trades'</pre>

Notice that we are assigning _FirstClass_ as the super class by putting it in the parenthesis of _SecondClass_. If you have multiple super classes the order in which you list them in the parenthesis is very important. Python will always search for attributes in super classes starting with the super class on the left and moving to the right.

Also notice that the only method we created in _SecondClass_ is called **\_\_init\_\_**, you will find this method quite commonly within class definitions in Python. It allows you to do many things whenever the class is initialized. In this case we are setting a default value to self.data.

<pre class="lang:default decode:true">&gt;&gt;&gt; z = SecondClass()
&gt;&gt;&gt; z.display()
Jack-of-all-trades</pre>

We have now created an instance _z_ and assigned it to _SecondClass()_, notice that _z_ is pulling a default value for the variable _data_ from _SecondClass_ but using the _display()_ method from _FirstClass_.

This is a very basic and simple example of object-oriented programming in Python but it is the basis for a very powerful system of object representation. For a deeper dive I recommend reading the chapters on Classes and Inheritance in _Learning Python._

&nbsp;

# Exceptions

An _Exception_ is an event that can modify the flow of control through a program; they are triggered automatically on errors, and can be triggered and intercepted by your code. There are 5 statements that we can use to process _exceptions_.

## try/except

Catch and recover from exceptions raised by Python or you.

First we define a function that returns the index of object that is passed in as an argument.

<pre class="lang:default decode:true ">&gt;&gt;&gt; def fetcher(obj, index):
...     return obj[index]</pre>

Then we define a string and call our fetcher function

<pre class="lang:default decode:true">&gt;&gt;&gt; x = 'spam'
&gt;&gt;&gt; fetcher(x,3)
'm'</pre>

If our arguments our not within the bounds of the object’s index, we get an error

<pre class="lang:default decode:true">&gt;&gt;&gt; fetcher (x,4)
Traceback (most recent call last):
  File "&lt;console&gt;", line 1, in &lt;module&gt;
  File "&lt;console&gt;", line 2, in fetcher
IndexError: string index out of range</pre>

The “try/except” statement allows us to customize this error message. We can catch this error and customize it like so:

<pre class="lang:default decode:true">&gt;&gt;&gt; try:
...     fetcher(x,4)
... except IndexError:
...     print 'got exception'

got exception</pre>

## try/finally

Perform cleanup actions, whether exceptions occur or not.

First we put our try statement inside of another function called _catcher_.

<pre class="lang:default decode:true">&gt;&gt;&gt; def catcher():
...     try:
...         fetcher(x,4)
...     except IndexError:
...         print 'got exception'
...     finally:
...         print 'executes finally regardless of exception or not'
...     print 'continues to execute program after try statement'

&gt;&gt;&gt; catcher()
got exception
executes finally regardless of exception or not
continues to execute program after try statement</pre>

You will notice the _finally_ statement will execute at the end of the _try_ statement regardless of whether an exception was hit or not, in this way, it is similar to the _else_ statement at the end of a loop. Also, the program will continue to execute after the try statement has ran as shown in the _print_ statement “continues to execute program after try statement”.

## try/else

Run if no exceptions raised.

<pre class="lang:default decode:true">&gt;&gt;&gt; def catcher2():
...     try:
...         fetcher(x,3)
...     except IndexError:
...         print 'got exception'
...     else:
...         print 'no exception'
...     finally:
...         print 'executes finally regardless of exception or not'
...     print 'continues to execute program after try statement'

&gt;&gt;&gt; catcher2()
no exception
executes finally regardless of exception or not
continues to execute program after try statement</pre>

The _else_ statement is used here in its more traditional statement, to perform an action if the exception does not get tripped.

## assert

Conditionally trigger an exception in your code.

<pre class="lang:default decode:true">&gt;&gt;&gt; x = 'spam'
&gt;&gt;&gt; def f(x):
...     assert x != 'spam', 'x cannot be spam'

&gt;&gt;&gt; f(x)
Traceback (most recent call last):
  File "&lt;console&gt;", line 1, in &lt;module&gt;
  File "&lt;console&gt;", line 2, in f
AssertionError: x cannot be spam

&gt;&gt;&gt; try:
...     f(x)
... except:
...     print 'x cannot be spam'

x cannot be spam</pre>

## raise

Trigger an exception manually in your code

<pre class="lang:default decode:true">&gt;&gt;&gt; class MyBad: pass

&gt;&gt;&gt; def stuff():
...     raise MyBad()

&gt;&gt;&gt; try:
...     stuff()
... except MyBad:
...     print 'got it'

got it</pre>

&nbsp;

# Exercises

  1. Create a class called “Parent”, create the following attributes and give them the following default values using the \_\_init\_\_ method: 
      1. name = ‘John Smith’
      2. eyeColor = ‘blue’
      3. hairColor = ‘brown’
      4. education = ‘Master’s Degree’

<p style="padding-left: 30px;">
  Then make a display() method that displays all of these attributes. Save this class to a file to create a module.
</p>

<ol start="2">
  <li>
    Import your “Parent” class from your module using the <strong>from, import.</strong> Create a sub-class called “Child” with “Parent” as its super-class. Override the following attributes from “Parent” with these values. <ol>
      <li>
        name = “Jeff Smith”
      </li>
      <li>
        education = ‘High School Diploma’
      </li>
    </ol>
  </li>
</ol>

<p style="padding-left: 30px;">
  Do not include the eyeColor or hairColor attributes in the “Child” sub-class. Do not make a display() method.
</p>

<p style="padding-left: 30px;">
  Next generate an instance of the “Parent” class and an instance of the “Child” class<br /> &#8211; Set the eyeColor and hairColor of the “Child” instance in the actual instance<br /> (i.e. “instancename”.eyeColor = “brown”, “instancename”.hairColor =”blonde”)<br /> &#8211; Using the display() method, display all of their attributes.
</p>

&nbsp;

# Review

[**Go Back to Part 1 of this Python Tutorial: Types & Operations.**](http://tims.io/python-tutorial-1-types-operations/ "Python Tutorial 1: Types & Operations")

[**Go Back to Part 2 of this Python Tutorial: Statements, Syntax & Functions.**](http://tims.io/python-tutorial-2-statements-syntax-functions/ "Python Tutorial 2: Statements, Syntax & Functions")