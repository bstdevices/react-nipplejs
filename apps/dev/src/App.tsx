import React, { useState } from 'react';
import { Nipple } from 'react-nipplejs';
import './App.css';

interface ListItemProps {
  label: string;
  data: string | Object;
}

function App() {
  const [nipples, setNipples] = useState([
    { id: 'dynamic', mode: 'dynamic', color: 'red', data: null },
    { id: 'semi', mode: 'semi', color: 'green', data: null },
    { id: 'static', mode: 'static', color: 'yellow', data: null },
  ]);

  const handleNippleData = (index: number, data: any) => {
    setNipples((prev) => {
      let newArr = [...prev];
      newArr[index] = { ...newArr[index], data };
      return newArr;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header">
          <div className="colorful">REACT-NIPPLEJS</div>
        </h1>
      </header>
      <section>
        <div className="container">
          {nipples.map(({ mode, color, data, id }: { mode: any; color: string; data?: any; id: string }, index) => (
            <div className="column" key={id}>
              <h2>{`${mode[0].toUpperCase()}${mode.slice(1).toLowerCase()}`}</h2>
              <div className="joystick">
                <div className="debug">
                  <Debug data={data} />
                </div>
                <Nipple
                  options={{ mode, color }}
                  onStart={(_, _data: any) => handleNippleData(index, _data)}
                  onMove={(_, _data: any) => handleNippleData(index, _data)}
                  onEnd={(_, _data: any) => handleNippleData(index, _data)}
                  style={{ width: 'inherit', height: 'inherit' }}
                  className={'my-nipple'}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const Debug = ({ data }: { data: any }) => {
  return (
    <ul>
      <ListItem label={'position'} data={data?.position} />
      <ListItem label={'force'} data={data?.force} />
      <ListItem label={'pressure'} data={data?.pressure} />
      <ListItem label={'distance'} data={data?.distance} />
      <ListItem label={'angle'} data={data?.angle} />
      <ListItem label={'direction'} data={data?.direction} />
    </ul>
  );
};

const ListItem = (props: ListItemProps) => {
  const { label, data } = props;
  const itemValue =
    typeof data === 'object' ? (
      <ul>
        {Object.entries(data).map(([key, value], i) => (
          <ListItem key={key} label={key} data={value} />
        ))}
      </ul>
    ) : (
      <strong>{data}</strong>
    );

  return (
    <li>
      {label}: {itemValue}
    </li>
  );
};
export default App;
