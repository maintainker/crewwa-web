import axios from "axios";
import { useEffect, useState } from "react";

type Athlete = {
  id: number;
  eventId: number;
  eventName: string;
  lastSeenAt: string | null;
  lastSeenDistanceKm: number | null;
  paceMinPerKm: number | null;
  photoUrl: string | null;
  crewId: number;
  userName: string;
};

const RaceListPage = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  useEffect(() => {
    const getUserList = async () => {
      try {
        const { data } = await axios.get<Athlete[]>(
          "https://race-api.vercel.app/api/cp-data?crewId=1&eventId=1"
        );
        console.log(data);
        setAthletes(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserList();
  }, []);
  return (
    <>
      {athletes.length === 0 && (
        <span className="crewwa-table" style={{ color: "white" }}>
          데이터를 불러오는 중입니다.
        </span>
      )}
      {athletes.length > 0 && (
        <table className="crewwa-table w-full border border-white mt-4">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-white font-semibold">이름</th>
              <th className="px-4 py-3 text-white font-semibold">거리 (km)</th>
              <th className="px-4 py-3 text-white font-semibold">
                페이스 (분/km)
              </th>
              <th className="px-4 py-3 text-white font-semibold">
                마지막 기록
              </th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((athlete, index) => {
              const distance =
                athlete.lastSeenDistanceKm !== null
                  ? athlete.lastSeenDistanceKm.toFixed(1)
                  : "-";
              const pace =
                athlete.paceMinPerKm !== null
                  ? athlete.paceMinPerKm.toFixed(2)
                  : "-";
              const lastSeen =
                athlete.lastSeenAt !== null
                  ? new Date(athlete.lastSeenAt).toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "-";

              return (
                <tr
                  key={`${athlete.id}-${index}`}
                  className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-3 text-white font-semibold">
                    {athlete.userName}
                  </td>
                  <td className="px-4 py-3 text-white">{distance}</td>
                  <td className="px-4 py-3 text-white">{pace}</td>
                  <td className="px-4 py-3 text-white text-sm">{lastSeen}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default RaceListPage;
