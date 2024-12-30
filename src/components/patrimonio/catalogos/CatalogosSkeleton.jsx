import { Skeleton, Stack } from "@mui/material";

const CatalogosSkeleton = () => {
  return (
    <Stack
      direction="row"
      gap={1}
      spacing={1}
      useFlexGap
      sx={{ p: "7px", height: "100%" }}
    >
      <Stack spacing={1} sx={{ height: "100%" }}>
        <Skeleton variant="rounded" width={300} height={60} />
        <Skeleton variant="rounded" width={300} height="100%" />
      </Stack>
      <Stack spacing={1} flex={1}>
        <Skeleton variant="rounded" height={60} />
        <Skeleton variant="rounded" height="100%" />
      </Stack>
    </Stack>
  );
};

export default CatalogosSkeleton;
