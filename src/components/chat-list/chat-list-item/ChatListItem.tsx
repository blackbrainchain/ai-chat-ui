import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, ListItemButton, Box } from "@mui/material";
import router from "../../Routes";
import { Chat } from "../../../gql/graphql";
import "./ChatListItem.css";

interface ChatListItemProps {
  chat: Chat;
  selected: boolean;
}

const ChatListItem = ({ chat, selected }: ChatListItemProps) => {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.5rem",
                }}
              >
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {chat.latestMessage?.user.username || ""}
                </Typography>
                <div className="content">
                  {" " + (chat.latestMessage?.content || "")}
                </div>
              </Box>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" />
    </>
  );
};

export default ChatListItem;
