import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, ListItemButton } from "@mui/material";
import router from "../../Routes";
import { Chat } from "../../../gql/graphql";

interface ChatListItemProps {
    chat: Chat;
    selected: boolean;
};

const ChatListItem = ({ chat, selected }: ChatListItemProps) => {
    return (
        <>
            <ListItem alignItems="flex-start" disablePadding>
                <ListItemButton onClick={() => router.navigate(`/chats/${ chat._id}`)} selected={selected}>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                primary={chat.name}
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
                </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
};

export default ChatListItem;
