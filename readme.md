## discriminator 和 populate 使用的例子


1. 使用了 4.6+ 这段程序会报错
```
events.js:160
      throw er; // Unhandled 'error' event
      ^

TypeError: Unknown encoding: 1
    at Buffer.slowToString (buffer.js:484:17)
    at Buffer.toString (buffer.js:497:27)
    at ObjectID.toString (/Users/wjlin/works/coach/129-mongo/discriminator/node_modules/bson/lib/bson/objectid.js:174:20)
    ...
```
使用 4.3.3 没有问题

