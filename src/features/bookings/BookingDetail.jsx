import { useNavigate } from 'react-router-dom';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
import Empty from '../../ui/Empty';

import { useBooking } from './useBooking';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';

function HeadingGroup({ children }) {
  return <div className="flex gap-6 items-center">{children}</div>;
}

function BookingDetail() {
  const navigate = useNavigate();
  const moveBack = () => navigate(-1);
  const { isPending, isError, booking, error } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  if (isPending) return <Spinner />;

  if (!booking) return <Empty resourceName="預訂" />;

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading level={1}>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>上一頁</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            入住
          </Button>
        )}

        {status === 'checked-in' && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            退房
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            {(open) => (
              <Button variation="danger" onClick={open}>
                刪除
              </Button>
            )}
          </Modal.Open>

          <Modal.Window name="delete">
            {(close) => (
              <ConfirmDelete
                resourceName={`預訂 #${bookingId}`}
                onCloseModal={close}
                onConfirm={() =>
                  deleteBooking(bookingId, { onSettled: () => navigate(-1) })
                }
                disabled={isDeleting}
              />
            )}
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          返回
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
