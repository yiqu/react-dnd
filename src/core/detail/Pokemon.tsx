import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, styled, Stack, IconButton } from "@mui/material";
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { useState } from "react";

export interface PokemonProps {
  id: number;
  name: string;
  sprite: string;
}

function PokemonCard({ id, name, sprite }: PokemonProps) {

  const [showActions, setShowActions] = useState<boolean>(false);

  const handleMouseOver = () => {
    setShowActions(true);
  };

  const handleMouseLeave = () => {
    setShowActions(false);
  };

  return (
    <StyledListItem onMouseOver={ handleMouseOver } onMouseLeave={ handleMouseLeave }>
      <ListItemAvatar>
        <Avatar alt={ name } src={ sprite } sx={ { width: 80, height: 80 } } />
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

const StyledListItem = styled(ListItem)(() => ({
  alignItems: 'flex-start',
  border: '1px solid',
  borderColor: import.meta.env.VITE_POKEMON_YELLOW_COLOR,
  borderRadius: '20px',
  marginBottom: '2rem'
}));

export default PokemonCard;