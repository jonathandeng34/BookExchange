import { Button, Box } from "@mui/material";

export function BlueButton({ onClick, text }) {
    return (
        <Box mt={4}>
        <Button 
                    variant="contained" 
                    onClick={onClick}
                    sx={{ 
                        backgroundColor: '#4D869C', 
                        color: '#FFFFFF', 
                        fontFamily: 'var(--secondary-font)', // Use custom font
                        fontWeight: 600, 
                        textTransform: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px'
                    }}
                >
                    {text}
        </Button>
        </Box>
    );
}