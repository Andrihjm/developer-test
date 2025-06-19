import { useState, useMemo } from "react";
import { useCreateRoomMutation } from "../../redux/api/room-api-slice";
import {
  useGetProfileQuery,
  useGetUsersQuery,
} from "../../redux/api/user-api-slice";
import type { UserType } from "../../types/index.type";
import Button from "../ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OptionProps {
  id: string;
  username: string;
}

type CreateRoomFormProps = {
  onCancel: () => void;
  onSuccess?: () => void;
};

const CreateRoomForm = ({ onCancel, onSuccess }: CreateRoomFormProps) => {
  const [name, setName] = useState("");
  const [pendingUserId, setPendingUserId] = useState("");
  const [participantIds, setParticipantIds] = useState<string[]>([]);

  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const { data: users = [] } = useGetUsersQuery(undefined);
  const { data: profile } = useGetProfileQuery(undefined);

  const navigate = useNavigate();

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

  const handleCreateRoomForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || participantIds.length === 0) return;

    try {
      const newRoom = await createRoom({
        name: name.trim(),
        userIds: participantIds,
      }).unwrap();

      setName("");
      setParticipantIds([]);
      navigate(`/chat-room/${newRoom.id}`, {
        state: {
          room: newRoom,
        },
      });
      onSuccess?.();
    } catch (error) {
      console.error("error create room", error);
    }
  };

  const isFormValid = name.trim() !== "" && participantIds.length > 0;

  const participantUsers = useMemo(
    () => users.filter((u: OptionProps) => participantIds.includes(u.id)),
    [participantIds, users],
  );

  const availableUsers = useMemo(
    () => users.filter((u: OptionProps) => !participantIds.includes(u.id)),
    [participantIds, users],
  );

  return (
    <form onSubmit={handleCreateRoomForm} className="space-y-4">
      <input
        type="text"
        placeholder="Room name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-lg border border-[#242626] bg-transparent px-2 py-2 text-sm outline-0"
      />

      <div className="flex flex-wrap gap-2">
        {participantUsers.length === 0 ? (
          <span className="rounded-lg border border-[#242626] px-2 py-1 text-sm text-[#A5A5A5]">
            No participants selected
          </span>
        ) : (
          participantUsers.map((user: OptionProps) => (
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
          ))
        )}
      </div>

      <select
        value={pendingUserId}
        onChange={(e) => {
          setPendingUserId(e.target.value);
          handleAddParticipant(e.target.value);
        }}
        className="max-w-max rounded-lg border border-[#242626] bg-[#161717] p-1 text-sm outline-0"
      >
        <option value="">Select user</option>
        {availableUsers.map((user: UserType) => {
          if (user.id === profile?.data?.id) return null;

          return (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          );
        })}
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
          disabled={isLoading || !isFormValid}
          className={`${
            !isFormValid || isLoading
              ? "cursor-not-allowed bg-[#242626] text-[#A5A5A5]"
              : "bg-[#242626] text-[#FAFAFA]"
          }`}
        >
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default CreateRoomForm;
