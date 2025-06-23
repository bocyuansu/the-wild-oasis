import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          {(open) => <Button onClick={open}>新增客房</Button>}
        </Modal.Open>
        <Modal.Window name="cabin-form">
          {(close) => <CreateCabinForm onCloseModal={close} />}
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal(true)}>Add new cabin</Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
