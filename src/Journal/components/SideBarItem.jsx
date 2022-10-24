import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/Journal/journalSlice"


export const SideBarItem = ({ title = '', body, id, date, imageUrl = [] }) => {


    const dispatch = useDispatch()

    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title
    }, [title])      

    const onClickItem = () => {
        dispatch(setActiveNote({ title, body, id, date, imageUrl }))
    }

  return (
        <ListItem 
            key={ id } 
            disablePadding 
            onClick={onClickItem}
        >
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot/>
                </ListItemIcon>
                <Grid 
                    container
                    direction='column'
                >
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
  )
}
