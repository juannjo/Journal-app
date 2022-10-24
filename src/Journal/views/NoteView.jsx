import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from '../../hooks' 
import { ImageGallery } from "../components"
import { setActiveNote } from "../../store/Journal/journalSlice"
import { startDeletingNotes, startSaveNote, startUploadingFiles } from "../../store/Auth/thunks"

export const NoteView = () => {
    const dispatch = useDispatch()

    const { active:note, messageSaved, isSaving } = useSelector(state => state.journal)
    const { title, body, date, onInputChange, formState } = useForm(note)

    const dateString = useMemo( () => {
        const newDate = new Date(date)
        return newDate.toUTCString()
    }, [date] )

    const fileInputRef = useRef()

    useEffect(() => {
      dispatch(setActiveNote(formState))
      }, [formState])

    const saveNote = () => {
        dispatch(startSaveNote())
    }
    useEffect(() => {
        if(messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved])
    
    const onFileChange = ({ target }) => {
        if(target.files === 0) return

        dispatch(startUploadingFiles(target.files))
    }

    const onDelete = () => {
        dispatch(startDeletingNotes())
    } 

  return (
    <Grid 
        className="animate__animated animate__fadeIn animate__faster"
        container direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{ mb: 1 }}
    >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
        </Grid>

        <input 
            onChange={onFileChange}
            type="file" 
            multiple
            style={{ display: 'none' }}
            ref={ fileInputRef }
        />

        <IconButton
            color="primary"
            disabled={ isSaving }
            onClick={ () => fileInputRef.current.click() }
        >
            <UploadOutlined />
        </IconButton>

        <Grid item>
            <Button 
                disabled={ isSaving }
                color="primary" 
                sx={{ padding: 2}}
                onClick={ saveNote }
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Guardar 
            </Button>
        </Grid>
        <Grid 
            container
        >
            <TextField
                type='text'
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label='Titulo'
                sx={{ border: 'none', mb: 1}}
                name='title'
                value={title}
                onChange={onInputChange}

            />
            <TextField
                type='text'
                variant="filled"
                fullWidth
                multiline
                placeholder="Qué sucedió hoy?" 
                sx={{ border: 'none', mb: 1}}
                minRows={5}
                name='body'
                value={body}
                onChange={onInputChange}
            />

            <Grid justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{mt: 2}}
                    color='error'
                >
                    <DeleteOutline/>
                    Borrar
                </Button>
            </Grid>

            <ImageGallery images={note?.imageUrl} />
        </Grid>
    </Grid>
  )
}
