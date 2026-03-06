import { BsHourglassBottom } from "react-icons/bs";
import { formatCountdown } from "../../utils/formatTime";

function Timer({ time }: { time: number }) {
  return (
    <p className="time">
      <BsHourglassBottom size="1.1rem" color="white" className="time-icon" />
      {""}
      {formatCountdown(time)}
    </p>
  );
}

export default Timer;
