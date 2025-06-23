import Heading from '../../ui/Heading';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale/zh-TW';

function DashboardInterval({ allDates }) {
  return (
    <div className="col-span-full">
      <Heading level={2}>
        {format(allDates.at(0), 'yyyy年M月d日', { locale: zhTW })} &mdash;{' '}
        {format(allDates.at(-1), 'yyyy年M月d日', { locale: zhTW })}
      </Heading>
    </div>
  );
}

export default DashboardInterval;
