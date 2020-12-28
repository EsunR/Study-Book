import React, { useMemo } from 'react';
import { MachineStatus } from '../components/MachineView';
import { getStatusColor, getStatusText } from '../controller';

const useMachineStatus = (status: MachineStatus) => {
  const statusColor = useMemo(() => {
    return getStatusColor(status);
  }, [status]);

  const statusText = useMemo(() => {
    return getStatusText(status);
  }, [status]);

  return {
    statusColor,
    statusText,
  };
};

export default useMachineStatus;
