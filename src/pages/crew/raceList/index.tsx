import axios from "axios";
import { useEffect, useState } from "react";

import * as S from "./index.styled";
import { useModal } from "../../../hooks";
import { ViewPhotoModal } from "../../../components";

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
const formatPace = (pace: number | null) => {
  if (pace === null) return "-";
  const min = Math.floor(pace);
  const sec = Math.round((pace - min) * 60);
  const formattedSec = sec.toString().padStart(2, "0");
  return `${min}'${formattedSec}"`;
};
const RaceListPage = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const { openModal, closeModal } = useModal();

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

  useEffect(() => {
    getUserList();
  }, []);

  const openPhoto = (url: string) => {
    const handleCloseModal = () => closeModal(ViewPhotoModal);
    openModal(ViewPhotoModal, {
      imageUrl: url,
      onClose: handleCloseModal,
    });
  };

  return (
    <S.Container>
      {athletes.length === 0 && (
        <span className="crewwa-table" style={{ color: "white" }}>
          데이터를 불러오는 중입니다.
        </span>
      )}
      {athletes.length > 0 && (
        <S.Content>
          <S.HeaderContainer>
            <S.RefreshButton>새로고침</S.RefreshButton>
          </S.HeaderContainer>
          <S.Table className="crewwa-table w-full border border-white mt-4">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-white font-semibold">이름</th>
                <th className="px-4 py-3 text-white font-semibold">
                  거리 (km)
                </th>
                <th className="px-4 py-3 text-white font-semibold">
                  페이스 (분/km)
                </th>
                <th className="px-4 py-3 text-white font-semibold">
                  마지막 기록
                </th>
                <th className="px-4 py-3 text-white font-semibold">사진</th>
              </tr>
            </thead>
            <tbody>
              {athletes.map((athlete, index) => {
                const distance = formatPace(athlete.lastSeenDistanceKm);
                const pace =
                  athlete.paceMinPerKm !== null ? athlete.paceMinPerKm : "-";
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
                    <td className="px-4 py-3 text-white text-center">
                      {athlete.photoUrl ? (
                        <button
                          onClick={() => {
                            athlete.photoUrl && openPhoto(athlete.photoUrl);
                          }}
                        >
                          이미지 보기
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </S.Table>
        </S.Content>
      )}
    </S.Container>
  );
};

export default RaceListPage;
