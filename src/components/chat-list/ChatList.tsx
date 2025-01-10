import ChatListItem from './chat-list-item/ChatListItem';
import { Box, Divider, Stack } from '@mui/material';
import ChatListHeader from './chat-list-header/ChatListHeader';
import { useEffect, useState } from 'react';
import AddChatList from './chat-list-item/add-chat-list/AddChatList';
import { useGetChats } from '../../hooks/use-get-chats';
import { usePath } from '../../hooks/use-patth';
import { useMessageCreated } from '../../hooks/use-message-created';
import { PAGE_SIZE } from '../../constants/page-size';
import InfiniteScroll from 'react-infinite-scroller';
import { useCountChats } from '../../hooks/use-count-chats';

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data, fetchMore } = useGetChats({
    skip: 0,
    limit: PAGE_SIZE,
  });
  const { path } = usePath();
  const { chatsCount, countChats } = useCountChats();

  useEffect(() => {
    countChats();
  }, [countChats]);

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
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={() =>
              fetchMore({
                variables: {
                  skip: data?.chats.length,
                },
              })
            }
            hasMore={
              data?.chats && chatsCount ? data.chats.length < chatsCount : false
            }
            useWindow={false}
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
                    chat={chat}
                    selected={chat._id === selectedChatId}
                  />
                ))
                .reverse()}
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
};

export default ChatList;
