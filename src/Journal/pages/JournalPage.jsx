import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView } from "../views/NoteView"
import { NothingSelectedView } from "../views/NothingSelectedView"


export const JournalPage = () => {
  return (
    <JournalLayout>
      
      <NothingSelectedView />

      {/* <NoteView /> */}

      <IconButton 
        size="large"
        sx={{
          color: 'white',
          backgroundColor: "error.main",
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>
    </JournalLayout>
  )
}
