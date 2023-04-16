# Kill the app

##  Already removed in react 18
```
Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

https://github.com/facebook/react/pull/24195

## Problem

1. setTimeout, setInterval
2. cache data tooooooo big
3. closure


## Use Tool

1. 情境
- request 次數
  - `k6 run --duration 2m --vus 100 ddos.js`
- 固定的操作會卡死？

2. 比較操作前後的快照 
![](https://i.imgur.com/KtjO3QO.png)

![](https://i.imgur.com/DnWUuYy.png)




## Reference

- https://itnext.io/javascript-memory-management-how-to-avoid-common-memory-leaks-and-improve-performance-c018dbbca954

- https://vocus.cc/article/61176c17fd89780001942f1c