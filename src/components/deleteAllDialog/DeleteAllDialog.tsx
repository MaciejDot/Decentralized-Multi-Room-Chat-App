import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@material-ui/core"
import { ArrowBackIos, DeleteForever } from "@material-ui/icons"
import { Alert } from "@material-ui/lab"
import { destroySavedAppData } from "../../db/gunDB"
import { notify } from "../../notification/Notification"

export const DeleteAllDialog = (props:{isOpen: boolean, close: () =>any})=>{
    const {close, isOpen} = props
    const deleteAction = () =>{
        close()
        destroySavedAppData()
        notify('Success deleting all local node information','success')
        setTimeout(()=> {document.location.reload() },250)
    }
    return    <Dialog onClose={()=> close()} open={isOpen}>
    <DialogTitle>Are you sure you wnt to delete all your node data locally?</DialogTitle>
    <DialogContent>
    <Alert severity="info">All Localy saved data will be delete. Possibility of losing access to all acounts that were logged in on this browser.</Alert>
   </DialogContent>
    <DialogActions>
        <Grid container>
            <Grid item xs={6}>
    <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => close()}
                startIcon={ <ArrowBackIos/>}
              >
                     Cancel
              </Button>
              </Grid>
              <Grid item xs={6}>
    <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => deleteAction()}
                startIcon={ <DeleteForever/>}
              >
                     Confirm delete
              </Button>
              </Grid>
              </Grid>
    </DialogActions>
  </Dialog>
}