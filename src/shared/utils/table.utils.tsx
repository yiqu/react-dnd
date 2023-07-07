import { TableCell, styled } from "@mui/material";
import { GREY } from "../../theme/palette";
import { ellipsis } from "./css.utils";

export const StyledHeaderCell = styled(TableCell)(() => ({
  ...ellipsis,
  paddingTop: '5px',
  paddingBottom: '5px',
  fontSize: '12px',
  borderRight: `1px solid ${GREY[400]}`,
  borderColor: GREY[400],
  backgroundColor: GREY[200],
}));

export const StyledDataCell = styled(TableCell)(() => ({
  ...ellipsis,
  paddingTop: '5px',
  paddingBottom: '5px',
  fontSize: '10px',
  //borderRight: `1px solid ${GREY[300]}`,
  borderBottom: "none",
}));

