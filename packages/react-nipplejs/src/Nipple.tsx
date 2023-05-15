import React, { useEffect, createRef } from 'react';
import nipplejs, { JoystickManagerOptions, EventData, JoystickOutputData } from 'nipplejs';

export interface NippleProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: JoystickManagerOptions;
  onStart?: (e: EventData, data: JoystickOutputData) => void;
  onEnd?: (e: EventData, data: JoystickOutputData) => void;
  onMove?: (e: EventData, data: JoystickOutputData) => void;
  onDir?: (e: EventData, data: JoystickOutputData) => void;
  onPlain?: (e: EventData, data: JoystickOutputData) => void;
  onShown?: (e: EventData, data: JoystickOutputData) => void;
  onHidden?: (e: EventData, data: JoystickOutputData) => void;
  onPressure?: (e: EventData, data: JoystickOutputData) => void;
}

export const Nipple = (props: NippleProps) => {
  const innerRef = createRef<HTMLDivElement>();
  const {
    options = {},
    onStart = () => {},
    onEnd = () => {},
    onMove = () => {},
    onDir = () => {},
    onPlain = () => {},
    onShown = () => {},
    onHidden = () => {},
    onPressure = () => {},
    ...divProps
  } = props;

  useEffect(() => {
    const options = {
      ...props.options,
      ...(innerRef?.current && { zone: props?.options?.zone || innerRef?.current }),
      ...(props?.options?.mode === 'static' && {
        position: {
          top: '50%',
          left: '50%',
        },
      }),
    };

    let _manager = nipplejs.create(options);
    const handleNippleStart = (e: EventData, data: JoystickOutputData) => props?.onStart && props.onStart(e, data);
    const handleNippleEnd = (e: EventData, data: JoystickOutputData) => props?.onEnd && props.onEnd(e, data);
    const handleNippleMove = (e: EventData, data: JoystickOutputData) => props?.onMove && props.onMove(e, data);
    const handleNippleDir = (e: EventData, data: JoystickOutputData) => props?.onDir && props.onDir(e, data);
    const handleNipplePlain = (e: EventData, data: JoystickOutputData) => props?.onPlain && props.onPlain(e, data);
    const handleNippleShown = (e: EventData, data: JoystickOutputData) => props?.onShown && props.onShown(e, data);
    const handleNippleHidden = (e: EventData, data: JoystickOutputData) => props?.onHidden && props.onHidden(e, data);
    const handleNipplePressure = (e: EventData, data: JoystickOutputData) =>
      props?.onPressure && props.onPressure(e, data);

    _manager.on('start', handleNippleStart);
    _manager.on('end', handleNippleEnd);
    _manager.on('move', handleNippleMove);
    _manager.on('dir', handleNippleDir);
    _manager.on('plain', handleNipplePlain);
    _manager.on('shown', handleNippleShown);
    _manager.on('hidden', handleNippleHidden);
    _manager.on('pressure', handleNipplePressure);

    return () => {
      _manager.off('start', handleNippleStart);
      _manager.off('end', handleNippleEnd);
      _manager.off('move', handleNippleMove);
      _manager.off('dir', handleNippleDir);
      _manager.off('plain', handleNipplePlain);
      _manager.off('shown', handleNippleShown);
      _manager.off('hidden', handleNippleHidden);
      _manager.off('pressure', handleNipplePressure);
      _manager.destroy();
    };
  }, []);

  return (
    <div
      ref={innerRef}
      {...divProps}
      style={{
        position: 'relative',
        width: '100px',
        height: '100px',
        overflow: 'hidden',
        margin: 'auto',
        ...props?.style,
      }}
    />
  );
};
