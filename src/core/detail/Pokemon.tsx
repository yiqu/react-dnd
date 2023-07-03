import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, styled, Stack, IconButton } from "@mui/material";
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { useCallback, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import useScreenSize from "../../shared/hooks/useScreensize";
import { UpdatePokemon } from "../store/pokemon.state";
import DialogLayout from "../../shared/components/dialog/DialogLayout";
import AddEditPokemonForm from "../actions/AddEditPokemonForm";

export interface PokemonProps {
  id: number;
  name: string;
  sprite: string;
  index: number;
  region: string;
}

function PokemonCard({ id, name, sprite, index, region }: PokemonProps) {

  const { isAboveXl } = useScreenSize();
  const [showActions, setShowActions] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<{open: boolean; pokemon: UpdatePokemon | undefined}>({
    open: false,
    pokemon: undefined
  });

  const handleDialogClose = useCallback(() => {
    setDialogOpen((current) => {
      return {
        ...current,
        open: false
      };
    });
  }, []);
  
  const handleMouseOver = () => {
    setShowActions(true);
  };

  const handleMouseLeave = () => {
    setShowActions(false);
  };

  const handleEdit = () => {
    const pokemon: UpdatePokemon = {
      id: `${id}`,
      name,
      index,
      region
    };
    setDialogOpen({
      open: true,
      pokemon: pokemon
    });
  };

  return (
    <>
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
                            <IconButton size="small" onClick={ handleEdit }>
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
      <DialogLayout open={ dialogOpen.open } title={ <>Edit { name }</> } onClose={ handleDialogClose } maxWidth="sm">
        <AddEditPokemonForm initValue={ dialogOpen.pokemon } mode="edit" onClose={ handleDialogClose } />
      </DialogLayout>
    </>

    
  );
}

const StyledListItem = styled(ListItem)(() => ({
  alignItems: 'flex-start',
  marginBottom: '2rem',
  backgroundColor: '#fff'
}));

export default PokemonCard;