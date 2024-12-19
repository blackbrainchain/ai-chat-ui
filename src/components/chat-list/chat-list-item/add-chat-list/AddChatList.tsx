import { Box, Button, FormControlLabel, FormGroup, IconButton, InputBase, Modal, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useCreateChat } from "../../../../hooks/use-create-chat";
import { UNKNOWN_ERROR_MESSAGE } from "../../../../constants/errors";

interface AddChatListProps {
    open: boolean;
    close: () => void;
}

const AddChatList = ( { open, close }: AddChatListProps ) => {

    const [isPrivate, setIsPrivate] = useState( false );
    const [ error, setError ] = useState( "" );
    const [createChat] = useCreateChat();
    const [name, setName] = useState( "" );

    const onClose = () => {
        setIsPrivate( false );
        setError( "" );
        setName( "" );
        close();
    }
    
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
            }}>
                <Stack spacing={2}>
                    <Typography variant="h6" component="h2">
                        Add Chat
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            style={{ width: "0" }}
                            control={<Switch
                                defaultChecked={isPrivate}
                                value={isPrivate}
                                onChange={(event) => setIsPrivate(event.target.checked)}
                            />}
                            label="Private"
                        ></FormControlLabel>
                    </FormGroup>
                    {isPrivate ? (
                        <Paper elevation={3} sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Users" />
                            <IconButton sx={{ p: "10px" }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    ) : (
                        <TextField
                                label="Chat Name"
                                error={!!error}
                                helperText={error}
                                onChange={( event ) => setName( event.target.value )}
                            />
                    )}
                    <Button
                        variant="outlined"
                        sx={{ mt: 2 }}
                        onClick={async () => {
                            if ( !name.length ) {
                                setError( "Chat Name is required" );
                                return;
                            }
                            try {
                                await createChat({
                                    variables: {
                                        createChatInput: { isPrivate, name },
                                    },
                                } );
                                onClose();
                            } catch ( err ) {
                                setError( UNKNOWN_ERROR_MESSAGE );
                                return;
                            } 
                        }}
                    >
                        Create
                    </Button>
                </Stack>                
            </Box>
        </Modal>
    )
};

export default AddChatList;