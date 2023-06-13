import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { times } from 'lodash';
import Grid from '@mui/material/Unstable_Grid2';

const LoadingBlockSkeleton = ({ count, sxProps }: { count: number, sxProps?: any }) => {

  return (
    <>
      {
        times(count, (index) => {
          return (
            <Grid key={ index } xs={ 12 } sm={ 12 } sx={ {...sxProps} } >
              <Stack direction="row" sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'} }>
                <Skeleton variant='circular' width={ 42 } height={ 40 } />
                <Skeleton variant='text' sx={ { fontSize: '2rem', width: '100%', ml: 1} } />
              </Stack>

              <Skeleton variant='rectangular' height="20rem" />
            </Grid>
          );
        })
      }
    </>
  ); 
};

export default LoadingBlockSkeleton;