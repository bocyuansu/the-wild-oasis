import Button from './Button';
import Heading from './Heading';

function StyledConfirmDelete({ children }) {
  return <div className="w-100 flex flex-col gap-3">{children}</div>;
}

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading level={3}>
        {' '}
        <span className="text-red-700 font-bold">刪除</span> {resourceName}
      </Heading>
      <p className="text-base text-stone-900 mb-3">
        您確定要刪除 <span className="text-brand-700">{resourceName}</span> 嗎？
      </p>

      <div className="flex justify-end gap-3">
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          取消
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          刪除
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
