var bifs = "\
vendors = moz webkit o ms official\n\
\n\
// stringify the given arg\n\
\n\
-string(arg)\n\
  type(arg) + ' ' + arg\n\
\n\
// require a color\n\
\n\
require-color(color)\n\
  unless color is a 'color' \n\
    error('RGB or HSL value expected, got a ' + -string(color))\n\
\n\
// require a unit\n\
\n\
require-unit(n)\n\
  unless n is a 'unit'\n\
    error('unit expected, got a ' + -string(n))\n\
\n\
// require a string\n\
\n\
require-string(str)\n\
  unless str is a 'string' or str is a 'ident'\n\
    error('string expected, got a ' + -string(str))\n\
\n\
// apply js Math function\n\
\n\
math(n, fn) \n\
  require-unit(n)\n\
  require-string(fn)\n\
  -math(n, fn)\n\
\n\
// adjust the given color's property by amount\n\
\n\
adjust(color, prop, amount)\n\
  require-color(color)\n\
  require-string(prop)\n\
  require-unit(amount)\n\
  -adjust(color, prop, amount)\n\
\n\
// Math functions\n\
\n\
abs(n) { math(n, 'abs') }\n\
ceil(n) { math(n, 'ceil') }\n\
floor(n) { math(n, 'floor') }\n\
round(n) { math(n, 'round') }\n\
sin(n) { math(n, 'sin') }\n\
cos(n) { math(n, 'cos') }\n\
min(a, b) { a < b ? a : b }\n\
max(a, b) { a > b ? a : b }\n\
PI = -math-prop('PI')\n\
\n\
// return the sum of the given numbers\n\
\n\
sum(nums)\n\
  sum = 0\n\
  sum += n for n in nums\n\
\n\
// return the average of the given numbers\n\
\n\
avg(nums)\n\
  sum(nums) / length(nums)\n\
\n\
// color components\n\
\n\
alpha(color) { component(hsl(color), 'alpha') }\n\
hue(color) { component(hsl(color), 'hue') }\n\
saturation(color) { component(hsl(color), 'saturation') }\n\
lightness(color) { component(hsl(color), 'lightness') }\n\
\n\
// check if n is an odd number\n\
\n\
odd(n)\n\
  1 == n % 2\n\
\n\
// check if n is an even number\n\
\n\
even(n)\n\
  0 == n % 2\n\
\n\
// check if color is light\n\
\n\
light(color)\n\
  lightness(color) >= 50%\n\
\n\
// check if color is dark\n\
\n\
dark(color)\n\
  lightness(color) < 50%\n\
\n\
// desaturate color by amount\n\
\n\
desaturate(color, amount)\n\
  adjust(color, 'saturation', - amount)\n\
\n\
// saturate color by amount\n\
\n\
saturate(color, amount)\n\
  adjust(color, 'saturation', amount)\n\
\n\
// darken by the given amount\n\
\n\
darken(color, amount)\n\
  adjust(color, 'lightness', - amount)\n\
\n\
// lighten by the given amount\n\
\n\
lighten(color, amount)\n\
  adjust(color, 'lightness', amount)\n\
\n\
// decerase opacity by amount\n\
\n\
fade-out(color, amount)\n\
  color - rgba(black, amount)\n\
\n\
// increase opacity by amount\n\
\n\
fade-in(color, amount)\n\
  color + rgba(black, amount)\n\
\n\
// return the last value in the given expr\n\
\n\
last(expr)\n\
  expr[length(expr) - 1]\n\
\n\
// join values with the given delimiter\n\
\n\
join(delim, vals...)\n\
  buf = ''\n\
  vals = vals[0] if length(vals) == 1\n\
  for val, i in vals\n\
    buf += i ? delim + val : val\n\
";