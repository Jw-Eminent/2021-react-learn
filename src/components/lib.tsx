/* eslint-disable @typescript-eslint/indent */
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";
import styled from "@emotion/styled";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  bottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.bottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

const FullScreenStatus = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FullPageLoading = ({ tip }: { tip?: string }) => (
  <FullScreenStatus>
    <Spin size={"large"} tip={tip || ""} />
  </FullScreenStatus>
);

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullScreenStatus>
    <DevTools />
    <ErrorBox error={error} />
  </FullScreenStatus>
);

// 类型守卫
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }
  return null;
};
