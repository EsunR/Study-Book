import React, { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Layer, Stage, Group } from 'react-konva';
import Header from './components/Header';
import styles from './index.less';
import MachineView, { IMachine } from './components/MachineView';
import MachineListView, {
  IMachineListItem,
  MachineListViewProps,
} from './components/MachineListView';
import Time from './components/Time';
// import { getShippingDevices } from './services/shapping';
import FullScreenButton from './components/FullScreenButton';
import ShippingMachineScreenContext, { defaultState } from './state/ShippingMachineScreenContext';
import { reducer } from './state/reducer';

const statusArr = new Array(10).fill({
  wind: {
    current: 1750,
  },
  temperature: {
    current: 1750,
    setting: 195,
  },
});

const mockData: IMachine[] = [
  {
    machine_name: '1#定型机',
    data: statusArr,
    status: 'normal',
  },
  {
    machine_name: '2#定型机',
    data: statusArr,
    status: 'standby',
  },
  {
    machine_name: '3#定型机',
    data: statusArr,
    status: 'danger',
  },
];

export const mockMachineList: MachineListViewProps['machineList'] = [
  {
    id: 1,
    name: '1#定型机',
    status: 'normal',
  },
  {
    id: 2,
    name: '2#定型机',
    status: 'danger',
  },
  {
    id: 3,
    name: '3#定型机',
    status: 'standby',
  },
  {
    id: 4,
    name: '4#定型机',
    status: 'normal',
  },
  {
    id: 5,
    name: '5#定型机',
    status: 'danger',
  },
  {
    id: 6,
    name: '6#定型机',
    status: 'danger',
  },
  {
    id: 7,
    name: '7#定型机',
    status: 'normal',
  },
  {
    id: 8,
    name: '8#定型机',
    status: 'normal',
  },
];

const index = () => {
  const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight);
  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);
  const [state, dispatch] = useReducer(reducer, defaultState);

  const scale = useMemo(() => {
    return canvasHeight / 1080;
  }, [canvasHeight]);

  const layout = useMemo(() => {
    const width = 1920;
    const height = 1080;
    return {
      width,
      height,
      x: (canvasWidth - width * scale) / 2,
      y: (canvasHeight - height * scale) / 2,
      scale: { x: scale, y: scale },
    };
  }, [canvasHeight, canvasWidth, scale]);

  function computeCanvasSize() {
    setCanvasHeight(window.innerHeight);
    setCanvasWidth(window.innerWidth);
  }

  async function fetchMachineListData() {
    // TODO: 获取定型机列表
    // const result = await getShippingDevices();
    dispatch({
      type: 'UPDATE_MACHINE_LIST',
      payload: mockMachineList,
    });
  }

  // Effect
  useEffect(() => {
    window.addEventListener('resize', computeCanvasSize);
    // fetchData();
    fetchMachineListData();
    return () => {
      window.removeEventListener('resize', computeCanvasSize);
    };
  }, []);

  return (
    <div className={styles.screen}>
      {/* Canvas 自动缩放渲染区域 */}
      <div
        id="canvas-area"
        style={{
          width: layout.width,
          height: layout.height,
          left: layout.x - (layout.width / 2) * (1 - scale),
          top: layout.y - (layout.height / 2) * (1 - scale),
          position: 'absolute',
          transform: `scale(${scale})`,
        }}
      >
        <Stage width={layout.width} height={layout.height}>
          <ShippingMachineScreenContext.Provider value={{ state, dispatch }}>
            {/* Static Layer */}
            <Layer>
              <Header />
            </Layer>
            {/* Static Layer */}

            {/* Anim Layer */}
            <Layer>
              {/* FullScreen */}
              <FullScreenButton x={1865} y={10} />
              {/* FullScreen */}

              {/* Time */}
              <Time x={1750} y={52} />
              {/* Time */}

              {/* Content */}
              <Group y={100}>
                <MachineListView x={40} />
                <MachineView x={350} />
              </Group>
              {/* Content */}
            </Layer>
            {/* Anim Layer */}
          </ShippingMachineScreenContext.Provider>
        </Stage>
      </div>
      {/* Canvas 自动缩放渲染区域 */}
    </div>
  );
};

export default index;
