function TodayList({ data, render }) {
  return (
    <ul className="overflow-scroll overflow-x-hidden [&::-webkit-scrollbar]:w-0! scrollbar-none">
      {data.map(render)}
    </ul>
  );
}

export default TodayList;
