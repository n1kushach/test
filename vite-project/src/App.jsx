import "./App.css";
import data from "../gists.json";
import TableItem from "./components/TableItem";

function App() {
  return (
    <div>
      {data?.map((item, index) => {
        return <TableItem key={index} item={item} />;
      })}
    </div>
  );
}

export default App;
