import { Components, Theme } from "@mui/material/styles";

export const MyComponents: Components<Omit<Theme, "components">> | undefined = {
  MuiButton: {
    defaultProps: {
      disableRipple: true
    }
  },
  MuiListItemButton: {
    defaultProps: {
      disableRipple: true
    },
    styleOverrides: {
      root: {
        "&.Mui-selected .MuiListItemText-root .MuiListItemText-primary": {
          fontWeight: 700
        }
      }
    }
  },
  MuiListItemText: {
    defaultProps: {
      primaryTypographyProps: {
        style: {
          whiteSpace: 'nowrap', overflow:'hidden', textOverflow:'ellipsis'
        }
      },
      secondaryTypographyProps: {
        style: {
          whiteSpace: 'nowrap', overflow:'hidden', textOverflow:'ellipsis'
        }
      }
    }
  },
  MuiInput: {
    defaultProps: {
      spellCheck: false
    }
  }
};