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
"11421","2025-10-18 08:44:03.967","42.2","6","","11421","null","","CP","","1","0",""
"10735","2025-10-18 08:31:28.250","10","-3.87","","10735","null","15","CP","","3","5","2025-10-18 08:12:06"
"10736","2025-10-18 08:31:32.363","10","-3.83","","10736","null","15","CP","","3","5","2025-10-18 08:12:24"
"10513","2025-10-18 08:30:31.307","10","-3.88","","10513","null","15","CP","","3","5","2025-10-18 08:11:08"
"10992","2025-10-18 08:30:07.420","10","-3.95","","10992","null","15","CP","","3","5","2025-10-18 08:10:23"
"11171","2025-10-18 08:39:08.787","8.3","4","","11171","null","10","CP","","2","1.7","2025-10-18 08:45:56"
"10547","2025-10-18 08:40:32.943","8.3","4.26","","10547","null","10","CP","","2","1.7","2025-10-18 08:47:47"
"10739","2025-10-18 08:40:42.603","8.3","4.25","","10739","null","10","CP","","2","1.7","2025-10-18 08:47:56"
"10987","2025-10-18 08:40:35.297","8.3","4.27","","10987","null","10","CP","","2","1.7","2025-10-18 08:47:51"
"12138","2025-10-18 08:31:25.577","5","4.67","","12138","null","8.3","CP","","1","3.3","2025-10-18 08:46:50"
"13805","2025-10-18 08:38:27.773","5","5.54","","13805","null","8.3","CP","","1","3.3","2025-10-18 08:56:44"
"16206","2025-10-18 08:33:43.743","5","5.12","","16206","null","8.3","CP","","1","3.3","2025-10-18 08:50:37"
"16450","2025-10-18 08:44:02.170","5","6.76","","16450","null","8.3","CP","","1","3.3","2025-10-18 09:06:20"
"16567","2025-10-18 08:44:02.367","5","6.76","","16567","null","8.3","CP","","1","3.3","2025-10-18 09:06:21"
"16661","2025-10-18 08:43:41.673","5","5.84","","16661","null","8.3","CP","","1","3.3","2025-10-18 09:02:57"

"id","lastSeenAt","lastSeenDistanceKm","paceMinPerKm","photoUrl","initials","overlay","next_km","StFhCp_Gbn","foul","ucpcount","next_dist","nextpasstime"
"21824","2025-10-18 08:40:07.293","21.1","6","","21824","null","","CP","","","0",""
"22059","2025-10-18 08:34:05.840","21.1","6","","22059","null","","CP","","","0",""
"23462","2025-10-18 08:43:42.180","21.1","6","","23462","null","","CP","","","0",""
"20021","2025-10-18 08:29:37.167","10","-3.71","","20021","null","15","CP","","3","5","2025-10-18 08:11:05"
"20221","2025-10-18 08:29:36.887","10","-3.7","","20221","null","15","CP","","3","5","2025-10-18 08:11:06"
"21654","2025-10-18 08:40:34.297","5","5.78","","21654","null","8.3","CP","","1","3.3","2025-10-18 08:59:38"
"21716","2025-10-18 08:41:45.437","5","5.81","","21716","null","8.3","CP","","1","3.3","2025-10-18 09:00:56"

"id","lastSeenAt","lastSeenDistanceKm","paceMinPerKm","photoUrl","initials","overlay","next_km","StFhCp_Gbn","foul","ucpcount","next_dist","nextpasstime"
"70029","2025-10-18 08:39:23.113","10.3","6","","70029","null","","CP","","1","0",""
"70044","2025-10-18 08:41:08.517","10.3","6","","70044","null","","CP","","1","0",""
"70063","2025-10-18 08:39:38.367","10.3","6","","70063","null","","CP","","1","0",""
"70207","2025-10-18 08:38:45.253","10.3","6","","70207","null","","CP","","1","0",""
"70590","2025-10-18 08:37:54.873","10.3","6","","70590","null","","CP","","","0",""
"75289","2025-10-18 08:38:16.147","5","5.49","","75289","null","8.3","CP","","1","3.3","2025-10-18 08:56:24"`;
console.log(result);

function parseCSV(csvText: string): (AthleteData | null)[] {
  const lines = csvText.trim().split("\n");
  let arr: (AthleteData | null)[] = [];
  console.log(lines);
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i]
      .split(",")
      .filter((el) => el.length > 0)
      .map((v) => v.trim().replace(/^"|"$/g, ""));

    if (values.length < 9) {
      arr.push(null);
    }
    const athleteId = values[0];
    const athleteName = tmpList.find((a) => a.bib === athleteId)?.name || "";
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
  const [athletes, setAthletes] = useState<(AthleteData | null)[]>([]);
  useEffect(() => {
    const getDataList = async () => {
      console.log("데이터 가져오는중");
      const start = Date.now();
      // const data = { data: result };
      const { data } = await axios.get("https://race-api.vercel.app/api/race");
      console.log(data.data);
      const parsedData = parseCSV(data.data);
      console.log(parsedData);
      const list = tmpList.map(
        (el) => parsedData.find((data) => data?.id === el.bib) || null
      );
      setAthletes(list);
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
              key={`${athlete?.id}-${index}`}
              className="border-t border-gray-700 hover:bg-gray-750 transition-colors"
            >
              <td className="px-4 py-3 text-white font-semibold">
                {athlete?.name}
              </td>
              <td className="px-4 py-3 text-white">
                {athlete?.distance.toFixed(1)} km
              </td>
              <td className="px-4 py-3 text-white">
                {athlete?.pace.toFixed(2)} 분
              </td>
              <td className="px-4 py-3 text-white">{athlete?.nextKm}</td>
              <td className="px-4 py-3 text-white text-sm">
                {athlete?.lastSeenAt !== "-" &&
                  new Date(athlete?.lastSeenAt || "").toLocaleTimeString(
                    "ko-KR",
                    {
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    }
                  )}
                {athlete?.lastSeenAt === "-" && athlete.lastSeenAt}
              </td>
              <td className="px-4 py-3">
                {athlete?.isFinished ? (
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
