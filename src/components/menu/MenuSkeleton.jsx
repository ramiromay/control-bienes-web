import { Grid2, Skeleton, Stack } from "@mui/material";

const MenuSkeleton = () => {
  return (
    <section className="menu-container ">
      <section className="menu-header">
        <article className="menu-header-content">
          <Stack spacing={1} sx={{ height: "100%" }}>
            <Skeleton variant="rounded" width="75%" height={35} />
            <Skeleton variant="rounded" width="100%" height={20} />
            <Skeleton variant="rounded" width="100%" height={20} />
            <Skeleton variant="rounded" width="100%" height={20} />
          </Stack>
        </article>
      </section>
      <section className="menu-content">
        <section className="menu-content-box">
          <Stack spacing={1} sx={{ height: "100%" }}>
            <Skeleton variant="rounded" width="25%" height={25} />
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Skeleton variant="rounded" width="100%" height={200} />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Skeleton variant="rounded" width="100%" height={200} />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Skeleton variant="rounded" width="100%" height={200} />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Skeleton variant="rounded" width="100%" height={200} />
              </Grid2>
            </Grid2>
          </Stack>
        </section>
      </section>
    </section>
  );
};

export default MenuSkeleton;
