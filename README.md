⏰ React-on-time
======
Power timers to play schedule like a fiddle.

[![Build Status](https://travis-ci.org/theKashey/react-on-time.svg?branch=master)](https://travis-ci.org/theKashey/react-on-time)
[![NPM version](https://img.shields.io/npm/v/react-on-time.svg)](https://www.npmjs.com/package/react-on-time)
 

Renderless timers and intervals for delayed rendering, complex animation and orchestration.

This works like a music on sheets. Mount -> wait -> fire -> unmount.

Super __simple and predictable__, but gives you ability to construct any animations "flow" you might need.



# API

1. `Timeout` - Timer, which will execute only once.
 - took `timeout` as timer duration, 
 - `then` as optional callback and optional children as a render prop.
```js
import {Timeout} from 'react-on-time';

<Timeout timeout={1000} then={doSomething}/>

<Timeout timeout={1000}>
 { timedout => timedout && <RenderSomething />}
</Timeout>
```

2. `Interval` - Periodical timer. Never stops.
 - tooks delay is interval duration
 - `onTick` or renderprop as a callback
```js
import {Interval} from 'react-on-time';

<Interval delay={1000} onTick={tick => doSomething(tick)}/>

<Interval delay={1000}>
 { tick => <span>#{tick}</span> }
</Interval> 
```

3. `Stopwatch` - Continuous progress tracker, counting from 0 to 1.
Based of request animation frame, could be used for animations.
 - tooks `timeout` as duration, and start calling `onTick` or children every frame.
```js
import {Stopwatch} from 'react-on-time';

<Stopwatch timeout={1000} onTick={progress => doSomething(progress)}/>

<Stopwatch timout={1000}>
 { progress => <span>#{Math.round(100*progress)}</span> }
</Stopwatch> 
```

4. `Era` - something which starts and ends. (Requires React 16 to work)
 - had `onStart` and `onEnd` handlers
 - accepts "normal" childrens
```js
import {Era} from 'react-on-time';

<Era onStart={doSomething} onEnd={doSomething}>
 <Timer />
 <Interval />
</Stopwatch> 
```  

# Power usage

```js
import {Value} from 'react-powerplug';
import {Timeout, Era} from 'react-on-time';

<Value initial={0}>
 {({value, set}) => (
   <React.Fragment>
     // mount Timer on sequence 0
     { value === 0 && <Timeout timeout={100} then={() => set(1)}/>}
   
     // on sequence 1 mount timer, and sub-timer
     { value === 1 && 
     <Fragment>
       <Timeout timeout={1000} then={() => set(1)}/>
       <Timeout timeout={100}> {
         timedOut => timedOut && (
           // this block will be mounted 100ms after
           <Era onStart={doSomething} onEnd={doSomething}>
              <Timeout timeout={100} then={doSomething}/>             
              <Timeout timeout={200} then={doSomething}/>
              <Timeout timeout={300} then={doSomething}/>
           </Era>
         ) 
       }</Timeout>
     </Fragment>
     }
     
     // sets some values to "state"
     { value===2 && <Interval duration={100} onTick={tick => setState({[tick]:true})}/>}
     // when state[10] is set - change sequence, killing interval
     { state[10] && setValue(3)} 
     
     <div> current phase is {value}</div>
   </React.Fragment>
 )}
</Value> 
```

# Licence
 MIT