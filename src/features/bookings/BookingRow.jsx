import { format, isToday } from 'date-fns';
import { zhTW } from 'date-fns/locale/zh-TW';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';

function Cabin({ children }) {
  return (
    <div className='text-base font-semibold text-grey-600 font-["Sono"]'>
      {children}
    </div>
  );
}

function Stacked({ children }) {
  return (
    <div className="flex flex-col gap-0.5 [&_span:first-child]:font-medium [&_span:last-child]:text-grey-500 [&_span:last-child]:text-xs">
      {children}
    </div>
  );
}

function Amount({ children }) {
  return <div className='font-["Sono"] font-medium'>{children}</div>;
}

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { checkout } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row>
      <Modal>
        <Cabin>{cabinName}</Cabin>

        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>

        <Stacked>
          <span>
            {isToday(new Date(startDate))
              ? 'Today'
              : formatDistanceFromNow(startDate)}
            入住 &rarr; 住宿 {numNights} 晚
          </span>
          <span>
            {format(new Date(startDate), 'yyyy年M月d日', { locale: zhTW })}{' '}
            &mdash;{' '}
            {format(new Date(endDate), 'yyyy年M月d日', { locale: zhTW })}
          </span>
        </Stacked>

        <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

        <Amount>{formatCurrency(totalPrice)}</Amount>

        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              詳細
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                入住
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
              >
                退房
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              {(open) => (
                <Menus.Button icon={<HiTrash />} onClick={open}>
                  刪除
                </Menus.Button>
              )}
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          {(close) => (
            <ConfirmDelete
              resourceName={`預訂 #${bookingId}`}
              onCloseModal={close}
              onConfirm={() => deleteBooking(bookingId)}
              disabled={isDeleting}
            />
          )}
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
