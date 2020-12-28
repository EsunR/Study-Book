import { MachineStatus } from '../components/MachineView';
import ScreenTheme from '../localfiles/theme';

export const getStatusText = (status: MachineStatus) => {
  switch (status) {
    case 'normal':
      return '正常';
    case 'danger':
      return '预警';
    case 'standby':
      return '待机';
    default:
      return '正常';
  }
};

export const getStatusColor = (status: MachineStatus) => {
  switch (status) {
    case 'danger':
      return ScreenTheme.danger;
    case 'normal':
      return ScreenTheme.normal;
    case 'standby':
      return ScreenTheme.standby;
    default:
      return ScreenTheme.normal;
  }
};

export const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
