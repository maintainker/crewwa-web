import axios from "axios";
import { useEffect, useState } from "react";

import * as S from "./index.styled";
import { useModal } from "../../../hooks";
import { ViewPhotoModal } from "../../../components";
import { useParams } from "react-router-dom";

type Athlete = {
  id: number;
  bib: string;
  eventId: number;
  eventName: string;
  lastSeenAt: string | null;
  lastSeenDistanceKm: number | null;
  paceMinPerKm: number | null;
  photoUrl: string | null;
  crewId: number;
  userName: string;
  lastSeenCpName: string;
};
const RaceListPage = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal, closeModal } = useModal();

  const { crewId, eventId } = useParams();
  const getUserList = async () => {
    try {
      if (!crewId || !eventId) {
        return;
      }
      const { data } = await axios.get<Athlete[]>(
        `https://race-api.vercel.app/api/cp-data?crewId=${crewId}&eventId=${eventId}`
      );
      setLoading(false);
      setAthletes(data);
    } catch (error) {
      console.log(error);
    }
  };
  const reloadingData = () => {
    setLoading(true);
    getUserList();
  };

  useEffect(() => {
    console.log("getdata");
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
            <S.RefreshButton disabled={loading} onClick={reloadingData}>
              {loading ? "불러오기 중" : "새로고침"}
            </S.RefreshButton>
          </S.HeaderContainer>
          <S.Table className="crewwa-table w-full border border-white mt-4">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-white font-semibold">이름</th>
                <th className="px-4 py-3 text-white font-semibold">배번</th>
                <th className="px-4 py-3 text-white font-semibold">
                  체크포인트
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
                const distance = athlete.lastSeenCpName ?? "-";
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
                    <td className="px-4 py-3 text-white">{athlete.bib}</td>
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
