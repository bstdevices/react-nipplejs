import React, { useState } from 'react';
import { Nipple, JoystickManagerOptions, JoystickOutputData } from 'react-nipplejs';
import './App.css';

interface ListItemProps {
  label: string;
  data: string | Object;
}
interface NippleProps {
  id: string;
  options: JoystickManagerOptions;
  data: JoystickOutputData | null;
}
function App() {
  const [nipples, setNipples] = useState<NippleProps[]>([
    { id: 'dynamic', options: { mode: 'dynamic', color: 'red' }, data: null },
    { id: 'semi', options: { mode: 'semi', color: 'green', catchDistance: 50 }, data: null },
    { id: 'static', options: { mode: 'static', color: 'yellow' }, data: null },
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
          {nipples.map(({ options, data, id }, index) => (
            <div className="column" key={id}>
              <h2 style={{ color: options.color }}>
                {options?.mode && `${options.mode[0].toUpperCase()}${options.mode.slice(1).toLowerCase()}`}
              </h2>
              <div className="joystick">
                <div className="debug">
                  <Debug data={data} />
                </div>
                <Nipple
                  options={options}
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
