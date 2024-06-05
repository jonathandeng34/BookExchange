import { Box, Typography } from "@mui/material"

export function BoldText({ text }) {
    return (
        <Box mt={4}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontWeight: 600, 
                        color: '#000000',
                        fontFamily: 'var(--secondary-font)', // Use custom font
                    }}
                >
                    {text}
                </Typography>
        </Box>
    );
}