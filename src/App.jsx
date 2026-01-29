import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';

function App() {
    return (
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                minHeight: '100vh',
                py: 4,
            }}
        >
            <Container maxWidth='lg'>
                <Typography
                    variant='h4'
                    align='center'
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: '#333' }}
                >
                    Contact Manager
                </Typography>

                <Grid container spacing={5} justifyContent='center'>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <ContactList />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <ContactForm />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default App;
