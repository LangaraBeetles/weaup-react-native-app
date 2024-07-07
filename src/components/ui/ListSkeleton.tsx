import Stack from "@src/components/ui/Stack";
import Skeleton from "@src/components/ui/Skeleton";

const ListSkeleton = () => {
  return (
    <Stack gap={20}>
      {new Array(10).fill({}).map((_, index) => (
        <Skeleton
          duration={900}
          delay={200 * index}
          style={{ height: 90 }}
          initialOpacity={1 - (index + 1) / 10}
        />
      ))}
    </Stack>
  );
};

export default ListSkeleton;
