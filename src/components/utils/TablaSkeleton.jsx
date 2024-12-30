import { Skeleton, Stack } from "@mui/material";

const TablaSkeleton = () => {
  return (
    <Stack
      gap={1}
      sx={{ p: "7px", height: "100%"}}
    >
      <Skeleton variant="rounded" height={60} />
      <Skeleton variant="rounded" height="100%" />
    </Stack>
  );
};

export default TablaSkeleton;
