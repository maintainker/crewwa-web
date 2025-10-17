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
  {
    name: "이준봉",
    bib: "21716",
  },
  {
    name: "최율",
    bib: "21654",
  },
  {
    name: "김용선",
    bib: "12138",
  },
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
const result = `"id","lastSeenAt","lastSeenDistanceKm","paceMinPerKm","photoUrl","initials","overlay","next_km","StFhCp_Gbn","foul","ucpcount","next_dist","nextpasstime"
"10513","2025-10-18 08:05:11.903","0","6","","10513","null","5","CP","","","5",""
"10547","2025-10-18 08:05:22.493","0","6","","10547","null","5","CP","","","5",""
"10706","2025-10-18 07:50:34.733","0","6","","10706","null","5","CP","","","5",""
"10737","2025-10-18 08:05:11.927","0","6","","10737","null","5","CP","","","5",""
"10739","2025-10-18 08:05:17.937","0","6","","10739","null","5","CP","","","5",""
"10987","2025-10-18 08:05:30.557","0","6","","10987","null","5","CP","","","5",""
"11171","2025-10-18 08:05:41.860","0","6","","11171","null","5","CP","","","5",""
"11381","2025-10-18 08:05:11.927","0","6","","11381","null","5","CP","","","5",""
"12138","2025-10-18 08:08:04.800","0","6","","12138","null","5","CP","","","5",""
"13805","2025-10-18 08:10:46.743","0","6","","13805","null","5","CP","","","5",""
"15043","2025-10-18 08:00:24.473","0","6","","15043","null","5","CP","","","5",""
"16206","2025-10-18 08:08:07.577","0","6","","16206","null","5","CP","","","5",""
"16450","2025-10-18 08:10:14.017","0","6","","16450","null","5","CP","","","5",""
"16567","2025-10-18 08:10:14.073","0","6","","16567","null","5","CP","","","5",""
`;
console.log(result);

function parseCSV(csvText: string): AthleteData[] {
  const lines = csvText.trim().split("\n");
  let arr: AthleteData[] = [];
  console.log(lines);
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i]
      .split(",")
      .map((v) => v.trim().replace(/^"|"$/g, ""));

    if (values.length < 9) {
      arr.push({
        id: tmpList[i - 1].bib,
        name: tmpList[i - 1].name,
        distance: 0,
        pace: 0,
        nextKm: "-",
        lastSeenAt: "-",
        isFinished: false,
      });
    }
    const athleteId = values[0];
    const athleteName =
      tmpList.find((a) => a.bib === athleteId)?.name || tmpList[i - 1].name;
    const paceMinPerKm = parseFloat(values[3]) || 0;
    const isFinished =
      values[8]?.toUpperCase() === "FINISH" || values[8]?.toUpperCase() === "F";
    console.log(i - 1, tmpList);
    arr.push({
      id: athleteId,
      name: athleteName,
      distance: parseFloat(values[2]) || 0,
      pace: paceMinPerKm,
      nextKm: values[7] || "-",
      lastSeenAt: new Date(values[1]),
      isFinished: isFinished,
    });
  }
  return arr;
  // if (lines.length < 2) {
  //   return {
  //     id: tmpList[index].bib,
  //     name: tmpList[index].name,
  //     distance: 0,
  //     pace: 0,
  //     nextKm: "-",
  //     lastSeenAt: "-",
  //     isFinished: false,
  //   };
  // }

  // const dataLine = lines[1];
  // const values = dataLine.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));

  // if (values.length < 9) return null;

  // const athleteId = values[0];
  // const athleteName =
  //   tmpList.find((a) => a.bib === athleteId)?.name || tmpList[index].name;
  // const paceMinPerKm = parseFloat(values[3]) || 0;
  // const isFinished =
  //   values[8]?.toUpperCase() === "FINISH" || values[8]?.toUpperCase() === "F";

  // return {
  //   id: athleteId,
  //   name: athleteName,
  //   distance: parseFloat(values[2]) || 0,
  //   pace: paceMinPerKm,
  //   nextKm: values[7] || "-",
  //   lastSeenAt: new Date(values[1]),
  //   isFinished: isFinished,
  // };
}

function App() {
  const [athletes, setAthletes] = useState<AthleteData[]>([]);
  useEffect(() => {
    const getDataList = async () => {
      console.log("데이터 가져오는중");
      const start = Date.now();
      // const data = { data: result };
      const { data } = await axios.get("https://race-api.vercel.app/api/race");
      console.log(data.data);
      const parsedData = parseCSV(data.data);
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
