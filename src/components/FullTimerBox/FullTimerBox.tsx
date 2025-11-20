import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function FullTimerBox() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  return (
    <div className="flex items-center gap-3 border border-white/40 py-1 rounded-lg text-white min-w-70 justify-center">
      <span className="flex items-center gap-1 text-sm">
        <Clock size={14} /> Ends in:
      </span>
      <div className="flex items-center gap-1">
        <TimerBox value={hours} />
        <span>:</span>
        <TimerBox value={minutes} />
        <span>:</span>
        <TimerBox value={seconds} />
      </div>
    </div>
  );
}

function TimerBox({ value }: { value: string }) {
  return (
    <div className="bg-[#A44603] px-2 py-1 rounded text-sm font-semibold min-w-[35px] text-center">
      {value}
    </div>
  );
}
