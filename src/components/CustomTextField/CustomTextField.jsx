import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { useField, useFormikContext } from 'formik';

const CustomTextField = ({ name, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    return (
        <TextField
            {...field}
            {...props}
            fullWidth
            variant='outlined'
            // Відображаємо помилку тільки якщо поле "торкалися" (touched)
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            // Додаємо кнопку очищення всередину інпуту
            slotProps={{
                input: {
                    endAdornment: field.value && (
                        <InputAdornment position='end'>
                            <IconButton
                                size='small'
                                onClick={() => setFieldValue(name, '')}
                            >
                                <ClearIcon fontSize='small' />
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};

export default CustomTextField;
