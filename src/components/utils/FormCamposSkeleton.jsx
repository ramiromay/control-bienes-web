import { Skeleton, Stack } from "@mui/material"

const FormCamposSkeleton = () => {
  return (
    <Stack
    direction="column"
    gap={1}
    spacing={1}
    useFlexGap
    sx={{ p: "7px", height: "100%" }}
  >
    <Stack spacing={1} flex={1}>
      <Skeleton variant="rounded" height={35} />
    </Stack>
    <Stack spacing={1} flex={1}>
      <Skeleton variant="rounded" height={35} />
    </Stack>
    <Stack spacing={1} flex={1}>
      <Skeleton variant="rounded" height={35} />
    </Stack>
  </Stack>
  )
}

export default FormCamposSkeleton