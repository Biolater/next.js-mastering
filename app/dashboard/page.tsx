import SortingButtons from "@/components/sorting-buttons";

const DashboardIndex = async ({
  searchParams,
}: {
  searchParams: Promise<{ sort: string }>;
}) => {
  const params = await searchParams;
  return (
    <div>
      <h1>Dashboard sorting is {params.sort}</h1>
      <SortingButtons />
    </div>
  );
};

export default DashboardIndex;
