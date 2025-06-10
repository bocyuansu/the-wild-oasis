import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import TodayItem from './TodayItem';
import TodayList from './TodayList';
import { useTodayActivity } from './useTodayActivity';

function TodayBox({ children }) {
  return (
    <div className="bg-grey-0 border border-grey-100 rounded-md p-8 flex flex-col gap-6 col-start-1 col-end-[span_2] pt-6">
      {children}
    </div>
  );
}

function NoActivity({ children }) {
  return <p className="text-center text-lg font-medium mt-2">{children}</p>;
}

function TodayActivity() {
  const { activities, isPending } = useTodayActivity();

  return (
    <TodayBox>
      <Row type="horizontal">
        <Heading level={2}>入住或退房</Heading>
      </Row>

      {isPending ? (
        <Spinner />
      ) : activities?.length > 0 ? (
        <TodayList
          data={activities}
          render={(activity) => (
            <TodayItem activity={activity} key={activity.id} />
          )}
        />
      ) : (
        <NoActivity>無入住或退房</NoActivity>
      )}
    </TodayBox>
  );
}

export default TodayActivity;
