import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Badge,
} from '@mui/material';
import { Send as SendIcon, AttachFile as AttachFileIcon } from '@mui/icons-material';
import io from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  // Mock data for demonstration
  const chats = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'أ. أحمد محمد',
        avatar: '/images/teacher1.jpg',
        role: 'معلم',
      },
      lastMessage: 'مرحباً، كيف يمكنني مساعدتك؟',
      timestamp: '10:30',
      unread: 2,
    },
    {
      id: 2,
      user: {
        id: 2,
        name: 'أ. سارة أحمد',
        avatar: '/images/teacher2.jpg',
        role: 'معلمة',
      },
      lastMessage: 'سأقوم بمراجعة طلبك قريباً',
      timestamp: '09:15',
      unread: 0,
    },
  ];

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io('http://localhost:3001');

    // Listen for new messages
    socketRef.current.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Listen for online users
    socketRef.current.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString(),
    };

    // Send message through socket
    socketRef.current.emit('message', message);

    // Add message to local state
    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file.name);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        المحادثات
      </Typography>

      <Box sx={{ display: 'flex', height: 'calc(100vh - 200px)' }}>
        {/* Chats List */}
        <Paper
          sx={{
            width: 300,
            borderLeft: 1,
            borderColor: 'divider',
            overflow: 'auto',
          }}
        >
          <List>
            {chats.map((chat) => (
              <ListItem
                key={chat.id}
                button
                selected={selectedChat?.id === chat.id}
                onClick={() => setSelectedChat(chat)}
              >
                <ListItemAvatar>
                  <Badge
                    color="success"
                    variant="dot"
                    invisible={!onlineUsers.includes(chat.user.id)}
                  >
                    <Avatar src={chat.user.avatar} alt={chat.user.name} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={chat.user.name}
                  secondary={chat.lastMessage}
                  secondaryTypographyProps={{
                    noWrap: true,
                  }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Typography variant="caption" color="text.secondary">
                    {chat.timestamp}
                  </Typography>
                  {chat.unread > 0 && (
                    <Badge badgeContent={chat.unread} color="primary" />
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Chat Area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <Paper
                sx={{
                  p: 2,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  src={selectedChat.user.avatar}
                  alt={selectedChat.user.name}
                  sx={{ mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1">{selectedChat.user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedChat.user.role}
                  </Typography>
                </Box>
              </Paper>

              {/* Messages */}
              <Box
                sx={{
                  flexGrow: 1,
                  overflow: 'auto',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        maxWidth: '70%',
                        backgroundColor:
                          message.sender === 'me' ? 'primary.main' : 'grey.100',
                        color: message.sender === 'me' ? 'white' : 'text.primary',
                      }}
                    >
                      <Typography variant="body1">{message.text}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {message.timestamp}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Box>

              {/* Message Input */}
              <Paper
                component="form"
                onSubmit={handleSendMessage}
                sx={{
                  p: 2,
                  borderTop: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <IconButton component="label">
                  <input
                    type="file"
                    hidden
                    onChange={handleFileUpload}
                  />
                  <AttachFileIcon />
                </IconButton>
                <TextField
                  fullWidth
                  placeholder="اكتب رسالة..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  sx={{ mx: 2 }}
                />
                <IconButton
                  type="submit"
                  color="primary"
                  disabled={!newMessage.trim()}
                >
                  <SendIcon />
                </IconButton>
              </Paper>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography variant="h6" color="text.secondary">
                اختر محادثة للبدء
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Chat; 