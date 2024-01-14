import React, { useEffect, useState } from 'react';
import GUN, { SEA} from 'gun';
import { Box, List, ListItem, Typography, TextField, IconButton, Paper, Button } from '@mui/material';
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';
import { useGun } from '../context/gun';

const superSecretKey = '3N=73^RnQDx7e:x@b2eU'
const ChatMessage = ({ isSender, text, time }) => {
    return (
        <ListItem sx={{
            display: 'flex',
            justifyContent: isSender ? 'flex-start' : 'flex-end',
            flexDirection: 'column',
            alignItems: isSender ? 'flex-start' : 'flex-end',
            mb: 2,
            px: 1
        }}>
            <Paper elevation={1} sx={{
                bgcolor: isSender ? '#F0F0F0' : '#3F51B5',
                color: isSender ? 'rgba(0, 0, 0, 0.87)' : '#FFFFFF',
                py: 1,
                px: 2,
                borderRadius: 3,
                borderTopLeftRadius: isSender ? '0px' : '12px',
                borderTopRightRadius: isSender ? '12px' : '0px',
            }}>
                <Typography variant="body1">{text}</Typography>
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>{moment(time).format('lll')}</Typography>
            </Paper>
        </ListItem>
    );
};

function ChatComponent() {
    const [newText, setNewText] = useState('');
    const [messages, setMessages] = useState([]);

    const gun = useGun();


    useEffect(() => {
        const listener = gun.get('chat').map().on(async (data, id) => {
            if(data){
                console.log("🚀 ~ listener ~ data:", data)
                var message = {
                  // transform the data
                  who: await gun.user(data).get('alias'), // a user might lie who they are! So let the user system detect whose data it is.
                  what: (await SEA.decrypt(data.what, superSecretKey)) + '', // force decrypt as text.
                  when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
                };
                if (message.what) {
                    setMessages(currentMessages => {
                        const isDuplicate = currentMessages.some(msg => msg.when === message.when);
                        if (!isDuplicate) {
                            return [...currentMessages, message].sort((a, b) => a.when - b.when);
                        }
                        return currentMessages;
                    });
                }
            }
        })
        return () => gun.get('chat').off(listener);
    }, [])

    const sendMessage = async () => {
        const secret = await SEA.encrypt(newText, superSecretKey);
        const message = gun.user().get('all').set({ what: secret });
        const index = new Date().toISOString();
        gun.get('chat').get(index).put(message);
        setNewText('');
        console.log('send message')
    }

    const deleteAllMessages = () => {
        const chatNode = gun.get('chat');
        chatNode.map().once((message, messageId) => {
            if (message) {
                chatNode.get(messageId).put(null); // Deletes each message
            }
        });
    }


    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 3 }}>
            <List sx={{ overflow: 'auto' }}>
                <Typography variant="caption" sx={{ my: 1, display: 'block', textAlign: 'center' }}>4 March</Typography>
                {messages.map(item => (
                    <ChatMessage key={item.when}  isSender={item.who} text={item.what} time={item.when} />
                ))}
            </List>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Write a message..."
                    variant="outlined"
                    value={newText}
                    sx={{ mr: 1, borderRadius: 3 }}
                    onChange={(event) => setNewText(event.target.value)}
                    // Submit message on enter
                    onKeyDown={(ev) => {
                        if (ev.key === 'Enter') {
                            sendMessage()
                            ev.preventDefault();
                        }
                    }}
                />
                <IconButton color="primary" aria-label="send" onClick={sendMessage}>
                    <SendIcon />
                </IconButton>
            </Box>
            <Button onClick={deleteAllMessages}> deleteAllMessages</Button>
        </Box>
    );
}

export default ChatComponent;
