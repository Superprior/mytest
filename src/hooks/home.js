import React, { useRef, useEffect, useState, useContext } from 'react'
import ReactGA from 'react-ga';
import Context from '../utils/context'


const Home = props => {
  const context = useContext(Context)
  const [scrollState, setScroll] = useState(false)
  const intersectTarget = useRef(null)

  useEffect(() => {
    // ReactGA.pageview(props.location.pathname);
    if(!context.initialLoadProp) {
      context.setInitialLoadProp(true)
    }
  }, [])

  useEffect(() => {
    const opts = {
            root: null,
            rootMargin: '0px',
            threshold: 0
    }
    const callback = entry => {
        if(entry.isIntersection) {
          ReactGA.event({
            category: 'Scroll',
            action: 'Scrolled to heading 2'
          })
        }
    }
    const observerScroll = new IntersectionObserver(callback, opts)

    observerScroll.observe(intersectTarget.current)
  }, [])

  return(
    <div>
      <img height="500px"
           width="500px"
           src="https://timedotcom.files.wordpress.com/2019/03/kitten-report.jpg" alt=""/>
      <div style={{height: '500px', backgroundColor: 'red'}}>
        <h1>First Heading</h1>
      </div>
      <div style={{height: "500px", backgroundColor: 'blue'}}>
        <h1 ref={intersectTarget}
            id="heading2">
          Second Heading
        </h1>
      </div>
    </div>
  )
};

export default Home;
