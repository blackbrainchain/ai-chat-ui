import List from '@mui/material/List';
import ChatListItem from './chat-list-item/ChatListItem';
import { Divider, Stack } from '@mui/material';
import ChatListHeader from './chat-list-header/ChatListHeader';
import { useEffect, useState } from 'react';
import AddChatList from './chat-list-item/add-chat-list/AddChatList';
import { useGetChats } from '../../hooks/use-get-chats';
import { usePath } from '../../hooks/use-patth';
import { useMessageCreated } from '../../hooks/use-message-created';

const ChatList = () => {
    const [chatListAddVisible, setChatListAddVisible] = useState(false);
    const [selectedChatId, setSelectedChatId] = useState("");
    const { data } = useGetChats();
    const { path } = usePath();

    useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) || [] });

    useEffect(() => {
        const pathSplit = path.split("chats/");
        if (pathSplit.length === 2) {
            setSelectedChatId(pathSplit[1]);
        }
    }, [path]);

    return (
        <>
            <AddChatList
                open={chatListAddVisible}
                close={() => setChatListAddVisible(false)}
            />
            <Stack>
                <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
                <Divider />
                <List
                    sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                        maxHeight: "80vh",
                        overflow: "auto",
                    }}
                >
                    {data?.chats &&
                        [...data.chats]
                            .sort((chatA, chatB) => {
                                if (!chatA.latestMessage) {
                                    return -1;
                                }
                                return (
                                    new Date(chatA.latestMessage?.createdAt).getTime() -
                                    new Date(chatB.latestMessage?.createdAt).getTime()
                                );
                            })
                            .map((chat) => (
                                <ChatListItem
                                    key={chat._id}
                                    chat={chat}
                                    selected={chat._id === selectedChatId}
                                />
                            ))
                            .reverse()}
                </List>
            </Stack>
        </>
    );
};


export default ChatList;