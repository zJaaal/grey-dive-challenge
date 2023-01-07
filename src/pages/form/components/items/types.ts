import React, { ReactNode } from "react";
import { InputType, SelectType } from "../../../../data";

export type ItemContainerProps = {
  Item: () => React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
  Action: () => React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
};
