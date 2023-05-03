import { Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Infinte = () => {
  const [Data, setData] = useState(Array.from({ length: 20 }));

  const fetchData = () => {
    setTimeout(() => {
      setData(Data.concat(Array.from({ length: 20 })));
    }, 1000);
  };
  return (
    <>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <InfiniteScroll
          dataLength={Data.length}
          next={fetchData}
          hasMore={Data.length > 59 ? false : true}
          loader={"loading"}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {Data.map((ele, id) => {
            return (
              <h3 key={id} style={{ margin: "20px" }}>
                Data #{id}
              </h3>
            );
          })}
        </InfiniteScroll>
      </Stack>
    </>
  );
};

export default Infinte;
