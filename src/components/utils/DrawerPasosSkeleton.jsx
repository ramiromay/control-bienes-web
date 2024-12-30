import { Box, Skeleton, Stack } from '@mui/material';

const DrawerPasosSkeleton = () => {
    return (
      <>
        <Box sx={{ p: "10px 20px", borderBottom: "1px solid #ddd" }}>
          <Skeleton variant="text" width="70%" height={40} />
        </Box>
        <Box sx={{ p: 3 }}>
          {[...Array(3)].map((_, index) => (
            <Box key={index} sx={{ mb: 3 }}>
                <Stack direction="row" spacing={2}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" width="60%" height={30} />
                </Stack>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={80}
                sx={{ mt: 1 }}
              />
            </Box>
          ))}
        </Box>
      </>
    );
  };

export default DrawerPasosSkeleton