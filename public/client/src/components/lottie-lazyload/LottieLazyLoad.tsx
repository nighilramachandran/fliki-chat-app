import React, { useState, useEffect, memo } from "react";
import Lottie from "react-lottie";

export const LottieLazyLoad = memo(({ url }: any) => {
  const [data, setData] = useState(undefined);

  const getdata = async () => {
    const imageData = await fetch(url).then(async (res) => await res.json());
    setData(imageData);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      {data !== undefined ? (
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: data,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          isClickToPauseDisabled={true}
        />
      ) : null}
    </>
  );
});
