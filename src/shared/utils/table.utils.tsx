import { TableCell, styled } from "@mui/material";
import { GREY } from "../../theme/palette";
import { ellipsis } from "./css.utils";

export const StyledHeaderCell = styled(TableCell)(() => ({
  ...ellipsis,
  paddingTop: '10px',
  paddingBottom: '10px',
  fontSize: '15px',
  borderRight: `1px solid ${GREY[400]}`,
  borderColor: GREY[400],
  backgroundColor: GREY[200],
  maxWidth: '15rem', // the max width data cells can have
}));

export const StyledDataCell = styled(TableCell)(() => ({
  ...ellipsis,
  paddingTop: '10px',
  paddingBottom: '10px',
  fontSize: '14px',
  //borderRight: `1px solid ${GREY[300]}`,
  borderBottom: "none",
  maxWidth: '15rem', // the max width data cells can have
}));

