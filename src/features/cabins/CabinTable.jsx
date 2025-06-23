import { useSearchParams } from 'react-router-dom';
import { useCabins } from './useCabins';
import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';

function CabinTable() {
  const { isPending, isError, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="住宿房間" />;

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // filter on Client
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;

  if (filterValue === 'all') {
    filteredCabins = cabins;
  }

  if (filterValue === 'no-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  if (filterValue === 'with-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // 排序
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.8fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>房號</div>
          <div>客房類型</div>
          <div>價錢</div>
          <div>折扣</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
