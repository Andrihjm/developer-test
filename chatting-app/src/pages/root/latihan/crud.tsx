import { useState } from "react";
import {
  useCreatePOSTMutation,
  useEditPUTMutation,
  useGetGETQuery,
} from "../../../redux/api/crud-api-slice";
import { useParams } from "react-router-dom";

type CrudProps = {
  id: string;
  content: string;
};

type CrudType = {
  type: "POST" | "PUT";
};

const Crud = ({ type }: CrudType) => {
  const [content, setContent] = useState("");
  const [id, setId] = useState("");

  const { id: roomId } = useParams();

  const [createPOST] = useCreatePOSTMutation();
  const { data } = useGetGETQuery(roomId!);
  const [editPUT] = useEditPUTMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "POST") {
      await createPOST({
        content,
      }).unwrap();
      setContent("");
    } else if (type === "PUT") {
      await editPUT({
        id,
        content,
      }).unwrap();
      setId("");
      setContent("");
    }
  };

  const handleEdit = (item: CrudProps) => {
    setId(item.id);
    setContent(item.content);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-slate-100">
      <form onSubmit={onSubmit} className="flex items-center gap-4">
        {type === "POST" ? (
          <input
            type="text"
            placeholder="ini post"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={
              "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-0"
            }
          />
        ) : (
          <>
            <input
              type="text"
              placeholder="ini put"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={
                "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-0"
              }
            />
            <input
              type="text"
              placeholder="ini put"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={
                "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-0"
              }
            />
          </>
        )}

        <button
          type="submit"
          className="cursor-pointer rounded-xl bg-red-500 px-4 py-2"
        >
          Submit
        </button>
      </form>

      <div className="bg-slate-500 p-6 text-white">
        {data?.data?.map((item: CrudProps) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4"
          >
            <p>{item.content}</p>
            <div className="flex cursor-pointer items-center gap-6 bg-red-300 px-4 text-black">
              <span onClick={() => handleEdit(item)}>edit</span>
              <span>delete</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crud;
