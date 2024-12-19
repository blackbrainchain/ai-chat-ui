import List from '@mui/material/List';
import ChatListItem from './chat-list-item/ChatListItem';
import { Divider, Stack } from '@mui/material';
import ChatListHeader from './chat-list-header/ChatListHeader';
import { useState } from 'react';
import AddChatList from './chat-list-item/add-chat-list/AddChatList';
import { useGetChats } from '../../hooks/use-get-chats';

const ChatList = () => {

    const [chatListVisible, setChatListVisible] = useState( false );

    const { data } = useGetChats();
    
    return (
        <>
            <AddChatList open={chatListVisible} close={() => setChatListVisible(false)} />
            <Stack>
                <ChatListHeader handleAddChat={() => setChatListVisible(true)} />
                <Divider />
                <List sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    maxHeight: "80vh",
                    overflow: "auto",
                }}>
                    {data?.chats.map((chat) => (
                            <ChatListItem key={chat._id} name={chat.name} />
                    ))}
                </List>            
            </Stack>
        </>
  );
}

export default ChatList;