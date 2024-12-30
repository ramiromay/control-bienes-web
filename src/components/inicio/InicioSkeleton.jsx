import { Grid2, Skeleton, Stack } from "@mui/material";

const InicioSkeleton = () => {
  return (
    <section className="home-container">
      <section className="home-section">
        <section className="home-content">
          <section className="home-header">
            <article className="home-header-text">
              <Stack spacing={1} sx={{ height: "100%" }}>
                <Skeleton variant="rounded" width="80%" height={50} />
                <Skeleton variant="rounded" width="60%" height={20} />
              </Stack>
            </article>
          </section>
          <Stack spacing={1}>
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

export default InicioSkeleton;
