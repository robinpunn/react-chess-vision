import { formatPreCountdown } from "../../utils/formatTime";

function PreCount({ time }: { time: number }) {
  return (
    <tbody className="precount" style={{ color: "white", fontSize: "3rem" }}>
      <tr>
        <td>{formatPreCountdown(Math.ceil(time/1000))}</td>
      </tr>
    </tbody>
  );
}

export default PreCount;
