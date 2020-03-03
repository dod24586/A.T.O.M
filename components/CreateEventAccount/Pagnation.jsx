import React from "react";
import Pagination from "react-bootstrap/Pagination";
const Pagnation = props => {
  let active = props.current;
  let items = [];
  if (Math.ceil(props.dataCount / props.Size) <= 1) {
    return null;
  }
  for (
    let number = 1;
    number <= Math.ceil(props.dataCount / props.Size);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={() => props.OnPageChange(number)}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Pagination style={{ justifyContent: "center" }}>
      {" "}{items}
    </Pagination>
  );
};

export default Pagnation;
