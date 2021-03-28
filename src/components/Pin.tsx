import React from "react";
import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export default function Pin(props: PinProps) {
  const { checked, onCheckedChange: handleChange, ...restProps } = props;
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => handleChange?.(!!num)}
      {...restProps}
    />
  );
}
