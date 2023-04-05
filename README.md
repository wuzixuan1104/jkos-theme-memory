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

## Reference

- https://itnext.io/javascript-memory-management-how-to-avoid-common-memory-leaks-and-improve-performance-c018dbbca954