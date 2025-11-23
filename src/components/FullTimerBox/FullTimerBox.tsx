import { useEffect, useState } from "react";

export default function FullTimerBox({ bg }: { bg?: string }) {
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
    <>
      <div className="flex items-center gap-1">
        <TimerBox value={hours} bg={bg ? bg : ""} />
        <span>:</span>
        <TimerBox value={minutes} bg={bg ? bg : ""} />
        <span>:</span>
        <TimerBox value={seconds} bg={bg ? bg : ""} />
      </div>
    </>
  );
}

function TimerBox({ value, bg }: { value: string; bg: string }) {
  return (
    <div
      className={`${
        bg ? bg : "bg-[#A44603]"
      } px-2 py-1 rounded text-sm font-semibold min-w-[35px] text-center`}
    >
      {value}
    </div>
  );
}
