⏰ React-Power-Timers
======
Renderless timers and intervals. For delayed rendering, and animation orchestration.


# API

1. `Timeout` - Timer, which will execute only once.
```js
import {Timeout} from 'react-power-timers';

<Timeout timeout={1000} then={doSomething}/>

<Timeout timeout={1000}>
 { timedout => timedout && <RenderSomething />}
</Timeout>
```

2. `Interval` - Periodical timer
```js
import {Interval} from 'react-power-timers';

<Interval delay={1000} onTick={tick => doSomething(tick)}/>

<Interval delay={1000}>
 { tick => <span>#{tick}</span> }
</Interval> 
```

3. `Stopwatch` - Continuous progress tracker, counting from 0 to 1.
Based of request animation frame, could be used for animations.
```js
import {Stopwatch} from 'react-power-timers';

<Stopwatch timeout={1000} onTick={progress => doSomething(progress)}/>

<Stopwatch timout={1000}>
 { progress => <span>#{Math.round(100*progress)}</span> }
</Stopwatch> 
```

# Power usage

```js
import {Value} from 'react-powerplug';
import {Timeout} from 'react-power-timers';

<Value initial={0}>
 {({value, set}) => (
   <React.Fragment>
     { value === 0 && <Timeout timeout={100} then={() => set(1)}/>}
     { value === 1 && <Timeout timeout={100} then={() => set(2)}/>}
     { value === 2 && <Timeout timeout={100} then={() => set(0)}/>}
     
     <div> current phase is {value}</div>
   </React.Fragment>
 )}
</Value> 
```

# Licence
 MIT