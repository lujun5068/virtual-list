import React from 'react';
import VirtualList from './components/VirtualList';
import './app.css';

const total = 10;
const listData = [];
const screenHeight = 500;
const itemHeight = 100;

for (let i = 0; i < total; i++) {
  listData.push(`listItem ${i}`)
}

const renderListItem = (val) => <div className="ListItem" style={{height: itemHeight}}>{val}</div>


function App() {
  return (
    <div className="App">
      <VirtualList 
        extraCount={2}
        screenHeight={screenHeight} 
        itemHeight={itemHeight}
        renderItem={renderListItem} 
        list={listData} 
      />
    </div>
  );
}

export default App;
