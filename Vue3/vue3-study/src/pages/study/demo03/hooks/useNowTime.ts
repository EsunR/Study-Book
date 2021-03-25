import { ref } from "vue";

const useNowTime = () => {
  const nowTime = ref("00:00:00");

  const getNowTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    nowTime.value = `${hour}:${min}:${sec}`;
    setTimeout(getNowTime, 1000);
  };

  return { nowTime, getNowTime };
};

export default useNowTime;
