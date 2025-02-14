import { Skeleton, Stack } from "@mui/material";

const InventarioVehiculoSkeleton = () => {
  return (
    <Stack
      direction="row"
      gap={1}
      spacing={1}
      useFlexGap
      sx={{ p: "7px", height: "100%", width: "100%" }}
    >
      <Stack
        direction="column"
        gap={1}
        spacing={1}
        useFlexGap
        sx={{ height: "100%" }}
      >
        <Stack spacing={1} sx={{ height: "34%" }}>
          <Skeleton variant="rounded" width={300} height={75} />
          <Skeleton variant="rounded" width={300} height="100%" />
        </Stack>
        <Stack spacing={1} sx={{ height: "33%" }}>
          <Skeleton variant="rounded" width={300} height={75} />
          <Skeleton variant="rounded" width={300} height="100%" />
        </Stack>
        <Stack spacing={1} sx={{ height: "33%" }}>
          <Skeleton variant="rounded" width={300} height={75} />
          <Skeleton variant="rounded" width={300} height="100%" />
        </Stack>
      </Stack>

      <Stack direction="column" gap={1} flexGrow={1} sx={{ height: "100%" }}>
        <Stack spacing={1} sx={{ height: "100%" }}>
          <Skeleton variant="rounded" height={58} />
          <Skeleton variant="rounded" height="100%" />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default InventarioVehiculoSkeleton;
