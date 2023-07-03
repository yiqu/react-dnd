import { Stack, Typography } from "@mui/material";
import useScreenSize from "../shared/hooks/useScreensize";

function About() {

  const { isMobile } = useScreenSize();

  return (
    <Stack direction="column" justifyContent="start" alignItems="start" width="100%" spacing={ 2 } padding={ isMobile ? '10px' : 0 }>
      <Typography variant="h6">Pokemon Drag N&apos; Drop</Typography>
      <Typography>
        This app is built to demonstrate drag and drop capabilities using 
        <a href="https://github.com/atlassian/react-beautiful-dnd" style={ {marginLeft: '3px'} }>react-beautiful-dnd</a>.
      </Typography>
      <Typography>You re-order the Regions by horizontally dragging the Region lists, you can also re-order the
        Pokemons by vertically dragging the Pokemon boxes.
      </Typography>
      <Typography>You cross drag Pokemons to other Regions when you enable &quot;Allow Cross Region&quot;.
      </Typography>
      <Typography>Changes are persisted 
        <a style={ {marginLeft: '3px', marginRight: '3px'} } href="https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates#optimistic-updates">optimistically</a> 
        using <a style={ {marginLeft: '3px'} } href="https://redux-toolkit.js.org/rtk-query/overview">RTK Query</a>.
      </Typography>
    </Stack>
  );
}

export default About;