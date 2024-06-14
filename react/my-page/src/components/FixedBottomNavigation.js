import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Pagination from '@mui/material/Pagination';
import { Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard, Arial, sans-serif',
  },
});

const messageExamples = [
  // 여기에 메시지 예제를 추가하세요
];

function refreshMessages() {
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
    return Array.from(new Array(1)).map(() => {
        const randomIndex = getRandomInt(messageExamples.length);
        return messageExamples[randomIndex] || {}; // 또는 적절한 기본값
    });
}

export default function FixedBottomNavigation() {
    const [page, setPage] = React.useState(1);
    const [messages, setMessages] = React.useState(refreshMessages());
    const itemsPerPage = 7;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const paginatedMessages = messages && messages.length > 0 
        ? messages.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        : [];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ pb: 7 }}>
                <List>
                    {paginatedMessages.map((message, index) => (
                        <ListItemButton key={index}>
                            <ListItemAvatar>
                                <Avatar alt="Profile Picture" src={message.person || '/static/images/avatar/default.jpg'} />
                            </ListItemAvatar>
                            <ListItemText primary={message.primary || 'No title'} secondary={message.secondary || 'No content'} />
                        </ListItemButton>
                    ))}
                </List>
                {messages.length > itemsPerPage && (
                    <Container maxWidth="sm">
                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                            <Pagination
                                count={Math.ceil(messages.length / itemsPerPage)}
                                page={page}
                                onChange={handleChangePage}
                                color="primary"
                            />
                        </Box>
                    </Container>
                )}
            </Box>
        </ThemeProvider>
    );
}
