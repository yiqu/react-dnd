import { Box, Button, DialogContent, Divider, LinearProgress, List, ListItem, ListItemText, Skeleton, Stack, Typography } from '@mui/material';
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
import { formatDistanceToNow, format } from 'date-fns';
import { ReactNode, useState } from 'react';
import Add from '@mui/icons-material/Add';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import produce from 'immer';
import { shortenUserAgentHash } from '../shared/utils/user-agent';
import DialogLayout from '../shared/components/dialog/DialogLayout';



function HistoryList() {

  const { data, sortedByDate, isError, isLoading, isFetching, refetch, error } = useGetUserHistoryQuery(undefined, {
    selectFromResult: (data) => {
      const copy = produce(data.data, draft => {
        (draft ?? []).sort((a, b) => {
          return (b.timestamp ?? 0) > (a.timestamp ?? 0) ? 1 : -1;
        });
      });
      return {
        ...data,
        sortedByDate: copy
      };
    }
  });
  const [open, setOpen] = useState<{open: boolean; payload?: UserHistory}>({
    open: false
  });

  const handleClose = () => {
    setOpen((current) => {
      return {
        ...current,
        open: false
      };
    });
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleActionClick = (action: string, payload: UserHistory) => {
    setOpen({
      open: true,
      payload: payload
    });
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

  if (!data || !sortedByDate) {
    return null;
  }

  if (sortedByDate && sortedByDate.length < 1) {
    return <Stack> No History </Stack>;
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
      
      <Box mb={ 3 }>
        <Typography>
          This is a list of all actions performed on Pokemons. ({ sortedByDate.length})
        </Typography>
      </Box>
      <TableContainer component={ Paper } elevation={ 0 } sx={ { overflowX: 'hidden', '&:hover': {overflowX: 'auto'}} }>
        <Table size="medium" aria-label="table" stickyHeader style={ { width: '100%', tableLayout: 'fixed' } }>
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
              sortedByDate.map((history: UserHistory) => (
                <TableRow
                  key={ history.fireId }
                  sx={ { '&:hover': {backgroundColor: GREY[300]} } }
                >
                  {
                    TABLE_COLUMNS.map((col, index) => {
                      return (
                        <StyledDataCell key={ `${history.fireId}${index}` }
                        >
                          { transformTableData(history, col, handleActionClick) }
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

      <DialogLayout open={ open.open } onClose={ handleClose } title="User Details" maxWidth="sm">
        <DialogContent>
          <Typography> {open.payload?.user?.userHash} </Typography>
          <Divider variant='fullWidth' flexItem sx={ {my: 2} } /> 
          { open.payload?.user?.userAgent && <Stack direction="column" spacing={ 2 } >
            <List dense={ true }>
              {
              Object.keys(open.payload.user.userAgent).map((key) => {
                return (
                  <ListItem key={ key } title={ `${JSON.stringify((open.payload?.user?.userAgent as any)[key])}` }>
                    <ListItemText
                      primary={ startCase(key) }
                      secondary={ `${JSON.stringify((open.payload?.user?.userAgent as any)[key])}` }
                    />
                  </ListItem>
                );
              })
            }
            </List>
          </Stack> }

        </DialogContent>
        
      </DialogLayout>
    </Box>
  );
}

function transformTableData(history: UserHistory, columnId: typeof TABLE_COLUMNS[number], onClick: (action: string, payload: UserHistory)=>void) {

  const handleUserClick = () => {
    onClick("user", history);
  };

  switch (columnId) {
    case 'actionType': {
      let icon: ReactNode = null;
      switch(history.actionType) {
        case 'add': {
          icon = <Add />;
          break;
        }
        case 'remove': {
          icon = <Delete />;
          break;
        }
        case 'edit': {
          icon = <Edit />;
          break;
        }
        case 'reorder': {
          icon = <LowPriorityIcon />;
          break;
        }
      }
      return <Stack direction="row" justifyContent="start" alignItems="center" spacing={ 1 } width="100%" style={ {...ellipsis} }> 
        <span style={ {display: 'flex'} }>{ icon }</span> <span style={ {...ellipsis} }>{ startCase(history[columnId]) }</span>
      </Stack>;
    }
    case 'user': {
      return <Box data-tooltip-id="tooltip" style={ {...ellipsis} }
      data-tooltip-content={ `` }> <Button onClick={ handleUserClick } sx={ {width: 'inherit'} }> 
        <span style={ {...ellipsis} }>{ shortenUserAgentHash(history.user?.userHash ?? '') }</span>
      </Button> </Box>;
    }
    case 'timestamp': {
      return <span title={ format(history[columnId] ?? 0, 'MM/dd/yyyy hh:mm aaa') }> { formatDistanceToNow(history[columnId] ?? 0) } ago </span>;
    }
    default: {
      return <div style={ {...ellipsis} }> { startCase(`${history[columnId]}`) } </div>;
    }
  }
}


const TABLE_COLUMNS = ['actionType', 'timestamp', 'actionEntity',  'actionEntitySource', 'actionEntitySourcePosition', 'actionEntityTarget', 'actionEntityTargetPosition',  'user'] as const;

export default HistoryList;