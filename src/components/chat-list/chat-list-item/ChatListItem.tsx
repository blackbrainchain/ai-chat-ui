import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from "@mui/material";

interface ChatListItemProps {
    name?: string | null;
};

const ChatListItem = ({ name }: ChatListItemProps) => {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                primary={name}
                secondary={
                    <>
                    <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                    </>
                }
                />
        </ListItem>
        <Divider variant="inset" component="li" />
        </>
    )
};

export default ChatListItem;
