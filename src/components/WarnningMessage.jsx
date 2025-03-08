import React from "react";

const WarnningMessage = () => {
  return (
    <div>
      <p className="text-center text-red-600 font-semibold p-3 text-sm">
        🚨 <span className="font-bold">تنبيه هام:</span> منتجات الفيب تحتوي على{" "}
        <span className="underline">النيكوتين</span>، وهو مادة تسبب{" "}
        <span className="font-bold">الإدمان</span>. يُنصح باستخدامها من قبل{" "}
        <span className="text-white">البالغين فقط</span>
      </p>
    </div>
  );
};

export default WarnningMessage;
