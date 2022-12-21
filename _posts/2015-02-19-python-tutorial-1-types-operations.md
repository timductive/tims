---
id: 2204
title: 'Python Tutorial 1: Types & Operations'
categories:
tags:
  - python
  - tutorial
---
This first Python tutorial will cover the basic types and operations that form the building blocks of the Python syntax. These types in Python can be defined as:

  * Strings
  * Numbers
  * Lists
  * Dictionaries
  * Tuples
  * Files

&nbsp;

# Strings

  * Strings assume a positional ordering among items
  * You can verify the length of a string with the built in function **len()**
  * You can fetch components of a string with X[position]

<pre class="lang:python decode:true ">&gt;&gt;&gt; s='Spam'
&gt;&gt;&gt; len(s)
4
&gt;&gt;&gt; s[0]
'S'
&gt;&gt;&gt; s[1]
'p'
</pre>

You can also use _slicing_ to extract a piece of a string. _Slicing_ extracts a section of a string instead of an individual character.

<pre class="lang:python decode:true ">&gt;&gt;&gt; s[1:3]
'pa'
</pre>

This general form X[I:J] means “give me everything in X from offset I up to but NOT including offset J.”

In a slice, the left bound defaults to zero, and the right bound defaults to the length of the string.

<pre class="lang:default decode:true">&gt;&gt;&gt; s[1:]
'pam'
&gt;&gt;&gt; s[:3]
'Spa'
&gt;&gt;&gt; s[:-1]                     #Everything but the last character
'Spa'</pre>

Strings support repetition and concatenation

<pre class="lang:default decode:true">&gt;&gt;&gt; s+'xyz'       #Concatenation
'Spamxyz'
&gt;&gt;&gt; s*8           #Repetition
'SpamSpamSpamSpamSpamSpamSpamSpam'</pre>

Notice that the plus sign (+) and asterisk (*) do different things for different objects, for strings they represent concatenation and repetition, for numbers they represent addition and multiplication. This is a general property of Python called _Polymorphism_ which will be discussed later on.

Also notice that in these previous operations we did not _change_ the original string; that’s because strings are _immutable_&#8211; They cannot be changed after they are created. Every string operation is defined to produce a new string as its result.

<pre class="lang:default decode:true ">&gt;&gt;&gt; s[0] = 'z'
Traceback (most recent call last):
  File "&lt;console&gt;", line 1, in &lt;module&gt;
TypeError: 'str' object does not support item assignment</pre>

To embed a quote in a string, you can “escape” the quote with a backslash.

<pre class="lang:default decode:true ">&gt;&gt;&gt; 'knight\'s'
"knight's"</pre>

An escape sequence always begins with a backslash followed by a character that represents what you would like to do. For example, “\n” is a new line “\t” is a horizontal tab and “\’” is an apostrophe.

To convert a string to a number and a number to a string you must use conversion tools, specifically, **int()** and **str()**.

<pre class="lang:default decode:true ">&gt;&gt;&gt; s= '42'
&gt;&gt;&gt; i=1
&gt;&gt;&gt; s+i
Traceback (most recent call last):
  File "&lt;console&gt;", line 1, in &lt;module&gt;
TypeError: cannot concatenate 'str' and 'int' objects</pre>

If you try and add a string and an integer together you get the error above.

<pre class="lang:default decode:true ">&gt;&gt;&gt; int(s) + i
43
&gt;&gt;&gt; s + str(i)
'421'</pre>

If you convert s to an integer then the plus sign performs addition giving the sum 43. Conversely, if you convert i to a string then the plus sign concatenates the string to ‘421’.

&nbsp;

# Numbers

Python supports the standard object types for numbers: integers (whole numbers), floating-point numbers (include decimal point), as well as several more obscure types (long numbers, fixed precision…)

Python supports the standard mathematical operations: +, &#8211; , \*, /, and \** for exponent.

<pre class="lang:default decode:true">&gt;&gt;&gt; 123 + 222
345
&gt;&gt;&gt; 1.5 *4
6.0
&gt;&gt;&gt; 8 / 4
2
&gt;&gt;&gt; 2 ** 100
1267650600228229401496703205376L</pre>

The “L” at the end of the last number represents Python converting up to a long integer format to try and provide extra precision.

&nbsp;

# Lists

In Python, Lists are “positionally ordered collections of arbitrarily typed objects, and they have no fixed size.”  Unlike strings, Lists are mutable; they can be modified in-place by assignment to offsets. Lists are characterized by brackets with each list item separated by a comma.

<pre class="lang:default decode:true ">&gt;&gt;&gt; L = [123, 'spam', 1.23]
&gt;&gt;&gt; len(L)
3</pre>

We can perform a lot of the same actions on lists as strings. i.e. index, slice, concatenate…

<pre class="lang:default decode:true">&gt;&gt;&gt; L[0]
123
&gt;&gt;&gt; L[:-1]
[123, 'spam']
&gt;&gt;&gt; L2 = L + [4,5,6]          #Concatenation makes a new list
&gt;&gt;&gt; L2
[123, 'spam', 1.23, 4, 5, 6]
&gt;&gt;&gt; L                         #The original list stays the same
[123, 'spam', 1.23]</pre>

If we want to add another list item to a list, we have to use append() to automatically add a list item to the end of the current list.

<pre class="lang:default decode:true">&gt;&gt;&gt; L.append('hello world')
&gt;&gt;&gt; L
[123, 'spam', 1.23, 'hello world']</pre>

Other list operations include sort() (sorts list alphabetically), reverse() (reverses the order of the list), and pop() (removes a list item at a certain index)

<pre class="lang:default decode:true">&gt;&gt;&gt; L.sort()
&gt;&gt;&gt; L
[1.23, 123, 'hello world', 'spam']
&gt;&gt;&gt; L.reverse()
&gt;&gt;&gt; L
['spam', 'hello world', 123, 1.23]
&gt;&gt;&gt; L.pop(2)
123
&gt;&gt;&gt; L
['spam', 'hello world', 1.23]</pre>

Lists also support _nesting_ which allows Lists to be used to represent multi-dimensional matrices.

<pre class="lang:default decode:true">&gt;&gt;&gt; M = [[1,2,3],[4,5,6],[7,8,9]]
&gt;&gt;&gt; M
[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
&gt;&gt;&gt; M[1]
[4, 5, 6]
&gt;&gt;&gt; M[1][0]
4
</pre>

&nbsp;

# Dictionaries

Up to this point the object types we have learned about have been _sequences_ because they index from left to right. When you want to look at a specific instance in a sequence you call it by its position in the index. Dictionaries are the only core Python object that are not _sequences_; Dictionaries are known as _mappings_ because they map a key to a value in a Dictionary.

<pre class="lang:default decode:true">&gt;&gt;&gt; D = {'food':'Spam', 'quantity':4, 'color':'pink'}
&gt;&gt;&gt; D
{'food': 'Spam', 'color': 'pink', 'quantity': 4}
&gt;&gt;&gt; D['food']
'Spam'</pre>

Notice that a Dictionary is syntactically notated with curly braces and key-value pairs with a colon in between.

With Dictionaries it is good practice to perform an audit check on the existence of a key before performing an action on that key. This will prevent an ugly system error and instead, provide a Boolean true or false. This can be done with the built-in function, **has_key()**.

<pre class="lang:default decode:true">&gt;&gt;&gt; D['person']
Traceback (most recent call last):
  File "&lt;console&gt;", line 1, in &lt;module&gt;
KeyError: 'person'
&gt;&gt;&gt; D.has_key('person')
False
&gt;&gt;&gt; D.has_key('food')
True</pre>

Alternatively, using the ** get()**  function allows you to set a default answer  if the key does not exist.

<pre class="lang:default decode:true">&gt;&gt;&gt; D.get('food')
'meatloaf'
&gt;&gt;&gt; D.get('person', 'Albert')
'Albert'</pre>

Dictionaries also use the same **pop()** function as lists to delete a key-value pair, the only difference is that you provide a key to delete instead of an index location.

<pre class="lang:default decode:true">&gt;&gt;&gt; D
{'food': 'meatloaf', 'snack': 'pretzel'}
&gt;&gt;&gt; D.pop('snack')
'pretzel'
&gt;&gt;&gt; D
{'food': 'meatloaf'}</pre>

&nbsp;

# Tuples

Tuples (pronounces “tuhple” or “toople”) are exactly like a list except they are immutable, they cannot be changed. They are created syntactically with parenthesis instead of brackets and are only useful if you need to pass information that must remain constant, for data integrity.

<pre class="lang:default decode:true">&gt;&gt;&gt; L = [1,2,3,4]       #Mutable List
&gt;&gt;&gt; L
[1, 2, 3, 4]
&gt;&gt;&gt; L[0] = 8            #Changed the first occurrence to an 8
&gt;&gt;&gt; L
[8, 2, 3, 4]
&gt;&gt;&gt; T = (1,2,3,4)       #Immutable Tuple
&gt;&gt;&gt; T
(1, 2, 3, 4)
&gt;&gt;&gt; T[0] = 8            #Get error when trying to change values
Traceback (most recent call last):
File "&lt;console&gt;", line 1, in &lt;module&gt;
TypeError: 'tuple' object does not support item assignment</pre>

&nbsp;

# Files

File objects are Python’s main interface to external files on your computer. There is no specific literal syntax to call a File object, instead you use the built in function **open()**. When calling this function you pass 2 things, the filename and the action to perform on that file.

<pre class="lang:default decode:true">&gt;&gt;&gt; f = open('ex1.txt', 'w')        #’w’ is the action to open the file in
&gt;&gt;&gt; f.write('Hello')                #write-mode
&gt;&gt;&gt; f.write('World')
&gt;&gt;&gt; f.close()
&gt;&gt;&gt; f = open('ex1.txt', 'r')        #’r’ is the action to open the file in
&gt;&gt;&gt; bytes = f.read()                #read mode, it is the default if left
&gt;&gt;&gt; bytes                           #blank
'HelloWorld'
&gt;&gt;&gt; print bytes
HelloWorld</pre>

&nbsp;

# Exercises

  1. Define a string ‘S’ of four characters where S = ‘spam’. Write an assignment that changes the string to ‘slam’, using only slicing and concatenation.
  2. Make a dictionary with key-value pairs for your first and last name, your favorite color, a hobby you enjoy, and your favorite food. Then write your dictionary to a new text document (.txt) called “myInfo” in the following format:

<p style="padding-left: 30px;">
  My Info<br /> First Name: Blah<br /> Last Name: Maxwell<br /> Favorite Color: Green<br /> Hobby: Eating snow<br /> Favorite food: Anchovies
</p>

&nbsp;

# Next Up

Once you have a firm understanding of Python Types & Operations, [**Proceed to Part 2 of this Python tutorial: Statements, Syntax & Functions.**](http://tims.io/python-tutorial-2-statements-syntax-functions/ "Python Tutorial 2: Statements, Syntax & Functions")