import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";

interface AthleteData {
  id: string;
  name: string;
  distance: number;
  pace: number;
  nextKm: string;
  lastSeenAt: Date | string;
  isFinished: boolean;
}

const tmpList = [
  {
    name: "신혜림",
    bib: "75289",
  },
  { name: "김용선", bib: "12138" },
  {
    name: "이상임",
    bib: "16567",
  },
  {
    name: "오성우",
    bib: "10987",
  },
  {
    name: "유가현",
    bib: "16661",
  },
  {
    name: "전재훈",
    bib: "11171",
  },
  {
    name: "권은경",
    bib: "16450",
  },
  {
    name: "최진형",
    bib: "10547",
  },
  {
    name: "윤재연",
    bib: "13805",
  },
  {
    name: "김지훈",
    bib: "10739",
  },
  {
    name: "조윤미",
    bib: "16206",
  },
];
const result = {
  message: "Hello World",
  data: [
    {
      status: "fulfilled",
      value:
        '"id","lastSeenAt","lastSeenDistanceKm","paceMinPerKm","photoUrl","initials","overlay","next_km","StFhCp_Gbn","foul","ucpcount","next_dist","nextpasstime"\r\n',
    },
    {
      status: "fulfilled",
      value:
        '"id","lastSeenAt","lastSeenDistanceKm","paceMinPerKm","photoUrl","initials","overlay","next_km","StFhCp_Gbn","foul","ucpcount","next_dist","nextpasstime"\r\n"10002","2025-10-15 08:11:00.000","42.2","6","","10002","null","","Finish","","11","0","2025-10-15 08:11:00"\r\n',
    },
    {
      status: "fulfilled",
      value:
        '"id","lastSeenAt","lastSeenDistanceKm","paceMinPerKm","photoUrl","initials","overlay","next_km","StFhCp_Gbn","foul","ucpcount","next_dist","nextpasstime"\r\n"10002","2025-10-15 08:11:00.000","42.2","6","","10002","null","","Finish","","11","0","2025-10-15 08:11:00"\r\n',
    },
    {
      status: "fulfilled",
      value:
        '"id","lastSeenAt","lastSeenDistanceKm","paceMinPerKm","photoUrl","initials","overlay","next_km","StFhCp_Gbn","foul","ucpcount","next_dist","nextpasstime"\r\n"10002","2025-10-15 08:11:00.000","42.2","6","","10002","null","","Finish","","11","0","2025-10-15 08:11:00"\r\n',
    },
    {
      status: "fulfilled",
      value:
        '"id","lastSeenAt","lastSeenDistanceKm","paceMinPerKm","photoUrl","initials","overlay","next_km","StFhCp_Gbn","foul","ucpcount","next_dist","nextpasstime"\r\n"10002","2025-10-15 08:11:00.000","42.2","6","","10002","null","","Finish","","11","0","2025-10-15 08:11:00"\r\n',
    },
    {
      status: "fulfilled",
      value:
        '"id","lastSeenAt","lastSeenDistanceKm","paceMinPerKm","photoUrl","initials","overlay","next_km","StFhCp_Gbn","foul","ucpcount","next_dist","nextpasstime"\r\n"10002","2025-10-15 08:11:00.000","42.2","6","","10002","null","","Finish","","11","0","2025-10-15 08:11:00"\r\n',
    },
    {
      status: "fulfilled",
      value:
        '"id","lastSeenAt","lastSeenDistanceKm","paceMinPerKm","photoUrl","initials","overlay","next_km","StFhCp_Gbn","foul","ucpcount","next_dist","nextpasstime"\r\n"10002","2025-10-15 08:11:00.000","42.2","6","","10002","null","","Finish","","11","0","2025-10-15 08:11:00"\r\n',
    },
    {
      status: "fulfilled",
      value:
        '"id","lastSeenAt","lastSeenDistanceKm","paceMinPerKm","photoUrl","initials","overlay","next_km","StFhCp_Gbn","foul","ucpcount","next_dist","nextpasstime"\r\n"10002","2025-10-15 08:11:00.000","42.2","6","","10002","null","","Finish","","11","0","2025-10-15 08:11:00"\r\n',
    },
    {
      status: "fulfilled",
      value:
        '"id","lastSeenAt","lastSeenDistanceKm","paceMinPerKm","photoUrl","initials","overlay","next_km","StFhCp_Gbn","foul","ucpcount","next_dist","nextpasstime"\r\n"10002","2025-10-15 08:11:00.000","42.2","6","","10002","null","","Finish","","11","0","2025-10-15 08:11:00"\r\n',
    },
    {
      status: "fulfilled",
      value:
        '"id","lastSeenAt","lastSeenDistanceKm","paceMinPerKm","photoUrl","initials","overlay","next_km","StFhCp_Gbn","foul","ucpcount","next_dist","nextpasstime"\r\n"10002","2025-10-15 08:11:00.000","42.2","6","","10002","null","","Finish","","11","0","2025-10-15 08:11:00"\r\n',
    },
    {
      status: "fulfilled",
      value:
        '"id","lastSeenAt","lastSeenDistanceKm","paceMinPerKm","photoUrl","initials","overlay","next_km","StFhCp_Gbn","foul","ucpcount","next_dist","nextpasstime"\r\n"10002","2025-10-15 08:11:00.000","42.2","6","","10002","null","","Finish","","11","0","2025-10-15 08:11:00"\r\n',
    },
  ],
};

function parseCSV(csvText: string, index: number): AthleteData | null {
  const lines = csvText.trim().split("\r\n");
  if (lines.length < 2) {
    return {
      id: tmpList[index].bib,
      name: tmpList[index].name,
      distance: 0,
      pace: 0,
      nextKm: "-",
      lastSeenAt: "-",
      isFinished: false,
    };
  }

  const dataLine = lines[1];
  const values = dataLine.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));

  if (values.length < 9) return null;

  const athleteId = values[0];
  const athleteName =
    tmpList.find((a) => a.bib === athleteId)?.name || tmpList[index].name;
  const paceMinPerKm = parseFloat(values[3]) || 0;
  const isFinished =
    values[8]?.toUpperCase() === "FINISH" || values[8]?.toUpperCase() === "F";

  return {
    id: athleteId,
    name: athleteName,
    distance: parseFloat(values[2]) || 0,
    pace: paceMinPerKm,
    nextKm: values[7] || "-",
    lastSeenAt: new Date(values[1]),
    isFinished: isFinished,
  };
}

function App() {
  const [athletes, setAthletes] = useState<AthleteData[]>([]);
  useEffect(() => {
    const getDataList = async () => {
      console.log("데이터 가져오는중");
      const start = Date.now();
      // const data = result;
      const { data } = await axios.get("https://race-api.vercel.app/api/race");

      const parsedData = (data as typeof result).data.map((el, index) =>
        parseCSV(el.value, index)
      );
      console.log(parsedData);
      setAthletes(
        parsedData.filter((item): item is AthleteData => item !== null)
      );
      console.log(data);
      console.log(`time: ${Date.now() - start}`);
    };
    getDataList();
  }, []);
  console.log(athletes);
  return (
    <>
      {athletes.length === 0 && (
        <span className="crewwa-table" style={{ color: "white" }}>
          데이터를 불러오는 중입니다.
        </span>
      )}
      <table className="crewwa-table" style={{ border: "1px solid white" }}>
        <thead className="bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-white font-semibold">이름</th>
            <th className="px-4 py-3 text-white font-semibold">거리 (km)</th>
            <th className="px-4 py-3 text-white font-semibold">
              페이스 (분/km)
            </th>
            <th className="px-4 py-3 text-white font-semibold">
              다음 체크포인트
            </th>
            <th className="px-4 py-3 text-white font-semibold">마지막 기록</th>
            <th className="px-4 py-3 text-white font-semibold">상태</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete, index) => (
            <tr
              key={`${athlete.id}-${index}`}
              className="border-t border-gray-700 hover:bg-gray-750 transition-colors"
            >
              <td className="px-4 py-3 text-white font-semibold">
                {athlete.name}
              </td>
              <td className="px-4 py-3 text-white">
                {athlete.distance.toFixed(1)} km
              </td>
              <td className="px-4 py-3 text-white">
                {athlete.pace.toFixed(2)} 분
              </td>
              <td className="px-4 py-3 text-white">{athlete.nextKm}</td>
              <td className="px-4 py-3 text-white text-sm">
                {athlete.lastSeenAt !== "-" &&
                  new Date(athlete.lastSeenAt).toLocaleTimeString("ko-KR", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                {athlete.lastSeenAt === "-" && athlete.lastSeenAt}
              </td>
              <td className="px-4 py-3">
                {athlete.isFinished ? (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    완주
                  </span>
                ) : (
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    진행중
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
