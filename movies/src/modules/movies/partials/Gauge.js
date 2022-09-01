import { PieChart } from "react-minimal-pie-chart";

export default function App({max, like}) {

  const getColor = () => {
    const value = (like/max) * 100;
    if(value >=0 && value <=40) {
      return 'red'
    } else if(value >40 && value <=60) {
      return 'yellow'
    } else {
      return 'green'
    }
  }

  return (
    <PieChart
    data={[{ value: (like / max) * 100, color: getColor() }]}
    totalValue={100}
    lineWidth={10}
    label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
    labelStyle={{
      fontSize: "12px",
      fontFamily: "sans-serif",
      fill: "#000000"
    }}
    labelPosition={0}
  />
  );
}
