import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, styled, Stack, IconButton } from "@mui/material";
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import useScreenSize from "../../shared/hooks/useScreensize";

export interface PokemonProps {
  id: number;
  name: string;
  sprite: string;
  index: number;
}

function PokemonCard({ id, name, sprite, index }: PokemonProps) {

  const { isAboveXl } = useScreenSize();
  const [showActions, setShowActions] = useState<boolean>(false);

  const handleMouseOver = () => {
    setShowActions(true);
  };

  const handleMouseLeave = () => {
    setShowActions(false);
  };

  return (
    <Draggable draggableId={ name } index={ index }>
      {
        (provided, snapshot) => {
          return (
            <StyledListItem onMouseOver={ handleMouseOver } onMouseLeave={ handleMouseLeave } ref={ provided.innerRef }  { ...provided.draggableProps }
              sx={ {
                border: snapshot.isDragging ? '2px solid' : '1px solid',
                borderColor: snapshot.isDragging ? 'primary.main' : import.meta.env.VITE_POKEMON_YELLOW_COLOR,
                borderRadius:snapshot.isDragging ? '20px' : '20px',
                paddingX:snapshot.isDragging ? '20px' : '5px'
              } }
            >
              <ListItemAvatar >
                <Stack direction={ isAboveXl ? "row" : "column-reverse" } justifyContent="start" alignItems="center">
                  <IconButton aria-label="drag" { ...provided.dragHandleProps }>
                    <DragIndicatorIcon fontSize="small" />
                  </IconButton>
                  <Avatar alt={ name } src={ sprite } sx={ { width: isAboveXl ? 80 : 40, height: isAboveXl ? 80 : 40 } } />
                </Stack>
                
              </ListItemAvatar>
              <ListItemText
                primary={ <a href={ `https://pokemondb.net/pokedex/${name}` } target="_blank" rel="noreferrer">{ name }</a> }
                secondary={
                  <Stack direction="column" justifyContent="start" alignItems="start" component="span">
                    <Typography
                      sx={ { display: 'inline' } }
                      component="span"
                    >
                      #{ id }
                    </Typography>
                    <Stack direction="row" justifyContent="start" alignItems="center" component="span" height="30px">
                      {
                        showActions && <>
                          <IconButton size="small">
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton size="small">
                            <Delete fontSize="small" />
                          </IconButton>
                        </>
                      }
                    </Stack>
                  </Stack>
                }
              />
            </StyledListItem>
          );
        }
      }
    </Draggable>
    
  );
}

const StyledListItem = styled(ListItem)(() => ({
  alignItems: 'flex-start',
  marginBottom: '2rem',
  backgroundColor: '#fff'
}));

export default PokemonCard;