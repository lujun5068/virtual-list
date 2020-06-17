import React, {useState, useEffect, useCallback } from 'react';
import './index.css'

export default function VirtualList({extraCount, screenHeight, itemHeight, renderItem, list}) {
  const renderCount = Math.ceil(screenHeight / itemHeight) + extraCount;
  const [renderList, setRenderList] = useState(list.slice(0, renderCount))
  const [startOffset, setStartOffset] = useState(0);
  const [activeKey, setActiveKey] = useState(null);

  const onListScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = startIndex + renderCount;
    setRenderList(list.slice(startIndex, Math.min(endIndex, list.length)))
    setStartOffset(scrollTop - (scrollTop % itemHeight));
  }

  const onHandleKeyup = useCallback((e) => {
    if (e.keyCode === 38) {
      setActiveKey(activeKey ? activeKey - 1 : 0)
    } else if (e.keyCode === 40) {
      setActiveKey(Math.min(activeKey === null ? 0 : activeKey + 1, list.length - 1))
    }

  }, [activeKey, list.length])

  useEffect(() => {
    document.addEventListener('keyup', onHandleKeyup);
    return () => {
      document.removeEventListener('keyup', onHandleKeyup)
    }
  }, [onHandleKeyup])

  return (
    <div 
      className="VirtualListWrapper" 
      style={{height: screenHeight}}
      onScroll={onListScroll}
    >
      <div className="VirtualListPhantom" style={{height: list.length * itemHeight}}></div>
      <div className="VirtualList" style={{transform: `translate3d(0, ${startOffset}px, 0)`}}>
        {
          renderList.map((item, i) => (
            <div 
              className={activeKey === i ? 'active' : ''} 
              key={i}
              onClick={() => {
                setActiveKey(i);
              }}
            >{renderItem(item)}</div>
          ))
        }
      </div>
    </div>
  )
}
