---
id: 2210
title: 'Python Tutorial 2: Statements, Syntax & Functions'
categories:
tags:
  - python
  - tutorial
---
This Python tutorial covers basic Python statements, syntax and functions. This includes:

  * Introducing Python Statements
  * Assignment, Expressions and print
  * if Tests
  * while and for loops
  * Function Basics
  * Scope
  * Advanced Function Topics

&nbsp;

# Print

We have already encountered this statement before; it is used simply to display objects.

<pre class="lang:default decode:true">&gt;&gt;&gt; print 'hello'
hello
&gt;&gt;&gt; print 4
4</pre>

print statements automatically put a line feed at the end of each statement; to suppress this line feed put a comma at the end of the statement.

<pre class="lang:default decode:true">print 'Hello World!',
print 'Goodbye World...'
Hello World! Goodbye World...</pre>

&nbsp;

# if/elif/else

if tests always check for a Boolean true or false, with numbers, 1 is always true and 0 is always false, so a simple if statement would look like this:

<pre class="lang:default decode:true">&gt;&gt;&gt; if 1:
...     print 'true'
...
true</pre>

This statement is asking, does 1 equal the Boolean equivalent “true”? Of course 1 will ALWAYS equal true and 0 will always equal false. For strings, true is equivalent to a non-null value and false would be a blank or null string.

<pre class="lang:default decode:true">&gt;&gt;&gt; x
'rabbit'
&gt;&gt;&gt; if x:
...     print x
... else:
...     print 'false'
...
rabbit
&gt;&gt;&gt; x=''
&gt;&gt;&gt; if x:
...     print x
... else:
...     print 'false'
...
false</pre>

&nbsp;

# while and for Loops

## while Loop

A _while_ loop is the most general iteration construct in the Python language; it simply repeatedly executes a block of code as long as the test at the top of the loop evaluates to true.

<pre class="lang:default decode:true">&gt;&gt;&gt; x = 'spam'
&gt;&gt;&gt; while x:
...     print x,
...     x=x[1:]
...
spam pam am m</pre>

A _while_ loop would be the best way to go if there is no predetermined number of occurrences. There are 4 key statements that can be used in loops to help determine the path that they take:

  * break 
      * Jumps out of the closest enclosing loop
  * continue 
      * Jumps to the top of the closest enclosing loop
  * pass 
      * Does nothing at all, an empty placeholder
  * else 
      * Runs after the last iteration of the while loop as long as no breaks were hit

<pre class="lang:default decode:true">&gt;&gt;&gt; x=10
&gt;&gt;&gt; while x:
...     print x
...     x=x-1
... else:
...     print str(x) + 'else statement'
...
10
9
8
7
6
5
4
3
2
1
0else statement</pre>

The last time through, x equaled 0 so the while loop ended and went to the else statement.

## for Loop

The for loop is a generic sequence iterator, it can step through strings, lists, tuples, and other built-in iterables. It uses the same 4 loop control statements that the _while_ loop does:  break, continue, pass, else.

A for loop’s syntax looks like this:

for <target> in <object>

where <target> is a variable name that represents an indexed object and <object> is a predefined, iterable object

<pre class="lang:default decode:true">&gt;&gt;&gt; S='lumberjack'
&gt;&gt;&gt; T=('and',"I'm",'okay')
&gt;&gt;&gt; for x in S:
...     print x,
...
l u m b e r j a c k
&gt;&gt;&gt; for x in T:
...     print x,
...
and I'm okay</pre>

To compare two lists to each other, you can use a nested for loop.

<pre class="lang:default decode:true">&gt;&gt;&gt; items = ['aaa',111, (4,5), 2.01]
&gt;&gt;&gt; tests = [(4,5), 3.14]
&gt;&gt;&gt;
&gt;&gt;&gt; for key in tests:
...     for item in items:
...         if item == key:
...             print key, 'was found'
...             break
...     else:
...         print key, 'not found!'
...
(4, 5) was found
3.14 not found!</pre>

Remember that _break_ escapes us from the inner for loop as soon as a match is found, then we check the next key from the outer for loop, it we never hit the break then the key was not found so we print the else clause.

&nbsp;

# Function Basics

Functions are the simplest way to package logic you may wish to use in more than one place and more than one time. Python functions are written with a new statement, **def**. **def** creates an object and assigns it to a name.

Syntax:

<pre class="lang:default decode:true ">def &lt;name&gt; (arg1, arg2,…. argN,):
    &lt;statements&gt;
    …
    return &lt;value&gt;</pre>

**def** executes at runtime, in other words, a function does not have to be fully defined before a program runs.

<pre class="lang:default decode:true ">if test:
    def func():
        …
else:
    def func():
        …
func()</pre>

&nbsp;

<pre class="lang:default decode:true">&gt;&gt;&gt; def times(x,y):
...     return x*y
...
&gt;&gt;&gt; x = times(2,4)
&gt;&gt;&gt; x
8</pre>

Remember that Polymorphism in Python does not restrict this function to only performing multiplication, it will also perform repetition.

<pre class="lang:default decode:true">&gt;&gt;&gt; x = times('Ni',4)
&gt;&gt;&gt; x
'NiNiNiNi'</pre>

In the second example of the for loop we wrote a nested for loop to determine if there were any matches between a key and a list of items. With a function, this can be done and reused for any 2 sets of data.

<pre class="lang:default decode:true">&gt;&gt;&gt; def intersect(seq1, seq2):
...     res = []   
...     for x in seq1:
...         if x in seq2:
...             res.append(x)
...     return res
...
&gt;&gt;&gt; x = intersect([1,3,5,6,7,8], (2,4,6,7,9))
&gt;&gt;&gt; x
[6, 7]</pre>

This function, intersect, takes in 2 arguments and compares each index of the first argument to each argument of the second, it then appends matching indexes to a list and returns the value. You will notice that the arguments are another example of Polymorphism, the first one is a list and the second one is a tuple but they can still be compared because they are both sequences of data.

&nbsp;

# Scope

In Python, scope can be boiled down to one rule, the LEGB Rule:

**Built-in (Python)**  
Names preassigned in the built-in names module: open, range, SyntaxError…

<p style="padding-left: 30px;">
  <strong>Global (module)<br /> </strong>Names assigned at the top-level of a module file, or declared global in a def within the file.
</p>

<p style="padding-left: 60px;">
  <strong>Enclosing function locals</strong><br /> Names in the local scope of any and all enclosing functions (def or lambda), from inner<br /> to outer.
</p>

<p style="padding-left: 90px;">
  <strong>Local (function)</strong><br /> Names assigned in any way within a function (def or lambda), and not declared<br /> global in that function.
</p>

Variables within a function are local variables and cannot be accessed outside of that function unless the variable is defined as “global” before it is used.

<pre class="lang:default decode:true">&gt;&gt;&gt; x=88
&gt;&gt;&gt; def func():
...     x=99
...     
&gt;&gt;&gt; func()
&gt;&gt;&gt; print x
88
&gt;&gt;&gt; def func2():
...     global x
...     x=99
...
&gt;&gt;&gt; func2()
&gt;&gt;&gt; print x
99</pre>

&nbsp;

# Function Design Concepts

When designing functions keep in mind that all good functions should be well thought out; for example, every task should be decomposed into purposeful functions (cohesion), and every function should have a clear manner in which it communicates with everything outside of it (coupling). Use the following as general rules-of-thumb:

  * Coupling: use arguments for inputs and **return** for outputs.
  * Coupling: use global variables only when truly necessary.
  * Coupling: don’t change mutable arguments unless the caller expects it.
  * Coupling: avoid changing variables in another module file directly.
  * Cohesion: each function should have a single, unified purpose.
  * Size: each function should be relatively small.

&nbsp;

# Exercises

  1. First write a _while_ loop that displays even numbers less than or equal to 10, then write the same loop using a _for_ loop. _Hint: make a list for the “for” loop._
  2. Define a function that takes in a string and wraps it in the html “<p></p>” tags. Then execute and display it with the string “Hello World”.

&nbsp;

# Next Up

Once you feel like you have mastered Python Statements, Syntax and Functions, [**Proceed to Part 3 of this Python tutorial: Modules, Classes & OOP.**](http://tims.io/python-tutorial-3-modules-classes-oop/ "Python Tutorial 3: Modules, Classes & OOP")

Or, if you need a refresher, [**Go Back to Part 1 of this Python Tutorial: Types & Operations.**](http://tims.io/python-tutorial-1-types-operations/ "Python Tutorial 1: Types & Operations")