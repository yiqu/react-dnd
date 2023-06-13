import { Stack } from "@mui/material";
import LoadingLogo from "../full-logo/LoadingLogo";

const marginFromTop = '5rem';

export default function SplashLoadingScreen() {

  return (
    <Stack direction="column" width="100%" justifyContent="center" alignItems="center" height="100%" mt={ marginFromTop }>
      <LoadingLogo message={ 'Game Versions' } />
    </Stack>
  );
}