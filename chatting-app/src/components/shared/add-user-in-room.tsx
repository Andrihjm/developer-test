import { useState, useMemo } from "react";
import { X } from "lucide-react";
import {
  useAddUserInRoomMutation,
  useGetAllRoomQuery,
} from "../../redux/api/room-api-slice";
import {
  useGetProfileQuery,
  useGetUsersQuery,
} from "../../redux/api/user-api-slice";
import Button from "../ui/button";
import type { RoomType } from "../../types/index.type";

interface AddUserInRoomProps {
  roomId: string;
  onCancel: () => void;
  onSuccess?: () => void;
}

const AddUserInRoom = ({ roomId, onCancel, onSuccess }: AddUserInRoomProps) => {
  const [pendingUserId, setPendingUserId] = useState("");
  const [participantIds, setParticipantIds] = useState<string[]>([]);

  const { data: users = [] } = useGetUsersQuery(undefined);
  const [addUserInRoom, { isLoading: isLoadingAdd }] =
    useAddUserInRoomMutation();
  const { data: roomsResp } = useGetAllRoomQuery(undefined);
  const { data: user } = useGetProfileQuery(undefined);

  const participantUsers = useMemo(() => {
    return users.filter((u: RoomType) => participantIds.includes(u.id));
  }, [participantIds, users]);

  const currentUserId = user?.data?.id;

  const availableUsers = useMemo(() => {
    return users.filter(
      (u: RoomType) => !participantIds.includes(u.id) && u.id !== currentUserId,
    );
  }, [participantIds, users, currentUserId]);

  const isFormValid = participantIds.length > 0;

  const currentRoom = (roomsResp?.data as RoomType[] | undefined)?.find(
    (room) => room.id === roomId,
  );

  if (!currentRoom) {
    return <p className="p-4 text-sm text-gray-500">Loading...</p>;
  }

  const handleAddParticipant = (id: string) => {
    if (!id) return;
    if (!participantIds.includes(id)) {
      setParticipantIds((prev) => [...prev, id]);
    }
    setPendingUserId("");
  };

  const removeParticipant = (id: string) => {
    setParticipantIds((prev) => prev.filter((pid) => pid !== id));
  };

  const handleAddUserInRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      await addUserInRoom({
        roomId,
        userIds: participantIds,
      }).unwrap();

      setParticipantIds([]);
      onSuccess?.();
      onCancel();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleAddUserInRoom} className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {currentRoom?.participants.map((p) => (
          <span className="flex items-center gap-1 rounded-full border border-[#242626] bg-[#161717] px-3 py-1 text-sm text-[#A5A5A5]">
            {currentUserId === p.user.id ? "You" : p.user.username}
          </span>
        ))}

        {participantUsers.map((user: RoomType) => (
          <span
            key={user.id}
            className="flex items-center gap-1 rounded-full border border-[#242626] bg-[#161717] px-3 py-1 text-sm text-[#A5A5A5]"
          >
            {user.username}
            <button
              type="button"
              onClick={() => removeParticipant(user.id)}
              className="cursor-pointer text-[#A5A5A5] hover:text-[#FAFAFA]"
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>

      <select
        value={pendingUserId}
        onChange={(e) => {
          setPendingUserId(e.target.value);
          handleAddParticipant(e.target.value);
        }}
        className="max-w-max rounded-lg !border !border-[#242626] bg-[#161717] p-1 text-sm outline-0"
      >
        <option value="">Select user</option>
        {availableUsers.map((user: RoomType) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>

      <div className="flex w-full items-center justify-end gap-2 pt-4">
        <Button
          type="button"
          className="bg-[#242626] text-[#FAFAFA]"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isLoadingAdd || !isFormValid}
          className={`${
            !isFormValid || isLoadingAdd
              ? "!cursor-not-allowed bg-[#242626] text-[#A5A5A5]"
              : "bg-[#242626] text-white"
          }`}
        >
          {isLoadingAdd ? "Adding..." : "Add participants"}
        </Button>
      </div>
    </form>
  );
};

export default AddUserInRoom;
