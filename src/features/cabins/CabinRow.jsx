import CreateCabinForm from './CreateCabinForm';
import { formatCurrency } from '../../utils/helpers';
// Custom Hook
import { useDeleteCabin } from './useDeleteCabin';
// ui
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

function Img({ src, alt }) {
  return (
    <img
      className="block w-16 aspect-3/2 object-cover object-center transform-[scale(1.5)_translateX(-7px)] justify-center"
      src={src}
      alt={alt}
    />
  );
}

function Cabin({ children }) {
  return (
    <div className="text-base font-semibold text-grey-600 font-['Sono']">
      {children}
    </div>
  );
}

function Price({ children }) {
  return <div className="font-['Sono'] font-semibold">{children}</div>;
}

function Discount({ children }) {
  return (
    <div className="font-['Sono'] font-medium text-green-700">{children}</div>
  );
}

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} alt="cabin" />
      <Cabin>{name}</Cabin>
      <div>{maxCapacity} 人房</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                複製
              </Menus.Button>

              <Modal.Open opens="edit">
                {(open) => (
                  <Menus.Button icon={<HiPencil />} onClick={open}>
                    編輯
                  </Menus.Button>
                )}
              </Modal.Open>

              <Modal.Open opens="delete">
                {(open) => (
                  <Menus.Button icon={<HiTrash />} onClick={open}>
                    刪除
                  </Menus.Button>
                )}
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              {(close) => (
                <CreateCabinForm cabinToEdit={cabin} onCloseModal={close} />
              )}
            </Modal.Window>

            <Modal.Window name="delete">
              {(close) => (
                <ConfirmDelete
                  resourceName={name}
                  onConfirm={() => deleteCabin(cabinId)}
                  disabled={isDeleting}
                  onCloseModal={close}
                />
              )}
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
