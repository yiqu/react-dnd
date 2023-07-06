import { Box, Button, Divider, LinearProgress, Skeleton, Stack } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useGetUserHistoryQuery } from '../store/user-history/user-history.api';
import ErrorPage from '../404/ErrorPage';
import { Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { transformColumnName } from '../shared/utils/table-functions.utils';
import { StyledDataCell, StyledHeaderCell } from '../shared/utils/table.utils';
import { ellipsis } from '../shared/utils/css.utils';
import { UserHistory } from '../store/user-history/user-history.state';
import { GREY } from '../theme/palette';
import { startCase } from 'lodash';

function HistoryList() {

  const { data, isError, isLoading, isFetching, refetch, error } = useGetUserHistoryQuery();

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <Stack width="100%" direction="column" spacing={ 3 }>
        <Skeleton animation="wave" sx={ {mt: 3} } />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </Stack>
    );
  }

  if (isError) {
    return <ErrorPage reason={ 'Error' } debug={ error } />;
  }

  if (!data) {
    return null;
  }

  return (
    <Box width="100%">
      <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
        <Stack direction="row" justifyContent="start" alignItems="center">
          <Button startIcon={ <RefreshIcon /> } variant='text' onClick={ handleRefresh }>
            Refresh
          </Button>
        </Stack>
      </Stack>
      <Divider flexItem variant='fullWidth' sx={ {mb: 1} } />
      <Box width="100%" height="5px">
        {
          isFetching && <LinearProgress color={ 'primary' } />
        }
      </Box>
      
      <TableContainer component={ Paper } elevation={ 0 } sx={ { overflowX: 'hidden', '&:hover': {overflowX: 'auto'}} }>
        <Table size="medium" aria-label="table" stickyHeader style={ { width: '100%', tableLayout: 'auto' } }>
          <TableHead>
            <TableRow>
              {
                TABLE_COLUMNS.map((col, index) => {
                  return (
                    <StyledHeaderCell 
                      key={ col } 
                    >
                      <Box style={ {...ellipsis} }  title={ `${transformColumnName(col)}` } >
                        { transformColumnName(col) }
                      </Box>
                    </StyledHeaderCell>
                  );
                })
              }
            </TableRow>
          </TableHead>

          <TableBody>
            {
              data.map((history: UserHistory) => (
                <TableRow
                  key={ history.fireId }
                  sx={ { '&:hover': {backgroundColor: GREY[300]} } }
                >
                  {
                    TABLE_COLUMNS.map((col, index) => {
                      return (
                        <StyledDataCell key={ `${history.fireId}${index}` }
                        >
                          { transformTableData(history, col) }
                        </StyledDataCell>
                      );
                    })
                  }
                </TableRow>
              ))
            }
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
}

function transformTableData(history: UserHistory, columnId: typeof TABLE_COLUMNS[number]) {

  switch (columnId) {
    case 'user': {
      return <span data-tooltip-id="tooltip"
      data-tooltip-content={ `` }> { history.user?.userHash } </span>;
    }
    default: {
      return <div style={ {...ellipsis} }> { startCase(`${history[columnId]}`) } </div>;
    }
  }
}

const TABLE_COLUMNS = ['actionEntity',  'actionEntitySource', 'actionEntitySourcePosition', 'actionEntityTarget', 'actionEntityTargetPosition', 'actionType', 'timestamp', 'user'] as const;

export default HistoryList;