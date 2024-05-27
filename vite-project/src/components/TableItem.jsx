/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import { useState } from "react";

const TableItem = ({ item }) => {
  const [selected, setSelected] = useState("deal");

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (selected) {
      case "deal":
        fetch("http://localhost:1800/" + selected + "/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: String(item.id),
            userId: item.files.size,
            originId: item.url,
          }),
        })
          .then((res) => {
            console.log(res, "RES");
          })
          .catch((err) => {
            console.log(err, "ERROR");
          });
        break;
      case "activity":
        fetch("http://localhost:1800/" + selected + "/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: item.description,
            location: item.owner.login,
            note: item.owner.url,
          }),
        })
          .then((res) => {
            console.log(res, "RES");
          })
          .catch((err) => {
            console.log(err, "ERROR");
          });
        break;
    }
  };

  return (
    <div className="flex items-center gap-12 text-[12px]">
      <div className="flex-[1] flex justify-start">
        <h1>{item.id}</h1>
      </div>
      <div className="flex-[1] flex justify-start">
        <h1>{item.url}</h1>
      </div>
      <div className="flex-[1] flex justify-start">
        <h1>{item.created_at}</h1>
      </div>
      <div className="flex-[1] flex justify-start">
        <select
          onChange={(e) => setSelected(e.target.value)}
          value={selected || ""}
          className="bg-slate-300"
        >
          <option value="deal">Deal</option>
          <option value="activity">Activity</option>
        </select>
      </div>
      <div className="flex-[1] flex justify-start">
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </div>
    </div>
  );
};

export default TableItem;
