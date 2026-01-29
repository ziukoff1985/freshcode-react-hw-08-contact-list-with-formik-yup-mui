import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
// import styles from './App.module.css';

function App() {
    return (
        // Box з фоном на весь екран
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                minHeight: '100vh',
                py: 4,
            }}
        >
            <Container maxWidth='lg'>
                <Typography
                    variant='h3'
                    align='center'
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: '#333' }}
                >
                    Contact Manager
                </Typography>

                <Grid container spacing={4} justifyContent='center'>
                    {/* Список контактів */}
                    <Grid item xs={12} md={6}>
                        <ContactList />
                    </Grid>

                    {/* Форма */}
                    <Grid item xs={12} md={6}>
                        <ContactForm />
                    </Grid>
                </Grid>
            </Container>
        </Box>
        // <>
        //     <h1 className={styles.title}>Contact List</h1>
        //     <div className={styles.container}>
        //         <ContactList />
        //         <ContactForm />
        //     </div>
        // </>
    );
}

export default App;
