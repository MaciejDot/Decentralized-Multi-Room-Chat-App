import { Button, Card, CardContent, CardHeader, Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import { Lock, MeetingRoom } from "@material-ui/icons";
import { useState } from "react";
import { gunDB, user } from "../../../db/gunDB";

export const CreateRoom = () => {
    const [roomName, setRoomName] = useState("");
    const [roomPassword, setRoomPassword] = useState("");

    const onCreateRoom = () => {
        //cyphered
        const certifcate = (user as any).is.alias;
        console.log(certifcate)
        gunDB.get("room").get(roomName);
    }

    return <Card>
        <CardHeader><Typography variant="subtitle1">Create a room</Typography></CardHeader>
        <CardContent>
            <Typography variant="subtitle1">Create a room</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <TextField

                        value={roomName}
                        onChange={e => setRoomName(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Room name"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    < MeetingRoom />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField

                        value={roomPassword}
                        onChange={e => setRoomPassword(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Room password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    < Lock />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={onCreateRoom}
                    >
                        Create a room
                    </Button>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}