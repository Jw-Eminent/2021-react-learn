import React from "react";
import { Select } from "antd";
import { Raw } from "types";

type SelectProps = React.ComponentProps<typeof Select>;

interface PropsType
  extends Omit<SelectProps, "options" | "value" | "onChange"> {
  value: Raw | undefined | null;
  options: { name: string; id: number }[];
  defaultOptionName?: string;
  onChange: (value?: number) => void;
}

/**
 * value 可以接受多种类型的值
 * onChange 参数只接受number | undefined类型
 * 当 isNaN(Number(value)) === true时，表示选择了默认选项
 * 当选择默认选项时，onChange参数为undefined
 * @export
 * @param {PropsType} props
 */

export default function IdSelector(props: PropsType) {
  const {
    defaultOptionName,
    value,
    options,
    onChange: handleSelect,
    ...restProps
  } = props;

  return (
    <Select
      {...restProps}
      value={toNumber(value)}
      onChange={(value) => handleSelect(toNumber(value) || undefined)}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options.map((o) => (
        <Select.Option key={o.id} value={o.id}>
          {o.name}
        </Select.Option>
      ))}
    </Select>
  );
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
