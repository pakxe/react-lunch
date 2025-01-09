import { useSuspenseQuery } from '@tanstack/react-query';

const useGetCategories = () => {
  const { ...rest } = useSuspenseQuery({
    queryKey: ['d'],
    queryFn: () => fetch('https://example.com/user'),
  });

  return {
    ...rest,
  };
};

const Page = () => {
  const { data } = useGetCategories();
  console.log(data);

  return <div>,dd</div>;
};

export default Page;
