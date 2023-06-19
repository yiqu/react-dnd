import { CSSProperties } from "react";

export const flexCenter = {
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex'
};

export const ellipsis = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

export const isDraggingStyles: CSSProperties = {
  border: '2px solid',
  borderColor: 'primary.main'
};