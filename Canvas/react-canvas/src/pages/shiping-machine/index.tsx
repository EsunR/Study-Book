import React, { useEffect, useMemo, useState } from 'react';
import { Layer, Stage, Group, Rect } from 'react-konva';
import Header from './components/Header';
import styles from './index.less';
import MachineView, { IMachine } from './components/MachineView';
import MachineListView, {
  MachineListViewProps,
} from './components/MachineListView';

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
    machine_name: '2#定型机',
    data: statusArr,
    status: 'danger',
  },
];

const mockChartData: MachineListViewProps['chartData'] = [
  {
    name: '正常',
    value: 6,
  },
  {
    name: '异常',
    value: 3,
  },
  {
    name: '待机',
    value: 3,
  },
];

const mockMachineList: MachineListViewProps['machineList'] = [
  {
    name: '1#定型机',
    status: 'normal',
  },
  {
    name: '2#定型机',
    status: 'danger',
  },
  {
    name: '3#定型机',
    status: 'standby',
  },
  {
    name: '4#定型机',
    status: 'normal',
  },
  {
    name: '5#定型机',
    status: 'danger',
  },
  {
    name: '6#定型机',
    status: 'danger',
  },
  {
    name: '7#定型机',
    status: 'normal',
  },
  {
    name: '8#定型机',
    status: 'normal',
  },
];

const index = () => {
  const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight);
  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);
  const [machineData, setMachineData] = useState<IMachine[]>([]);

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

  function fetchData() {
    setTimeout(() => {
      setMachineData(mockData);
    }, 500);
  }

  // Effect
  useEffect(() => {
    window.addEventListener('resize', computeCanvasSize);
    fetchData();
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
        {/* Canvas 渲染区域 */}
        <Stage width={layout.width} height={layout.height}>
          {/* Static Layer */}
          <Layer>
            <Header />
          </Layer>
          {/* Static Layer */}

          {/* Anim Layer */}
          <Layer>
            {/* Content */}
            <Group y={100}>
              <MachineListView
                x={40}
                chartData={mockChartData}
                machineList={mockMachineList}
              />
              <MachineView machines={machineData} x={350} />
            </Group>
            {/* Content */}
          </Layer>
          {/* Anim Layer */}
        </Stage>
      </div>
      {/* Canvas 自动缩放渲染区域 */}
    </div>
  );
};

export default index;
