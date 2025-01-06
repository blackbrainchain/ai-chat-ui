import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, ListItemButton } from "@mui/material";
import router from "../../Routes";
import { Chat } from "../../../gql/graphql";

interface ChatListProps {
    chat: Chat;
    selected: boolean;
}

const ChatListItem = ({ chat, selected }: ChatListProps) => {
    return (
        <>
            <ListItem alignItems="flex-start" disablePadding key={chat._id}>
                <ListItemButton
                    onClick={() => router.navigate(`/chats/${chat._id}`)}
                    selected={selected}
                >
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/iamages/avatar/1.jpg" />
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
                                    {chat.latestMessage?.user.username || ""}
                                </Typography>
                                {" " + (chat.latestMessage?.content || "")}
                            </>
                        }
                    />
                </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
};

export default ChatListItem;
