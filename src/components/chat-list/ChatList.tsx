import List from '@mui/material/List';
import ChatListItem from './chat-list-item/ChatListItem';
import { Divider, Stack } from '@mui/material';
import ChatListHeader from './chat-list-header/ChatListHeader';
import { useEffect, useState } from 'react';
import AddChatList from './chat-list-item/add-chat-list/AddChatList';
import { useGetChats } from '../../hooks/use-get-chats';
import { usePath } from '../../hooks/use-patth';

const ChatList = () => {

    const [chatListVisible, setChatListVisible] = useState( false );
    const [selectedChatId, setSelectedChatId] = useState( "" );
    const { data } = useGetChats();
    const { path } = usePath();

    useEffect( () => {
        const pathSplit = path.split( "chats/" );
        if ( pathSplit.length > 1 ) {
            setSelectedChatId( pathSplit[1] );
        }
    }, [ path ])
    
    return (
        <>
            <AddChatList open={chatListVisible} close={() => setChatListVisible(false)} />
            <Stack>
                <ChatListHeader handleAddChat={() => setChatListVisible(true)} />
                <Divider />
                <List sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    maxHeight: "80vh",
                    overflow: "auto",
                }}>
                    {data?.chats.map((chat) => (
                        <ChatListItem
                            key={chat._id}
                            chat={chat}
                            selected={chat._id === selectedChatId}
                        />
                    )).reverse()}
                </List>            
            </Stack>
        </>
  );
}

export default ChatList;